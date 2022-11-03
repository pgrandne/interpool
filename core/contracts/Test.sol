// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
 * @title A consumer contract for Enetscores.
 * @author Perrin GRANDNE from Irruption Lab.
 * @notice Interact with the daily events API.
 * @dev Uses @chainlink/contracts 0.4.2.
 */
contract Test {

    struct GainTable {
        string player;
        uint256 score;
        uint256 rankExAequo;
        uint256 rewardNoExAequo;
        uint256 cumulatedRewardsNoExAequo;
        uint256 cumulatedRewardsPerRank;
        uint256 rewardPerRankPerPlayer; 
        // uint256 rankNoExAequo;
        
    }

    struct PlayerScore {
        string player;
        uint256 score;
    }

    uint256 prizePool; 
    uint256 gainPercentage;
    GainTable[] public gainTable;
    PlayerScore[] public scoreTable;

    
    constructor() {
        prizePool = 1758;
        gainPercentage = 5;
        pushInScoreTable("ticket1", 90);
        pushInScoreTable("ticket2", 75);
        pushInScoreTable("ticket3", 99);
        pushInScoreTable("ticket4", 73);
        pushInScoreTable("ticket5", 100);   
        pushInScoreTable("ticket6", 78);   
    }

    function pushInScoreTable(string memory _player, uint256 _score) public {
        scoreTable.push(PlayerScore({
            player: _player,
            score: _score
        }));
    }

    function rank() public {
        uint256 nbScore =scoreTable.length;
        uint256 ranking;
        uint256 lastRanking;
        uint256 cumulatedRewardsNoExAequo = 0;
        GainTable[] memory tempGainTable = new GainTable[](nbScore);
        for (uint256 i=0; i < nbScore; i++) {
            ranking = 1;
            for (uint256 j=0; j <nbScore; j++) {
                if (scoreTable[i].score < scoreTable[j].score) {
                ranking++;
                if (ranking > lastRanking) {
                    lastRanking = ranking;

                }
                }
            }
            tempGainTable[i] = GainTable({
                player: scoreTable[i].player,
                score: scoreTable[i].score,
                rankExAequo: ranking,
                rewardNoExAequo: 0,
                cumulatedRewardsNoExAequo: 0,
                cumulatedRewardsPerRank: 0,
                rewardPerRankPerPlayer:0
            });
        }
        for (uint256 k=1; k <= lastRanking; k++) {
            for (uint256 l=0; l < nbScore; l++) {
                if (tempGainTable[l].rankExAequo == k) {
                    gainTable.push(GainTable({
                        player: tempGainTable[l].player,
                        score: tempGainTable[l].score,
                        rankExAequo: tempGainTable[l].rankExAequo,
                        rewardNoExAequo: 0,
                        cumulatedRewardsNoExAequo: 0,
                        cumulatedRewardsPerRank: 0,
                        rewardPerRankPerPlayer: 0
                }));
                }
            }
        }
        for(uint256 m=0; m < nbScore; m++) {
            uint256 nbExAequo;
            uint256 rewardNoExAequo = (prizePool - cumulatedRewardsNoExAequo) * gainPercentage / 100;
            gainTable[m].rewardNoExAequo = rewardNoExAequo;
            cumulatedRewardsNoExAequo += rewardNoExAequo;
            gainTable[m].cumulatedRewardsNoExAequo = cumulatedRewardsNoExAequo;
            if ( m != 0 && m != (nbScore-1) && gainTable[m].rankExAequo == gainTable[m-1].rankExAequo) {
                gainTable[m].cumulatedRewardsPerRank = gainTable[m-1].cumulatedRewardsPerRank + rewardNoExAequo;                
            } else if (m == 0) {
                gainTable[m].cumulatedRewardsPerRank = rewardNoExAequo;
            } else if (m == (nbScore-1) && gainTable[m].rankExAequo == gainTable[m-1].rankExAequo) {
                gainTable[m].cumulatedRewardsPerRank = gainTable[m-1].cumulatedRewardsPerRank + rewardNoExAequo;
                nbExAequo = nbScore + 1 - gainTable[m].rankExAequo;
                for (uint n=0; n < nbExAequo; n++) {
                    uint256 o = m - n;
                    gainTable[o].rewardPerRankPerPlayer = (gainTable[m].cumulatedRewardsPerRank /nbExAequo);
                }
            }
            else if (m == (nbScore-1)) {
                gainTable[m].cumulatedRewardsPerRank = rewardNoExAequo;
                gainTable[m].rewardPerRankPerPlayer = rewardNoExAequo;

            }
            else {
                gainTable[m].cumulatedRewardsPerRank = rewardNoExAequo;
                gainTable[m].rewardPerRankPerPlayer = rewardNoExAequo;
                nbExAequo = gainTable[m].rankExAequo - gainTable[m-1].rankExAequo;

                // for (uint n=0; n < nbExAequo; n++) {
                //     uint256 o = m - n - 1;
                //  gainTable[o].rewardPerRankPerPlayer = (gainTable[m-1].cumulatedRewardsPerRank /nbExAequo);
                // }
            }
        }
    }
    
    function getGainTable() public view returns (GainTable[] memory) {
        return gainTable;
    }
}