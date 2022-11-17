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


    const handleCopy = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        toast.update("goerli", {
            render: () => <Msg2 />
        });
    }

    const Msg: any = ({ closeToast, toastProps }: { closeToast: any, toastProps: any }) => (
        <div>
            ⚽ You need Goerli ETH to proceed transactions! <br />
            <ul className="a">
                <li>Click <a href="/" onClick={(e) => { handleCopy(e) }} >here</a> to copy your address</li>
                <li>Go claim < a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer"> here</a ></li>
                <li>Or ask us on < a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer"> Twitter</a ></li>
            </ul>
        </div >
    )

    const Msg2: any = ({ closeToast, toastProps }: { closeToast: any, toastProps: any }) => (
        <div>
            ⚽ You need Goerli ETH to proceed transactions! <br />
            <ul className="a">
                <li>Copied!</li>
                <li>Go claim < a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer" > here</a ></li>
                <li>Or ask us on < a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer" > Twitter</a ></li>
            </ul>
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
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        style: { width: "500px" }
                    }
                    )
                }
            }}> {loading && <i className="fa fa-refresh fa-spin"></i>} Faucet 50 USDC</a >
    )
}

export default Faucet;