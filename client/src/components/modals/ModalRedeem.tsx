import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ABI_Interpool } from '../../utils/ABI_Interpool'
import { useAddressNetwork } from '../../utils/useAddressNetwork'
import { toast } from 'react-toastify';
import { useState } from 'react';

function ModalRedeem({ setModalRedeem, ticket, setRedeemed }: {
    setModalRedeem: React.Dispatch<React.SetStateAction<boolean>>,
    ticket: number,
    setRedeemed: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const addressNetwork: any = useAddressNetwork()
    const { address } = useAccount()
    const [loading, setLoading] = useState(false)
    const [played, setPlayed] = useState(false)
    const { config }: { config: any } = usePrepareContractWrite({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'withdraw',
        args: [1, ticket]
    })
    const { write, data } = useContractWrite({
        ...config,
        onSuccess() {
            toast("⚽ Withdrawal requested")
        },
        onError() {
            toast("❌ Withdrawal Canceled")
            setLoading(false)
        }
    })

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getVerifPlayerPlayedPerContest',
        args: [6, address],
        onSuccess(data: any) {
            setPlayed(data)
        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            setRedeemed(true)
            setModalRedeem(false)
        },
        onError() {
            toast("❌ Transaction failed!")
            setLoading(false)
        }
    })

    const compareDate = () => {
        if (played && 1670022000000 > new Date().getTime())
            return true
        else
            return false
    }

    return (
        <div className="modal-wrapper">
            <div data-w-id="603c69d3-e3d9-0e33-110b-153490c7d332" className="modal-outside-trigger" onClick={(e) => { setModalRedeem(false) }} ></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="d2e62b3c-64b1-a895-d519-6c4df4870e79" alt="" className="image-18" onClick={(e) => { setModalRedeem(false) }} /></div>
                <h2 className="heading-7">Redeem Confirmation</h2>
                <p className="paragraph">Without Tickets you will not be eligible to enter the next prediction games. The amount you redeem will be credited on your personal wallet in USDC.</p>
                <div className="div-block-39">
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/ticket-2.png" loading="lazy" alt="" className="image-16" />
                            <div className="text-block-43">{ticket}</div>
                        </div>
                        <div className="text-block-41">x Ticket(s)</div>
                    </div>
                    <div className="div-block-38"><img src="images/next.png" loading="lazy" alt="" className="image-17" /></div>
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/usd-coin-usdc-logo.png" loading="lazy" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" sizes="100vw" alt="" className="image-16" />
                            <div className="text-block-43">{ticket * 50}</div>
                        </div>
                        <div className="text-block-41">USDC</div>
                    </div>
                </div>
                {<a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className={!loading && !played ? "hollow-button white" : "hollow-button notactive"}
                    onClick={(e) => {
                        e.preventDefault()
                        setLoading(true)
                        write?.()
                    }}> {loading && <i className="fa fa-refresh fa-spin"></i>} {compareDate() ? "Please wait the end of the contest" : "Confirm Ticket Redeem"}</a>}
            </div>
        </div >
    )
}

export default ModalRedeem;