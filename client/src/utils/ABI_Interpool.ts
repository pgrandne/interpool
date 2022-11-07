export const ABI_Interpool =
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                            "name": "score",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IpCalculation.PlayerScoreTicket[]",
                    "name": "_scoreTable",
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
                            "name": "score",
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
                    "internalType": "struct IpCalculation.Gain[]",
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
            "name": "checkResult",
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
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "contestTable",
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
                },
                {
                    "internalType": "uint256",
                    "name": "score",
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
            "stateMutability": "view",
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
                    "internalType": "string[]",
                    "name": "_listRequestId",
                    "type": "string[]"
                },
                {
                    "internalType": "uint256",
                    "name": "_dateEndContest",
                    "type": "uint256"
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
                    "internalType": "string",
                    "name": "_requestId",
                    "type": "string"
                },
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint40",
                            "name": "startTime",
                            "type": "uint40"
                        },
                        {
                            "internalType": "string",
                            "name": "homeTeam",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "awayTeam",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IpFakeEnetScore.GameCreate[]",
                    "name": "_fakeGameCreate",
                    "type": "tuple[]"
                }
            ],
            "name": "fakeGameCreate",
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
                            "name": "score",
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
                    "internalType": "struct IpCalculation.ContestResult[]",
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
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_requestId",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_idx",
                    "type": "uint256"
                }
            ],
            "name": "getGameCreate",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint40",
                            "name": "startTime",
                            "type": "uint40"
                        },
                        {
                            "internalType": "string",
                            "name": "homeTeam",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "awayTeam",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IpFakeEnetScore.GameCreate",
                    "name": "",
                    "type": "tuple"
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
            "name": "getListGamesPerContest",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint40",
                            "name": "startTime",
                            "type": "uint40"
                        },
                        {
                            "internalType": "string",
                            "name": "homeTeam",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "awayTeam",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IpFakeEnetScore.GameCreate[]",
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
                    "internalType": "string",
                    "name": "_requestId",
                    "type": "string"
                }
            ],
            "name": "getNumberOfGamesPerRequest",
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
                    "internalType": "struct IpFakeEnetScore.GamePredict[]",
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
                }
            ],
            "name": "getRequestIdPerContest",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint32",
                    "name": "_gameId",
                    "type": "uint32"
                }
            ],
            "name": "getScorePerGameId",
            "outputs": [
                {
                    "components": [
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
                    "internalType": "struct IpFakeEnetScore.Scores",
                    "name": "",
                    "type": "tuple"
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
            "name": "getScoreTable",
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
                            "name": "score",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IpCalculation.PlayerScoreTicket[]",
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
                    "internalType": "struct IpFakeEnetScore.GamePredict[]",
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
                        },
                        {
                            "internalType": "string",
                            "name": "status",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct IpFakeEnetScore.GameResolve[]",
                    "name": "_fakeGameResolve",
                    "type": "tuple[]"
                }
            ],
            "name": "saveRequestResults",
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
            "name": "updateContestTable",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]