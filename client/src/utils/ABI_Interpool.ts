export const ABI_Interpool =
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Paused",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Unpaused",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbTickets",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbPoints",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InterpoolContract.PlayerPointsAndTickets[]",
                    "name": "_pointsTable",
                    "type": "tuple[]"
                }
            ],
            "name": "calculateGain",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbPoints",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rankExAequo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardNoExAequo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "cumulatedRewardsNoExAequo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "cumulatedRewardsPerRank",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardPerRankPerPlayer",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InterpoolContract.Gain[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint8",
                    "name": "_homeScore",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "_awayScore",
                    "type": "uint8"
                }
            ],
            "name": "calculateMatchResult",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claim",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_leagueId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_dateEndContestPredictions",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_requestDates",
                    "type": "uint256[]"
                }
            ],
            "name": "createContest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "createContestTable",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContestPredictionEndDate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "getContestTable",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbTickets",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbPoints",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rankExAequo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rewardPerRankPerPlayer",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InterpoolContract.ContestResult[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentContestId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getGlobalPrizePool",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "getIdGamesPerContest",
            "outputs": [
                {
                    "internalType": "uint32[]",
                    "name": "",
                    "type": "uint32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_market",
                    "type": "uint256"
                }
            ],
            "name": "getListRequestIdPerContest",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "getNumberOfGamesPerContest",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "getNumberOfPlayers",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "getPlayerRank",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "getPointsOfPlayerForContest",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                }
            ],
            "name": "getPointsTable",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "player",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbTickets",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nbPoints",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct InterpoolContract.PlayerPointsAndTickets[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "getPrevisionsPerPlayerPerContest",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint8",
                            "name": "homeScore",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "awayScore",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct InterpoolContract.GamePredict[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                },
                {
                    "internalType": "uint32",
                    "name": "_gameId",
                    "type": "uint32"
                }
            ],
            "name": "getPrevisionsPerPlayerPerGame",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_contestId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint32",
                    "name": "_gameId",
                    "type": "uint32"
                }
            ],
            "name": "getScoresPerGameId",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "getVerifPlayerPlayedPerContest",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_player",
                    "type": "address"
                }
            ],
            "name": "getWinningsPerPlayer",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "listPlayersWithNbTicketsPerContest",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "player",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nbTickets",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_leagueId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_requestDates",
                    "type": "uint256[]"
                }
            ],
            "name": "resolveGames",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint8",
                            "name": "homeScore",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "awayScore",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct InterpoolContract.GamePredict[]",
                    "name": "_gamePredictions",
                    "type": "tuple[]"
                }
            ],
            "name": "savePrediction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_enetContract",
                    "type": "address"
                }
            ],
            "name": "setEnetContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_poolContract",
                    "type": "address"
                }
            ],
            "name": "setPoolContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_nbTickets",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]