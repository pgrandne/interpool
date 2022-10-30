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
contract Enet is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;
    using CBORChainlink for BufferChainlink.buffer;

    struct GameCreate {
        uint32 gameId;
        uint40 startTime;
        string homeTeam;
        string awayTeam;
    }

    struct GameResolve {
        uint32 gameId;
        uint8 homeScore;
        uint8 awayScore;
        string status;
    }

    mapping(bytes32 => bytes[]) public requestIdGames;
    mapping(uint => bytes32) public requestsIdList;

    // @notice use struct GameResolve for saving predictions of players
    mapping(address => GameResolve[]) public predictionsPerPlayer;

    error FailedTransferLINK(address to, uint256 amount);

    bytes32 private specId;
    uint256 private payment;
    uint8 private leagueId;
    uint256 private counter;
    uint16 private nbOfPredictions;

    constructor() {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xd5821b900e44db9490da9b09541bbd027fBecF4E);
        specId = 0x6431313062356334623833643432646361323065343130616335333763643934; //JobId
        payment = 100000000000000000;
        leagueId = 52; // 53 for Ligue 1, 42 Champion's League, 77 World Cup
        counter = 1; // counter for nb of requets;
        nbOfPredictions = 2; //nb of expected Predictions for the contest;
    }

    /* ========== EXTERNAL FUNCTIONS ========== */

    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) external {
        cancelChainlinkRequest(
            _requestId,
            _payment,
            _callbackFunctionId,
            _expiration
        );
    }

    /**
     * @notice Stores the scheduled games.
     * @param _requestId the request ID for fulfillment.
     * @param _result the games either to be created or resolved.
     */
    function fulfillSchedule(bytes32 _requestId, bytes[] memory _result)
        external
        recordChainlinkFulfillment(_requestId)
    {
        requestIdGames[_requestId] = _result;
        requestsIdList[counter] = _requestId;
        counter++;
    }

    /**
     * @notice Requests the tournament games either to be created or to be resolved on a specific date.
     * @dev Requests the 'schedule' endpoint. Result is an array of GameCreate or GameResolve encoded (see structs).
     * specId the jobID.
     * payment the LINK amount in Juels (i.e. 10^18 aka 1 LINK).
     * @param _market the number associated with the type of market (see Data Conversions).
     * leagueId the tournament ID. 1662577200
     * @param _date the starting time of the event as a UNIX timestamp in seconds.
     */
    function requestSchedule(uint256 _market, uint256 _date)
        external
        onlyOwner
    {
        Chainlink.Request memory req = buildOperatorRequest(
            specId,
            this.fulfillSchedule.selector
        );

        req.addUint("market", _market);
        req.addUint("leagueId", leagueId);
        req.addUint("date", _date);

        sendOperatorRequest(req, payment);
    }

    /**
     * @notice Requests the tournament games either to be created or to be resolved on a specific date.
     * @dev Requests the 'schedule' endpoint. Result is an array of GameCreate or GameResolve encoded (see structs).
     * specId the jobID.
     * payment the LINK amount in Juels (i.e. 10^18 aka 1 LINK).
     * @param _market the context of the games data to be requested: `0` (markets to be created),
     * `1` (markets to be resolved).
     * leagueId the tournament ID.
     * @param _date the date to request events by, as a UNIX timestamp in seconds. 1662577200
     * @param _gameIds the list of game IDs to filter by for market `1`, otherwise the value is ignored.
     */
    function requestSchedulePerGameId(
        uint256 _market,
        uint256 _date,
        uint256[] calldata _gameIds
    ) external onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            specId,
            this.fulfillSchedule.selector
        );

        req.addUint("market", _market);
        req.addUint("leagueId", leagueId);
        req.addUint("date", _date);
        _addUintArray(req, "gameIds", _gameIds);

        sendOperatorRequest(req, payment);
    }

    function setRequestIdGames(bytes32 _requestId, bytes[] memory _games)
        external
    {
        requestIdGames[_requestId] = _games;
    }

    function withdrawLink(address payable _payee, uint256 _amount) external {
        LinkTokenInterface linkToken = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        if (!linkToken.transfer(_payee, _amount)) {
            revert FailedTransferLINK(_payee, _amount);
        }
    }

    /* ========== EXTERNAL VIEW FUNCTIONS ========== */

    function getGameCreate(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (GameCreate memory)
    {
        return _getGameCreateStruct(requestIdGames[_requestId][_idx]);
    }

    function getGameResolve(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (GameResolve memory)
    {
        return _getGameResolveStruct(requestIdGames[_requestId][_idx]);
    }

    function _getOracleAddress() external view returns (address) {
        return chainlinkOracleAddress();
    }

    function getLengthResults(bytes32 _requestId) external view returns (uint) {
        return requestIdGames[_requestId].length;
    }

    /* ========== INTERPOOL FUNCTIONS ========== */

    // @notice Change the number of expected predictions for the contest
    function changeNumberOfPredictions(uint16 _nbOfPredictions)
        public
        onlyOwner
    {
        nbOfPredictions = _nbOfPredictions;
    }

    // @notice change League Id :  53 for Ligue 1, 42 Champion's League, 77 World Cup
    function changeLeagueId(uint8 _leagueId) public onlyOwner {
        leagueId = _leagueId;
    }

    // @notice save predictions for a player for the current contest
    function savePrediction(GameResolve[] memory _gamePredictions) public {
        require(
            _gamePredictions.length == nbOfPredictions,
            "The number of predictions doesn't match!"
        );
        require(
            predictionsPerPlayer[msg.sender].length == 0,
            "You already saved predictions!"
        );
        for (uint16 i = 0; i < nbOfPredictions; i++) {
            predictionsPerPlayer[msg.sender].push(
                GameResolve({
                    gameId: _gamePredictions[i].gameId,
                    homeScore: _gamePredictions[i].homeScore,
                    awayScore: _gamePredictions[i].awayScore,
                    status: _gamePredictions[i].status
                })
            );
        }
    }

    /* ========== INTERPOOL VIEW FUNCTIONS ========== */

    // @notice get the previsions per Player
    function getPrevisionsPerPlayer(address _player)
        public
        view
        returns (GameResolve[] memory)
    {
        return predictionsPerPlayer[_player];
    }

    // @notice transform scores of home and away to a result of game : 0 = home win, 1 = draw, 2 = away win
    function calculateMatchResult(uint8 _homeScore, uint8 _awayScore)
        private
        pure
        returns (uint8)
    {
        uint8 gameResult;
        if (_homeScore > _awayScore) {
            gameResult = 0;
        } else if (_awayScore > _homeScore) {
            gameResult = 2;
        } else {
            gameResult = 1;
        }
        return gameResult;
    }

    /// @notice compare the predictions of a player with results from Oracle
    function checkResult(address _player) public view returns (uint16) {
        bytes32 requestId = requestsIdList[counter - 1];
        uint8 gameResultPlayer; // 0 home win, 1 draw, 2 away win
        uint8 gameResultOracle; // 0 home win, 1 draw, 2 away win
        uint16 playerScoring = 0;

        for (uint16 i = 0; i < nbOfPredictions; i++) {
            gameResultPlayer = calculateMatchResult(
                predictionsPerPlayer[_player][i].homeScore,
                predictionsPerPlayer[_player][i].awayScore
            );
            GameResolve memory gameResolveOracle = _getGameResolveStruct(
                requestIdGames[requestId][i]
            );
            gameResultOracle = calculateMatchResult(
                gameResolveOracle.homeScore,
                gameResolveOracle.awayScore
            );
            if (gameResultPlayer == gameResultOracle) {
                playerScoring += 5;
                if (
                    predictionsPerPlayer[_player][i].homeScore ==
                    gameResolveOracle.homeScore
                ) {
                    playerScoring += 2;
                }
                if (
                    predictionsPerPlayer[_player][i].awayScore ==
                    gameResolveOracle.awayScore
                ) {
                    playerScoring += 2;
                }
            }
        }
        return playerScoring;
    }

    /* ========== UTILITY FUNCTIONS ========== */

    function contractBalances()
        public
        view
        returns (uint256 eth, uint256 link)
    {
        eth = address(this).balance;

        LinkTokenInterface linkContract = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        link = linkContract.balanceOf(address(this));
    }

    /* ========== PRIVATE PURE FUNCTIONS ========== */

    function _addUintArray(
        Chainlink.Request memory _req,
        string memory _key,
        uint256[] memory _values
    ) private pure {
        Chainlink.Request memory r2 = _req;
        r2.buf.encodeString(_key);
        r2.buf.startArray();
        uint256 valuesLength = _values.length;
        for (uint256 i = 0; i < valuesLength; ) {
            r2.buf.encodeUInt(_values[i]);
            unchecked {
                ++i;
            }
        }
        r2.buf.endSequence();
        _req = r2;
    }

    function _getGameCreateStruct(bytes memory _data)
        private
        pure
        returns (GameCreate memory)
    {
        uint32 gameId = uint32(bytes4(_sliceDynamicArray(0, 4, _data)));
        uint40 startTime = uint40(bytes5(_sliceDynamicArray(4, 9, _data)));
        uint8 homeTeamLength = uint8(bytes1(_data[9]));
        uint256 endHomeTeam = 10 + homeTeamLength;
        string memory homeTeam = string(
            _sliceDynamicArray(10, endHomeTeam, _data)
        );
        string memory awayTeam = string(
            _sliceDynamicArray(endHomeTeam, _data.length, _data)
        );
        GameCreate memory gameCreate = GameCreate(
            gameId,
            startTime,
            homeTeam,
            awayTeam
        );
        return gameCreate;
    }

    function _getGameResolveStruct(bytes memory _data)
        private
        pure
        returns (GameResolve memory)
    {
        uint32 gameId = uint32(bytes4(_sliceDynamicArray(0, 4, _data)));
        uint8 homeScore = uint8(bytes1(_data[4]));
        uint8 awayScore = uint8(bytes1(_data[5]));
        string memory status = string(
            _sliceDynamicArray(6, _data.length, _data)
        );
        GameResolve memory gameResolve = GameResolve(
            gameId,
            homeScore,
            awayScore,
            status
        );
        return gameResolve;
    }

    function _sliceDynamicArray(
        uint256 _start,
        uint256 _end,
        bytes memory _data
    ) private pure returns (bytes memory) {
        bytes memory result = new bytes(_end - _start);
        for (uint256 i = 0; i < _end - _start; ++i) {
            result[i] = _data[_start + i];
        }
        return result;
    }
}
