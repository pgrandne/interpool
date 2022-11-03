export const ABI_Interpool = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FailedTransferLINK",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkRequested",
        "type": "event"
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
        "inputs": [],
        "name": "_getOracleAddress",
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
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_payment",
                "type": "uint256"
            },
            {
                "internalType": "bytes4",
                "name": "_callbackFunctionId",
                "type": "bytes4"
            },
            {
                "internalType": "uint256",
                "name": "_expiration",
                "type": "uint256"
            }
        ],
        "name": "cancelRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_leagueId",
                "type": "uint8"
            }
        ],
        "name": "changeLeagueId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "_nbOfPredictions",
                "type": "uint16"
            }
        ],
        "name": "changeNumberOfPredictions",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "checkResult",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "eth",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "link",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes[]",
                "name": "_result",
                "type": "bytes[]"
            }
        ],
        "name": "fulfillSchedule",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
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
                "internalType": "struct Enet.GameCreate",
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
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_idx",
                "type": "uint256"
            }
        ],
        "name": "getGameResolve",
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
                    },
                    {
                        "internalType": "string",
                        "name": "status",
                        "type": "string"
                    }
                ],
                "internalType": "struct Enet.GameResolve",
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
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            }
        ],
        "name": "getLengthResults",
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
                "internalType": "address",
                "name": "_player",
                "type": "address"
            }
        ],
        "name": "getPrevisionsPerPlayer",
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
                    },
                    {
                        "internalType": "string",
                        "name": "status",
                        "type": "string"
                    }
                ],
                "internalType": "struct Enet.GameResolve[]",
                "name": "",
                "type": "tuple[]"
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "predictionsPerPlayer",
        "outputs": [
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
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "requestIdGames",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_market",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            }
        ],
        "name": "requestSchedule",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_market",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "_gameIds",
                "type": "uint256[]"
            }
        ],
        "name": "requestSchedulePerGameId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "requestsIdList",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
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
                    },
                    {
                        "internalType": "string",
                        "name": "status",
                        "type": "string"
                    }
                ],
                "internalType": "struct Enet.GameResolve[]",
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
                "internalType": "bytes32",
                "name": "_requestId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes[]",
                "name": "_games",
                "type": "bytes[]"
            }
        ],
        "name": "setRequestIdGames",
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
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_payee",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawLink",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]