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
    struct GameResolve {
        uint32 gameId;
        uint8 homeScore;
        uint8 awayScore;
        string status;
    }

    /// @notice create a Market for Games, returns request id
    function requestSchedule(
        uint256 _market,
        uint256 _leagueId,
        uint256 _date
    ) external returns (bytes32);

    function getGameResolve(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (GameResolve memory);

    /// @notice Get Games Info : idGames, homeTeam, awayTeam
    function getGameInfoPerRequestIdIndex(bytes32 _requestId, uint256 _index)
        external
        view
        returns (
            uint32,
            string memory,
            string memory
        );

    /// @notice get a game id from a request id and an index
    function getGameIdPerRequestIndex(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (uint32);

    /// @notice Get Number of Games per Request Id
    function getNumberOfGamesPerRequest(bytes32 _requestId)
        external
        view
        returns (uint);
}

/* ========== CONTRACT BEGINNING ========== */

contract InterpoolContract is IpPool {
    struct GameResolve {
        uint32 gameId;
        uint8 homeScore;
        uint8 awayScore;
        string status;
    }

    /// @notice structure for id league and end of contest for each contest
    struct ContestInfo {
        uint256 leagueId;
        uint256 dateEnd;
    }

    /// @notice structure for data received from the front end, predictions from a player
    struct GamePredict {
        uint32 gameId;
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
    mapping(address => mapping(uint32 => uint8[2]))
        internal predictionsPerPlayerPerGame;

    /// @notice association between array of requests and contest
    /// @notice contest id => array of request id
    mapping(uint256 => bytes32[]) private listCreatedRequestsPerContest;

    /// @notice association between array of requests and contest
    /// @notice contest id => array of request id
    mapping(uint256 => bytes32[]) private listResolvedRequestsPerContest;

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
        enetContract = IEnet(0xeF249F41e80f34A2a96Dd07AB0403777317Ef726);
        gainPercentage = 5;
        currentContestId = 0; // initialisation of current contest id
        listCreatedRequestsPerContest[1].push(
            0x8f1abe4dfa5f4feed04ebefcdf63a9a7a5dce5f9ed4840524b3d8023be78398a
        );
    }

    /* ========== INTERPOOL WRITE FUNCTIONS ========== */

    /**
     * @notice Create a contest with a list of requests/games, league Id and end of predictions
     * @param _leagueId : 77: FIFA World Cup / 53: France Ligue / 42: UEFA Champion's League
     *  _dateEndContestPredictions: Date in timestamp for the end of predictions saving
     * @param _requestDates : Array of days in timestamp for matches of the contest
     */

    function createContest(
        uint256 _leagueId,
        uint256 _dateEndContestPredictions,
        uint256[] memory _requestDates
    ) public onlyOwner {
        currentContestId++;
        uint256 nbRequest = _requestDates.length;
        for (uint256 i = 0; i < nbRequest; i++) {
            listCreatedRequestsPerContest[currentContestId].push(
                enetContract.requestSchedule(0, _leagueId, _requestDates[i])
            );
        }
        infoContest[currentContestId] = ContestInfo({
            leagueId: _leagueId,
            dateEnd: _dateEndContestPredictions
        });
    }

    /**
     * @notice Resolve games, results are stored in a mapping
     * @param _leagueId : 77: FIFA World Cup / 53: France Ligue / 42: UEFA Champion's League
     * @param _requestDates : Array of days in timestamp for matches of the contest
     */

    function resolveGames(uint256 _leagueId, uint256[] memory _requestDates)
        public
        onlyOwner
    {
        uint256 nbRequest = _requestDates.length;
        for (uint256 i = 0; i < nbRequest; i++) {
            listResolvedRequestsPerContest[currentContestId].push(
                enetContract.requestSchedule(1, _leagueId, _requestDates[i])
            );
        }
    }

    /**
     * @notice Save predictions for a player for the current contest
     *  @param _gamePredictions: table of games with predicted scores received from the front end
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
            predictionsPerPlayerPerGame[msg.sender][
                _gamePredictions[i].gameId
            ] = [_gamePredictions[i].homeScore, _gamePredictions[i].awayScore];
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

    /**
     * @notice Define the winner of the game
     * @notice 0 : Home Winner, 1 : Draw, 2 Away Winner
     * @param _homeScore score of the Home Team
     * @param _awayScore score of the Away Team
     */

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

    function getScoreOfPlayerForContest(uint256 _contestId, address _player)
        private
        view
        returns (uint256)
    {
        uint256 gameResultPlayer;
        uint256 gameResultOracle;
        uint256 playerScoring = 0;
        uint32 gameId;
        uint256 nbGames = getNumberOfGamesPerContest(_contestId);
        uint32[] memory listGamesIdPerContest = new uint32[](nbGames);
        listGamesIdPerContest = getIdGamesPerContest(_contestId);
        for (uint256 i = 0; i < nbGames; i++) {
            gameId = listGamesIdPerContest[i];
            (
                uint8 resolveHomeScore,
                uint8 resolveAwayScore
            ) = getScoresPerGameId(_contestId, gameId);
            (
                uint8 playerHomeScore,
                uint8 playerAwayScore
            ) = getPrevisionsPerPlayerPerGame(_player, gameId);
            gameResultPlayer = calculateMatchResult(
                playerHomeScore,
                playerAwayScore
            );
            gameResultOracle = calculateMatchResult(
                resolveHomeScore,
                resolveAwayScore
            );
            if (gameResultPlayer == gameResultOracle) {
                playerScoring += 1;
                if (
                    playerHomeScore == resolveHomeScore &&
                    playerAwayScore == resolveAwayScore
                ) {
                    playerScoring += 2;
                }
            }
        }
        return playerScoring;
    }

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
            scorePlayer = getScoreOfPlayerForContest(_contestId, player);
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

    function getListRequestIdPerContest(uint256 _contestId, uint256 _market)
        public
        view
        returns (bytes32[] memory)
    {
        if (_market == 0) {
            return listCreatedRequestsPerContest[_contestId];
        } else {
            return listResolvedRequestsPerContest[_contestId];
        }
    }

    function getNumberOfGamesPerContest(uint256 _contestId)
        public
        view
        returns (uint256)
    {
        uint256 nbGames = 0;
        uint256 nbRequest = listCreatedRequestsPerContest[_contestId].length;
        for (uint256 i = 0; i < nbRequest; i++) {
            bytes32 requestId = listCreatedRequestsPerContest[_contestId][i];
            nbGames += enetContract.getNumberOfGamesPerRequest(requestId);
        }
        return nbGames;
    }

    function getIdGamesPerContest(uint256 _contestId)
        public
        view
        returns (uint32[] memory)
    {
        uint256 nbGames = getNumberOfGamesPerContest(_contestId);
        uint256 iGames;
        uint32[] memory listGamesIdPerContest = new uint32[](nbGames);
        for (
            uint256 i = 0;
            i < listCreatedRequestsPerContest[_contestId].length;
            i++
        ) {
            nbGames = enetContract.getNumberOfGamesPerRequest(
                listCreatedRequestsPerContest[_contestId][i]
            );
            for (uint256 j = 0; j < nbGames; j++) {
                listGamesIdPerContest[iGames] = enetContract
                    .getGameIdPerRequestIndex(
                        listCreatedRequestsPerContest[_contestId][i],
                        j
                    );
                iGames++;
            }
        }
        return listGamesIdPerContest;
    }

    function getScoresPerGameId(uint256 _contestId, uint32 _gameId)
        public
        view
        returns (uint8, uint8)
    {
        uint256 nbRequests = listResolvedRequestsPerContest[_contestId].length;
        uint8 homeScore = 255;
        uint8 awayScore = 255;
        for (uint i = 0; i < nbRequests; i++) {
            bytes32 requestId = listResolvedRequestsPerContest[_contestId][i];
            uint256 nbGames = enetContract.getNumberOfGamesPerRequest(
                requestId
            );
            for (uint j = 0; j < nbGames; j++) {
                uint32 gameId = enetContract
                    .getGameResolve(requestId, j)
                    .gameId;
                if (gameId == _gameId) {
                    homeScore = enetContract
                        .getGameResolve(requestId, j)
                        .homeScore;
                    awayScore = enetContract
                        .getGameResolve(requestId, j)
                        .awayScore;
                    break;
                }
            }
        }
        return (homeScore, awayScore);
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
        uint32[] memory listGamesIdPerContest = new uint32[](nbGames);
        listGamesIdPerContest = getIdGamesPerContest(_contestId);
        for (uint256 i = 0; i < nbGames; i++) {
            gameId = listGamesIdPerContest[i];
            listPredictionsPerContest[i] = GamePredict({
                gameId: gameId,
                homeScore: predictionsPerPlayerPerGame[_player][gameId][0],
                awayScore: predictionsPerPlayerPerGame[_player][gameId][1]
            });
        }
        return listPredictionsPerContest;
    }

    function getPrevisionsPerPlayerPerGame(address _player, uint32 _gameId)
        public
        view
        returns (uint8, uint8)
    {
        uint8[2] memory score = predictionsPerPlayerPerGame[_player][_gameId];
        return (score[0], score[1]);
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
