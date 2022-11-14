//SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title InterPool : General Pool Contract
/// @author Perrin GRANDNE
/// @notice Contract for Deposit and Withdraw on the Pool
/// @notice This contract can be used for several applications
/// @custom:experimental This is an experimental contract.

/// @notice Only ERC-20 functions we need
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    /// @notice Approve the deposit of USDC from Interpool to Aave
    function approve(address spender, uint256 amount) external returns (bool);

    /// @notice Confirm the allowed amount before deposit
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /// @notice Transfer USDC from User to Pool contract
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /// @notice Withdraw USDC from No Pool No Game
    function transfer(address recipient, uint amount) external returns (bool);

    /// @notice Mint token when user deposits on the pool
    function mint(address sender, uint amount) external;

    /// @notice Burn token when user withdraws from the pool
    function burn(address sender, uint amount) external;

    /// @notice Get the Total Supply of the token
    function totalSupply() external view returns (uint);
}

/// @notice Only PoolAave functions we need
interface PoolAave {
    /// @notice Deposit USDC to Aave Pool
    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    /// @notice Withdraw USDC from Aave Pool
    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external;
}

/* ========== CONTRACT BEGINNING ========== */

contract IpPool is Ownable, Pausable {
    /// @notice struct for mapping Winnings per Player
    struct Winnings {
        uint256 pendingWinnings;
        uint256 claimedWinnings;
    }

    /// @notice mapping for saving pending and claimed winnings for each player
    /// @notice Player => Winnings
    mapping(address => Winnings) private winningsPerPlayer;

    /// @notice all the winnings waiting claimings from players
    uint256 private globalPendingWinnings;

    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 private interpoolTicket;
    PoolAave private poolAave;
    address private interpoolContract;

    constructor() {
        usdcToken = IERC20(0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43);
        poolAave = PoolAave(0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6);
        aUsdcToken = IERC20(0x1Ee669290939f8a8864497Af3BC83728715265FF);
        interpoolTicket = IERC20(0xD81e4a61FD6Bf066539dF6EA48bfaeAe847DCdA1);
        setInterpoolContract(0xBCDc8D3f7f20D1FB9419FB1BdbF028bb2651bEf1);
        globalPendingWinnings = 0;
    }

    /* ========== POOL WRITE FUNCTIONS ========== */

    /// @notice Pausable functions
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice CDefine the contract for testing (only for testnet), the 2 contracts will merge after validation
    function setInterpoolContract(address _interpoolContract) public onlyOwner {
        interpoolContract = _interpoolContract;
    }

    /// @notice Deposit USDC on Pool which will be deposited on Aave and receive tickets
    /// @notice Amount = nb of tickets / 1 ticket = 50 USDC
    function depositOnAave(uint256 _amount, address _player) external {
        require(msg.sender == interpoolContract, "Not allowed!");
        require(_amount % 50 == 0, "The amount must be a multiple of 50");
        require(
            _amount * 10**6 <= usdcToken.balanceOf(_player),
            "Insufficent amount of USDC"
        );
        require(
            _amount * 10**6 <= usdcToken.allowance(_player, address(this)),
            "Insufficient allowed USDC"
        );
        uint256 nbTickets = _amount / 50;
        usdcToken.transferFrom(_player, address(this), _amount * 10**6);
        usdcToken.approve(address(poolAave), _amount * 10**6);
        poolAave.supply(address(usdcToken), _amount * 10**6, address(this), 0);
        interpoolTicket.mint(_player, nbTickets);
    }

    /// @notice Claim pendings winnings
    /// @notice reinit pendings winnings and substract from all pendings waiting claiming
    function claimFromPool(address _player) external {
        require(msg.sender == interpoolContract, "Not allowed!");
        require(
            winningsPerPlayer[_player].pendingWinnings > 0,
            "There is no pending winnings!"
        );
        uint256 amount = winningsPerPlayer[_player].pendingWinnings;
        poolAave.withdraw(address(usdcToken), amount, address(this));
        usdcToken.transfer(_player, amount);
        poolAave.withdraw(address(usdcToken), amount, _player);
        winningsPerPlayer[_player].pendingWinnings = 0;
        winningsPerPlayer[_player].claimedWinnings += amount;
        globalPendingWinnings -= amount;
    }

    /// @notice Withdraw from the pool, 1 ticket = 50 USDC
    function withdrawFromPool(uint256 _nbTickets, address _player) external {
        require(msg.sender == interpoolContract, "Not allowed!");
        require(
            interpoolTicket.balanceOf(_player) >= _nbTickets,
            "You don't have enough tickets!"
        );
        interpoolTicket.burn(_player, _nbTickets);
        poolAave.withdraw(
            address(usdcToken),
            _nbTickets * 50 * 10**6,
            address(this)
        );
        usdcToken.transfer(_player, _nbTickets * 50 * 10**6);
    }

    /// @notice update winnings per player and global pending winnings
    function setWinnings(address _player, uint256 _winnings) external {
        require(msg.sender == interpoolContract, "Not allowed!");
        winningsPerPlayer[_player].pendingWinnings += _winnings;
        globalPendingWinnings += _winnings;
    }

    /* ========== POOL READ FUNCTIONS ========== */

    /// @notice get the Prize Pool of the current contest
    /// @notice Prize Pool = USDC on Aave Pool - (Number of supplied tickets x 50) - pendings waiting claiming
    function getGlobalPrizePool() external view returns (uint256) {
        uint256 aavePoolValue = aUsdcToken.balanceOf(address(this));
        uint256 ipPoolValue = interpoolTicket.totalSupply() * 50 * 10**6;
        return aavePoolValue - ipPoolValue - globalPendingWinnings;
    }

    /// @notice get pending and claimed winnings for a player
    function getWinningsPerPlayer(address _player)
        external
        view
        returns (uint256, uint256)
    {
        return (
            winningsPerPlayer[_player].pendingWinnings,
            winningsPerPlayer[_player].claimedWinnings
        );
    }

    /// @notice get global winnings of the pool
    function getGlobalPendingWinnings() external view returns (uint256) {
        return globalPendingWinnings;
    }
}
