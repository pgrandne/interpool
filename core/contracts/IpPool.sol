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
    /// @notice Get the balance of aUSDC in No Pool No Game
    /// @notice and balance of USDC from the Player
    function balanceOf(address account) external view returns (uint);

    /// @notice Approve the deposit of USDC from No Pool No Game to Aave
    function approve(address spender, uint amount) external returns (bool);

    /// @notice Confirm the allowed amount before deposit
    function allowance(address owner, address spender)
        external
        view
        returns (uint);

    /// @notice Transfer USDC from User to Pool contract
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

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
        uint amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    /// @notice Withdraw USDC from Aave Pool
    function withdraw(
        address asset,
        uint amount,
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
    mapping(address => Winnings) internal winningsPerPlayer;

    /// @notice all the winnings waiting claimings from players
    uint256 public globalPendingWinnings;

    IERC20 private usdcToken;
    IERC20 private aUsdcToken;
    IERC20 internal interPoolTicket;
    PoolAave private poolAave;

    constructor() {
        usdcToken = IERC20(0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43);
        poolAave = PoolAave(0x368EedF3f56ad10b9bC57eed4Dac65B26Bb667f6);
        aUsdcToken = IERC20(0x1Ee669290939f8a8864497Af3BC83728715265FF);
        interPoolTicket = IERC20(0xD81e4a61FD6Bf066539dF6EA48bfaeAe847DCdA1);
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

    /// @notice Deposit USDC on Pool which will be deposited on Aave and receive tickets
    /// @notice Amount = nb of tickets / 1 ticket = 50 USDC
    function depositOnAave(uint _amount) public {
        require(_amount % 50 == 0, "The amount must be a multiple of 50");
        require(
            _amount * 10**6 <= usdcToken.balanceOf(msg.sender),
            "Insufficent amount of USDC"
        );
        require(
            _amount * 10**6 <= usdcToken.allowance(msg.sender, address(this)),
            "Insufficient allowed USDC"
        );
        uint256 nbTickets = _amount / 50;
        usdcToken.transferFrom(msg.sender, address(this), _amount * 10**6);
        usdcToken.approve(address(poolAave), _amount * 10**6);
        poolAave.supply(address(usdcToken), _amount * 10**6, address(this), 0);
        interPoolTicket.mint(msg.sender, nbTickets);
    }

    /// @notice Claim pendings winnings
    /// @notice reinit pendings winnings and substract from all pendings waiting claiming
    function claimFromPool() public {
        require(
            winningsPerPlayer[msg.sender].pendingWinnings > 0,
            "There is no pending winnings!"
        );
        uint256 amount = winningsPerPlayer[msg.sender].pendingWinnings;
        poolAave.withdraw(address(usdcToken), amount, msg.sender);
        winningsPerPlayer[msg.sender].pendingWinnings = 0;
        winningsPerPlayer[msg.sender].claimedWinnings += amount;
        globalPendingWinnings -= amount;
    }

    /// @notice Withdraw from the pool, 1 ticket = 50 USDC
    function withdrawFromPool(uint256 _nbTickets) internal {
        require(
            interPoolTicket.balanceOf(msg.sender) >= _nbTickets,
            "You don't have enough tickets!"
        );
        interPoolTicket.burn(msg.sender, _nbTickets);
        poolAave.withdraw(
            address(usdcToken),
            _nbTickets * 50 * 10**6,
            msg.sender
        );
    }

    /* ========== POOL READ FUNCTIONS ========== */

    /// @notice get the Prize Pool of the current contest
    /// @notice Prize Pool = USDC on Aave Pool - (Number of supplied tickets x 50) - pendings waiting claiming
    function getGlobalPrizePool() public view returns (uint) {
        uint256 aavePoolValue = aUsdcToken.balanceOf(address(this));
        uint256 ipPoolValue = interPoolTicket.totalSupply() * 50 * 10**6;
        return aavePoolValue - ipPoolValue - globalPendingWinnings;
    }

    /// @notice get pendings and claimed winings for a player
    function getWinningsPerPlayer(address _player)
        public
        view
        returns (Winnings memory)
    {
        return winningsPerPlayer[_player];
    }
}
