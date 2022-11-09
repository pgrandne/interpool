// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import {IpFakeEnetScore} from "./IpFakeEnetScore.sol";
import {IpPool} from "./IpPool.sol";

/*
 * @title A consumer contract for Enetscores.
 * @author Perrin GRANDNE from Irruption Lab.
 * @notice Interact with the daily events API.
 * @dev Uses @chainlink/contracts 0.4.2.
 */

contract InterpoolContract is IpFakeEnetScore, IpPool {
    struct Gain {
        address player;
        uint256 score;
        uint256 rankExAequo;
        uint256 rewardNoExAequo;
        uint256 cumulatedRewardsNoExAequo;
        uint256 cumulatedRewardsPerRank;
        uint256 rewardPerRankPerPlayer;
    }

    struct Rank {
        address player;
        uint256 score;
        uint256 rankExAequo;
    }

    struct PlayerScoreTicket {
        address player;
        uint256 nbTickets;
        uint256 score;
    }

    struct PlayerScore {
        address player;
        uint256 score;
    }

    struct ContestResult {
        address player;
        uint256 nbTickets;
        uint256 score;
        uint256 rankExAequo;
        uint256 rewardPerRankPerPlayer;
    }

    uint256 prizePool;
    uint256 gainPercentage;
    mapping(uint256 => ContestResult[]) public contestTable;

    mapping(uint256 => uint256) public nbTotalTicketsPerContest;

    constructor() {
        gainPercentage = 5;
    }

    function getScoreTable(uint256 _contestId)
        public
        view
        returns (PlayerScoreTicket[] memory)
    {
        uint256 nbPlayers = IpFakeEnetScore
            .listPlayersPerContest[_contestId]
            .length;
        address player;
        uint256 nbTickets;
        PlayerScoreTicket[] memory scoreTable = new PlayerScoreTicket[](
            nbPlayers
        );
        uint256 scorePlayer;
        for (uint256 i = 0; i < nbPlayers; i++) {
            player = listPlayersPerContest[_contestId][i];
            nbTickets = interPoolTicket.balanceOf(player);
            scorePlayer = IpFakeEnetScore.checkResult(_contestId, player);
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
    ) public view returns (Gain[] memory) {
        uint256 ranking;
        uint256 lastRanking;
        uint256 cumulatedRewardsNoExAequo = 0;
        uint256 nbExAequo;
        uint256 rewardNoExAequo;
        uint256 indexTable = 0;
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

    function updateContestTable(uint _contestId) public {
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
    }

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
            block.timestamp <
                IpFakeEnetScore.infoContest[currentContestId].dateEnd,
            "Prediction Period is closed!"
        );
        require(
            _gamePredictions.length ==
                getNumberOfGamesPerContest(currentContestId),
            "The number of predictions doesn't match!"
        );
        uint256 nbOfGames = getNumberOfGamesPerContest(currentContestId);
        for (uint256 i = 0; i < nbOfGames; i++) {
            predictionsPerPlayerPerContest[msg.sender][currentContestId][
                _gamePredictions[i].gameId
            ] = Scores({
                homeScore: _gamePredictions[i].homeScore,
                awayScore: _gamePredictions[i].awayScore
            });
        }
        listPlayersPerContest[currentContestId].push(msg.sender);
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
}
