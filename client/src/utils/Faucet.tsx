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


function Faucet() {
    const { address }: { address: any } = useAccount()
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
            toast("⚽ 50 USDC Requested!")
        },
        onError(error) {
            toast("❌ Request Canceled!")
            setLoading(false)
            console.log(error)
        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            toast("⚽ 50 USDC Received!")
        },
        onError(error) {
            toast("❌ Transaction failed!")
            setLoading(false)
            console.log(error)
        }
    })


    const handleCopy = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigator.clipboard.writeText(address)
        toast.update("goerli", {
            render: () => <Msg2 />
        });
    }

    const Msg: any = ({ closeToast, toastProps }: { closeToast: any, toastProps: any }) => (
        <div>
            ⚽ You need Gas for transaction fees: <br />
            <ol className="a">
                <li>First, click <a href="/" onClick={(e) => { handleCopy(e) }} >here</a> to copy your address</li>
                <li>Then, claim some < a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer"> here</a > for free or DM us on < a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer"> Twitter</a ></li>
            </ol>
        </div >
    )

    const Msg2: any = ({ closeToast, toastProps }: { closeToast: any, toastProps: any }) => (
        <div>
            ⚽ You need Goerli ETH to proceed transactions! <br />
            <ol className="a">
                <li>Copied!</li>
                <li>Then, claim some < a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer"> here</a > for free or DM us on < a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer"> Twitter</a ></li>
            </ol>
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
                    toast(<Msg />, {
                        toastId: "goerli",
                        position: 'top-left',
                        autoClose: 15000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        style: { width: "500px" }
                    }
                    )
                }
            }}> {loading && <i className="fa fa-refresh fa-spin"></i>} Faucet 50 USDC</a >
    )
}

export default Faucet;