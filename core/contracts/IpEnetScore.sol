// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/**
 * @title A consumer contract for Enetscores.
 * @author Perrin GRANDNE based on LinkPool.
 * @notice Interact with the daily events API.
 * @dev Uses @chainlink/contracts 0.4.2.
 */

contract IpEnetScores is ChainlinkClient {
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

    mapping(bytes32 => bytes[]) private requestIdGames;
    error FailedTransferLINK(address to, uint256 amount);
    uint256 payment;
    bytes32 specId;
    bytes32[] listRequestId;

    constructor() {
        /// @notice address for Goerli Network : https://market.link/nodes/Enetpulse/integrations
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xB9756312523826A566e222a34793E414A81c88E1);
        specId = 0x6431313062356334623833643432646361323065343130616335333763643934;
        /// @notice Payment amount = 0.1 Link => 10^17 Juels
        payment = 100000000000000000;
    }

    /* ========== EXTERNAL FUNCTIONS ========== */
    function cancelRequest(
        bytes32 _requestId,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) external {
        cancelChainlinkRequest(
            _requestId,
            payment,
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
    }

    /**
     * @notice Requests the tournament games either to be created or to be resolved on a specific date.
     * @dev Requests the 'schedule' endpoint. Result is an array of GameCreate or GameResolve encoded (see structs).
     * @param _market the number associated with the type of market (see Data Conversions).
     * @param _leagueId the tournament ID.
     * @param _date the starting time of the event as a UNIX timestamp in seconds.
     */
    function requestSchedule(
        uint256 _market,
        uint256 _leagueId,
        uint256 _date
    ) external returns (bytes32) {
        Chainlink.Request memory req = buildOperatorRequest(
            specId,
            this.fulfillSchedule.selector
        );
        req.addUint("market", _market);
        req.addUint("leagueId", _leagueId);
        req.addUint("date", _date);
        bytes32 requestId = sendOperatorRequest(req, payment);
        listRequestId.push(requestId);
        return requestId;
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

    /// @notice Get Numbers of Game for a request id
    function getNumberOfGamesPerRequest(bytes32 _requestId)
        external
        view
        returns (uint256)
    {
        return requestIdGames[_requestId].length;
    }

    /// @notice Get List of Games with info (game id, homeTeam name, awayTeam name) for a request
    function getGameInfoPerRequestId(bytes32 _requestId)
        external
        view
        returns (GameCreate[] memory)
    {
        uint256 nbGames = requestIdGames[_requestId].length;
        GameCreate[] memory listGamesPerRequest = new GameCreate[](nbGames);
        for (uint256 i = 0; i < nbGames; i++) {
            listGamesPerRequest[i] = _getGameCreateStruct(
                requestIdGames[_requestId][i]
            );
        }
        return listGamesPerRequest;
    }

    /// @notice Get Game id of a request by index of the request array
    function getGameIdPerRequestIndex(bytes32 _requestId, uint256 _idx)
        external
        view
        returns (uint32)
    {
        GameCreate memory gameInfo = _getGameCreateStruct(
            requestIdGames[_requestId][_idx]
        );
        return gameInfo.gameId;
    }

    /// @notice Get Scores (HomeScore, AwayScore) from a Game Id in a Request
    /// @notice If the game doesn't exist or the match is not finished, homeScore=255 is sent
    function getScoresPerGameIdPerRequest(bytes32 _requestId, uint32 _gameId)
        external
        view
        returns (uint8, uint8)
    {
        uint256 nbGames = requestIdGames[_requestId].length;
        uint8 homeScore = 255;
        uint8 awayScore;
        for (uint256 i = 0; i < nbGames; i++) {
            GameResolve memory gameResult = _getGameResolveStruct(
                requestIdGames[_requestId][0]
            );
            if (_gameId == gameResult.gameId) {
                homeScore = gameResult.homeScore;
                awayScore = gameResult.awayScore;
                break;
            }
        }
        return (homeScore, awayScore);
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
