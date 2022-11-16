import { useAccount, useBalance, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers } from 'ethers'
import { goerli } from './contractAddress'
import { useState } from 'react'
import { toast } from 'react-toastify';

const GetBalance = () => {
    const { address } = useAccount()
    const { data }: { data: any } = useBalance({
        addressOrName: address,
    })
    return (parseFloat(data.formatted))
}


const Faucet = () => {
    console.log(GetBalance())
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
        args: [ethers.utils.parseUnits('50', 6)],
    })

    const bal: number = GetBalance();

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

    const Msg: any = ({ closeToast, toastProps }: { closeToast: any, toastProps: any }) => (
        <div>
            ⚽ You need Goerli ETH to proceed transactions! <br />
            Go claim < a href="https://goerlifaucet.com/" > here</a > <br />
            Or ask us on < a href="https://twitter.com/IrruptionLab" > Twitter</a >
        </div >
    )

    return (
        <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className={!loading ? "hollow-button white" : "hollow-button notactive"}
            onClick={(e) => {
                e.preventDefault()
                if (bal > 0) {
                    setLoading(true)
                    write?.()
                } else {
                    toast(<Msg />, { autoClose: 10000 })
                }
            }}> {loading && <i className="fa fa-refresh fa-spin"></i>} Faucet 50 USDC</a >
    )
}

export default Faucet;