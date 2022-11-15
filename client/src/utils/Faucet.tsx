import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { goerli } from './contractAddress'
import { useState } from 'react'
import { toast } from 'react-toastify';


const Faucet = () => {
    const [loading, setLoading] = useState(false)
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
        args: [ethers.utils.parseUnits('100', 6)],
    })

    const { data, write } = useContractWrite({
        ...config,
        onSuccess() {
            toast("⚽ 100 USDC Requested!")
        },
        onError() {
            toast("❌ Request Canceled!")
            setLoading(false)
        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            toast("⚽ 100 USDC Received!")
        },
        onError() {
            toast("❌ Transaction failed!")
            setLoading(false)
        }
    })

    return (
        <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className={!loading ? "hollow-button white" : "hollow-button notactive"}
            onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                write?.()
            }
            }>{loading && <i className="fa fa-refresh fa-spin"></i>} Faucet 100 USDC</a>
    )
}

export default Faucet;