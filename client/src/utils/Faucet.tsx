import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { goerli } from './contractAddress'

const Faucet = () => {
    const { config } = usePrepareContractWrite({
        address: goerli.usdcContract,
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },],
        functionName: 'mint',
        args: [ethers.utils.parseUnits('100', 6)]
    })

    const { write } = useContractWrite(config)

    return (
        <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className="hollow-button white"
            onClick={(e) => {
                e.preventDefault()
                write?.()
            }
            }>Faucet USDC</a>
    )
}

export default Faucet;