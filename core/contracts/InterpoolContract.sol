// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import {IpPool} from "./IpPool.sol";

/// @title InterPool : InterPool Contract
/// @author Perrin GRANDNE
/// @notice Contract for
/// @notice
/// @custom:experimental This is an experimental contract.

/// @notice Only EnetPulse functions we need
interface IEnet {
    /// @notice Boolean to know if a game is finished
    function getGamePlayed(uint32 _gameId) external view returns (bool);

    /// @notice Get Games Info : idGames, homeTeam, awayTeam
    function getRequestIdGames(string memory _requestId, uint256 _index)
        external
        view
        returns (
            uint32,
            string memory,
            string memory
        );

    /// @notice Get Results of Games for a game id : homeScore, awayScore
    function getScoresPerGameId(uint32 _gameId)
        external
        view
        returns (uint8, uint8);

    /// @notice Get Number of Games per Request Id
    function getNumberOfGamesPerRequest(string memory _requestId)
        external
        view
        returns (uint);
}

/* ========== CONTRACT BEGINNING ========== */

contract InterpoolContract is IpPool {
    /// @notice structure for id league and end of contest for each contest
    struct ContestInfo {
        uint256 leagueId;
        uint256 dateEnd;
    }

    /// @notice Game Id, Name of the home and away team from Game Create of EnetPulse
    struct GameInfo {
        uint32 gameId;
        string homeTeam;
        string awayTeam;
    }

    /// @notice structure for data received from the front end, predictions from a player
    struct GamePredict {
        uint32 gameId;
        uint8 homeScore;
        uint8 awayScore;
    }

    /// @notice structure for scores from a game
    struct GameScores {
        uint8 homeScore;
        uint8 awayScore;
    }

    /// @notice Number of ticket of a player when he submits his predictions
    struct NbTicketsPerPlayer {
        address player;
        uint256 nbTickets;
    }

    /// @notice Number of tickets and score for player of a contest
    /// @notice Used for Score Table
    struct PlayerScoreTicket {
        address player;
        uint256 nbTickets;
        uint256 score;
    }

    /// @notice Scores for a Player in a Contest
    struct PlayerScore {
        address player;
        uint256 score;
    }

    /// @notice Rank of player with ex-aequo
    /// @notice if 2 players have the same score, they have the same rank
    /// @notice and the next rank is + 2 instrad of +1
    struct Rank {
        address player;
        uint256 score;
        uint256 rankExAequo;
    }

    /// @notice struct of Gain per Player for Contest Result calculation
    struct Gain {
        address player;
        uint256 score;
        uint256 rankExAequo;
        uint256 rewardNoExAequo;
        uint256 cumulatedRewardsNoExAequo;
        uint256 cumulatedRewardsPerRank;
        uint256 rewardPerRankPerPlayer;
    }

    /// @notice struct for Contest Table
    struct ContestResult {
        address player;
        uint256 nbTickets;
        uint256 score;
        uint256 rankExAequo;
        uint256 rewardPerRankPerPlayer;
    }

    /// @notice association between contest info and contest
    mapping(uint256 => ContestInfo) internal infoContest;

    /// @notice list of all players who participate to the contest
    /// @notice and their number of ticket when they submitted their predictions
    /// @notice contest Id = Table with players and their number of tickets
    mapping(uint256 => NbTicketsPerPlayer[])
        internal nbTicketsPerPlayersPerContest;

    /// @notice Total Number of Tickets per Contest
    /// @notice contest id => number ot tickets
    mapping(uint256 => uint256) private nbTotalTicketsPerContest;

    /// @notice use struct Score for all game id predicted for a contest by a player
    /// @notice player => contest id => game id => score prediction
    mapping(address => mapping(uint256 => mapping(uint32 => GameScores)))
        internal predictionsPerPlayerPerContest;

    /// @notice association between array of requests and contest
    /// @notice contest id => array of request id
    mapping(uint256 => string[]) private listRequestsPerContest;

    /// @notice Contest Table at the end of a contest
    /// @notice contest id => Table of results for the contest
    mapping(uint256 => ContestResult[]) private contestTable;

    /// @notice Check if a player submitted predictions during the current contest
    /// @notice If yes he cannot withdraw his tickets
    /// @notice contest id => player => Played or Not
    mapping(uint256 => mapping(address => bool))
        private verifPlayerPlayedPerContest;

    /// @notice current contest id
    uint256 internal currentContestId;

    /// @notice Percentage that each player will earn from the remaining winnings
    uint256 private gainPercentage;

    /// @notice interface for EnetPulse Contract
    IEnet private enetContract;

    constructor() {
        enetContract = IEnet(0x973680af677B40128B8c4015e2EF4C0D889Ed7b0);
        gainPercentage = 5;
        currentContestId = 0; // initialisation of current contest id
    }

    /* ========== INTERPOOL WRITE FUNCTIONS ========== */

    /**
     * @notice Save predictions for a player for the current contest
     * @param _gamePredictions: table of games with predicted scores received from the front end
     * Verify the contest is still open and the number of predictions is the expected number
     * Save scores of games in predictionsPerPlayerPerContest
     */
    function savePrediction(GamePredict[] memory _gamePredictions) public {
        require(
            IpPool.interPoolTicket.balanceOf(msg.sender) > 0,
            "You need a ticket for saving predictions!"
        );
        require(
            block.timestamp < infoContest[currentContestId].dateEnd,
            "Prediction Period is closed!"
        );
        require(
            _gamePredictions.length ==
                getNumberOfGamesPerContest(currentContestId),
            "The number of predictions doesn't match!"
        );
        uint256 nbOfGames = getNumberOfGamesPerContest(currentContestId);
        uint256 nbTickets = interPoolTicket.balanceOf(msg.sender);
        for (uint256 i = 0; i < nbOfGames; i++) {
            predictionsPerPlayerPerContest[msg.sender][currentContestId][
                _gamePredictions[i].gameId
            ] = GameScores({
                homeScore: _gamePredictions[i].homeScore,
                awayScore: _gamePredictions[i].awayScore
            });
        }
        bool alreadyExist;
        for (
            uint256 i = 0;
            i < nbTicketsPerPlayersPerContest[currentContestId].length;
            i++
        ) {
            if (
                msg.sender ==
                nbTicketsPerPlayersPerContest[currentContestId][i].player
            )
                nbTicketsPerPlayersPerContest[currentContestId][i]
                    .nbTickets = nbTickets;
            alreadyExist = true;
        }
        if (alreadyExist == false) {
            nbTicketsPerPlayersPerContest[currentContestId].push(
                NbTicketsPerPlayer({player: msg.sender, nbTickets: nbTickets})
            );
        }
        verifPlayerPlayedPerContest[currentContestId][msg.sender] = true;
    }

    function createContest(
        uint256 _leagueId,
        string[] memory _listRequestId,
        uint256 _dateEndContest
    ) public onlyOwner {
        currentContestId++;
        for (uint256 i = 0; i < _listRequestId.length; i++) {
            listRequestsPerContest[currentContestId].push(_listRequestId[i]);
        }
        infoContest[currentContestId] = ContestInfo({
            leagueId: _leagueId,
            dateEnd: _dateEndContest
        });
    }

    function updateContestTable(uint _contestId) public onlyOwner {
        nbTotalTicketsPerContest[_contestId] = interPoolTicket.totalSupply();
        PlayerScoreTicket[] memory scoreTable = getScoreTable(_contestId);
        Gain[] memory gainTable = calculateGain(_contestId, scoreTable);
        uint256 indexTable = 0;
        /// Inititate the table with the first row
        contestTable[_contestId].push(
            ContestResult({
                player: gainTable[0].player,
                nbTickets: 1,
                score: gainTable[0].score,
                rankExAequo: gainTable[0].rankExAequo,
                rewardPerRankPerPlayer: gainTable[0].rewardPerRankPerPlayer
            })
        );
        for (uint i = 1; i < nbTotalTicketsPerContest[_contestId]; i++) {
            if (gainTable[i].player == gainTable[i - 1].player) {
                contestTable[_contestId][indexTable].nbTickets++;
                contestTable[_contestId][indexTable]
                    .rewardPerRankPerPlayer += gainTable[i]
                    .rewardPerRankPerPlayer;
            } else {
                contestTable[_contestId].push(
                    ContestResult({
                        player: gainTable[i].player,
                        nbTickets: 1,
                        score: gainTable[i].score,
                        rankExAequo: gainTable[i].rankExAequo,
                        rewardPerRankPerPlayer: gainTable[i]
                            .rewardPerRankPerPlayer
                    })
                );
                indexTable++;
            }
        }
        for (uint256 i = 0; i < contestTable[_contestId].length; i++) {
            address player = contestTable[_contestId][i].player;
            IpPool.winningsPerPlayer[player].pendingWinnings += contestTable[
                _contestId
            ][i].rewardPerRankPerPlayer;
            IpPool.globalPendingWinnings += contestTable[_contestId][i]
                .rewardPerRankPerPlayer;
        }
    }

    function withdraw(uint256 _nbTickets) public {
        require(
            verifPlayerPlayedPerContest[currentContestId][msg.sender] ==
                false ||
                block.timestamp > infoContest[currentContestId].dateEnd,
            "You cannot withdraw until the end of the contest!"
        );
        withdrawFromPool(_nbTickets);
    }

    /* ========== INTERPOOL READ FUNCTIONS ========== */

    function getScoreTable(uint256 _contestId)
        public
        view
        returns (PlayerScoreTicket[] memory)
    {
        uint256 nbPlayers = nbTicketsPerPlayersPerContest[_contestId].length;
        address player;
        uint256 nbTickets;
        PlayerScoreTicket[] memory scoreTable = new PlayerScoreTicket[](
            nbPlayers
        );
        uint256 scorePlayer;
        for (uint256 i = 0; i < nbPlayers; i++) {
            player = nbTicketsPerPlayersPerContest[_contestId][i].player;
            nbTickets = nbTicketsPerPlayersPerContest[_contestId][i].nbTickets;
            scorePlayer = checkResult(_contestId, player);
            scoreTable[i] = PlayerScoreTicket({
                player: player,
                nbTickets: nbTickets,
                score: scorePlayer
            });
        }
        return scoreTable;
    }

    function calculateGain(
        uint _contestId,
        PlayerScoreTicket[] memory _scoreTable
    ) private view returns (Gain[] memory) {
        uint256 ranking;
        uint256 lastRanking;
        uint256 cumulatedRewardsNoExAequo = 0;
        uint256 nbExAequo;
        uint256 rewardNoExAequo;
        uint256 indexTable = 0;
        uint256 prizePool = getGlobalPrizePool();
        uint256 nbTotalTickets = nbTotalTicketsPerContest[_contestId];
        PlayerScore[] memory scoreTablePerTicket = new PlayerScore[](
            nbTotalTickets
        );
        Rank[] memory rankTable = new Rank[](nbTotalTickets);
        Gain[] memory gainTable = new Gain[](nbTotalTickets);
        for (uint256 i = 0; i < _scoreTable.length; i++) {
            PlayerScoreTicket memory tempPlayerScore = _scoreTable[i];
            for (uint256 j = 0; j < tempPlayerScore.nbTickets; j++) {
                scoreTablePerTicket[indexTable] = PlayerScore({
                    player: tempPlayerScore.player,
                    score: tempPlayerScore.score
                });
                indexTable++;
            }
        }
        for (uint256 i = 0; i < nbTotalTickets; i++) {
            ranking = 1;
            for (uint256 j = 0; j < nbTotalTickets; j++) {
                if (
                    scoreTablePerTicket[i].score < scoreTablePerTicket[j].score
                ) {
                    ranking++;
                    if (ranking > lastRanking) {
                        lastRanking = ranking;
                    }
                }
            }
            rankTable[i] = Rank({
                player: scoreTablePerTicket[i].player,
                score: scoreTablePerTicket[i].score,
                rankExAequo: ranking
            });
        }
        indexTable = 0;
        for (uint256 i = 1; i <= lastRanking; i++) {
            for (uint256 j = 0; j < nbTotalTickets; j++) {
                if (rankTable[j].rankExAequo == i) {
                    gainTable[indexTable] = (
                        Gain({
                            player: rankTable[j].player,
                            score: rankTable[j].score,
                            rankExAequo: rankTable[j].rankExAequo,
                            rewardNoExAequo: 0,
                            cumulatedRewardsNoExAequo: 0,
                            cumulatedRewardsPerRank: 0,
                            rewardPerRankPerPlayer: 0
                        })
                    );
                    indexTable++;
                }
            }
        }
        /// Inititate the table with the first row
        rewardNoExAequo =
            ((prizePool - cumulatedRewardsNoExAequo) * gainPercentage) /
            100;
        cumulatedRewardsNoExAequo += rewardNoExAequo;
        gainTable[0].rewardNoExAequo = rewardNoExAequo;
        gainTable[0].cumulatedRewardsNoExAequo = rewardNoExAequo;
        gainTable[0].cumulatedRewardsPerRank = rewardNoExAequo;
        gainTable[0].rewardPerRankPerPlayer = rewardNoExAequo;
        for (uint256 m = 1; m < nbTotalTickets; m++) {
            rewardNoExAequo =
                ((prizePool - cumulatedRewardsNoExAequo) * gainPercentage) /
                100;
            gainTable[m].rewardNoExAequo = rewardNoExAequo;
            cumulatedRewardsNoExAequo += rewardNoExAequo;
            gainTable[m].cumulatedRewardsNoExAequo = cumulatedRewardsNoExAequo;
            if (m != (nbTotalTickets - 1)) {
                if (gainTable[m].rankExAequo == gainTable[m - 1].rankExAequo) {
                    gainTable[m].cumulatedRewardsPerRank =
                        gainTable[m - 1].cumulatedRewardsPerRank +
                        rewardNoExAequo;
                } else {
                    gainTable[m].cumulatedRewardsPerRank = rewardNoExAequo;
                    gainTable[m].rewardPerRankPerPlayer = rewardNoExAequo;
                    nbExAequo =
                        gainTable[m].rankExAequo -
                        gainTable[m - 1].rankExAequo;
                    for (uint n = 0; n < nbExAequo; n++) {
                        gainTable[m - (n + 1)]
                            .rewardPerRankPerPlayer = (gainTable[m - 1]
                            .cumulatedRewardsPerRank / nbExAequo);
                    }
                }
            } else {
                if (gainTable[m].rankExAequo == gainTable[m - 1].rankExAequo) {
                    gainTable[m].cumulatedRewardsPerRank =
                        gainTable[m - 1].cumulatedRewardsPerRank +
                        rewardNoExAequo;
                    nbExAequo = nbTotalTickets + 1 - gainTable[m].rankExAequo;
                    for (uint n = 0; n < nbExAequo; n++) {
                        gainTable[m - n].rewardPerRankPerPlayer = (gainTable[m]
                            .cumulatedRewardsPerRank / nbExAequo);
                    }
                } else {
                    gainTable[m].cumulatedRewardsPerRank = rewardNoExAequo;
                    gainTable[m].rewardPerRankPerPlayer = rewardNoExAequo;
                }
            }
        }
        return gainTable;
    }

    function getPlayerRank(uint _contestId, address _player)
        public
        view
        returns (uint256)
    {
        PlayerScoreTicket[] memory scoreTable = getScoreTable(_contestId);
        uint256 ranking;
        uint256 nbPlayers = scoreTable.length;
        uint256 playerRank = 0;
        Rank[] memory rankTable = new Rank[](nbPlayers);
        for (uint256 i = 0; i < nbPlayers; i++) {
            ranking = 1;
            for (uint256 j = 0; j < nbPlayers; j++) {
                if (scoreTable[i].score < scoreTable[j].score) {
                    ranking++;
                }
            }
            rankTable[i] = Rank({
                player: scoreTable[i].player,
                score: scoreTable[i].score,
                rankExAequo: ranking
            });
        }
        for (uint256 i = 0; i < nbPlayers; i++) {
            if (_player == rankTable[i].player) {
                playerRank = rankTable[i].rankExAequo;
                break;
            }
        }
        return playerRank;
    }

    function getContestTable(uint256 _contestId)
        public
        view
        returns (ContestResult[] memory)
    {
        return contestTable[_contestId];
    }

    function getRequestIdPerContest(uint256 _contestId)
        private
        view
        returns (string[] memory)
    {
        return listRequestsPerContest[_contestId];
    }

    function getNumberOfGamesPerContest(uint256 _contestId)
        private
        view
        returns (uint256)
    {
        uint256 nbGames = 0;
        for (
            uint256 i = 0;
            i < listRequestsPerContest[_contestId].length;
            i++
        ) {
            nbGames += enetContract.getNumberOfGamesPerRequest(
                listRequestsPerContest[_contestId][i]
            );
        }
        return nbGames;
    }

    function getListGamesPerContest(uint256 _contestId)
        public
        view
        returns (GameInfo[] memory)
    {
        uint256 nbGames = getNumberOfGamesPerContest(_contestId);
        uint256 iGames;
        GameInfo[] memory listGamesPerContest = new GameInfo[](nbGames);
        for (
            uint256 i = 0;
            i < listRequestsPerContest[_contestId].length;
            i++
        ) {
            nbGames = enetContract.getNumberOfGamesPerRequest(
                listRequestsPerContest[_contestId][i]
            );
            for (uint256 j = 0; j < nbGames; j++) {
                (
                    listGamesPerContest[iGames].gameId,
                    listGamesPerContest[iGames].homeTeam,
                    listGamesPerContest[iGames].awayTeam
                ) = enetContract.getRequestIdGames(
                    listRequestsPerContest[_contestId][i],
                    j
                );
                iGames++;
            }
        }
        return listGamesPerContest;
    }

    function getPrevisionsPerPlayerPerContest(
        uint256 _contestId,
        address _player
    ) public view returns (GamePredict[] memory) {
        uint256 nbGames = getNumberOfGamesPerContest(_contestId);
        uint32 gameId;
        GamePredict[] memory listPredictionsPerContest = new GamePredict[](
            nbGames
        );
        GameInfo[] memory listGamesPerContest = new GameInfo[](nbGames);
        listGamesPerContest = getListGamesPerContest(_contestId);
        for (uint256 i = 0; i < nbGames; i++) {
            gameId = listGamesPerContest[i].gameId;
            listPredictionsPerContest[i] = GamePredict({
                gameId: gameId,
                homeScore: predictionsPerPlayerPerContest[_player][_contestId][
                    gameId
                ].homeScore,
                awayScore: predictionsPerPlayerPerContest[_player][_contestId][
                    gameId
                ].awayScore
            });
        }
        return listPredictionsPerContest;
    }

    function calculateMatchResult(uint8 _homeScore, uint8 _awayScore)
        private
        pure
        returns (uint256)
    {
        uint256 gameResult;
        if (_homeScore > _awayScore) {
            gameResult = 0;
        } else if (_awayScore > _homeScore) {
            gameResult = 2;
        } else {
            gameResult = 1;
        }
        return gameResult;
    }

    function checkResult(uint256 _contestId, address _player)
        private
        view
        returns (uint256)
    {
        uint256 gameResultPlayer;
        uint256 gameResultOracle;
        uint256 playerScoring = 0;
        uint32 gameId;
        uint256 nbGames = getNumberOfGamesPerContest(_contestId);
        GameInfo[] memory listGamesPerContest = new GameInfo[](nbGames);
        listGamesPerContest = getListGamesPerContest(_contestId);
        for (uint256 i = 0; i < nbGames; i++) {
            gameId = listGamesPerContest[i].gameId;
            gameResultPlayer = calculateMatchResult(
                predictionsPerPlayerPerContest[_player][_contestId][gameId]
                    .homeScore,
                predictionsPerPlayerPerContest[_player][_contestId][gameId]
                    .awayScore
            );
            (uint8 resolveHomeScore, uint8 resolveAwayScore) = enetContract
                .getScoresPerGameId(gameId);
            gameResultOracle = calculateMatchResult(
                resolveHomeScore,
                resolveAwayScore
            );
            if (
                gameResultPlayer == gameResultOracle &&
                enetContract.getGamePlayed(gameId) == true
            ) {
                playerScoring += 1;
                if (
                    predictionsPerPlayerPerContest[_player][_contestId][gameId]
                        .homeScore ==
                    resolveHomeScore &&
                    predictionsPerPlayerPerContest[_player][_contestId][gameId]
                        .awayScore ==
                    resolveAwayScore
                ) {
                    playerScoring += 2;
                }
            }
        }
        return playerScoring;
    }

    function getCurrentContestId() public view returns (uint256) {
        return currentContestId;
    }

    function getNumberOfPlayers(uint256 _contestId)
        public
        view
        returns (uint256)
    {
        return (nbTicketsPerPlayersPerContest[_contestId].length);
    }

    function getContestPredictionEndDate() public view returns (uint256) {
        return infoContest[currentContestId].dateEnd;
    }
}
