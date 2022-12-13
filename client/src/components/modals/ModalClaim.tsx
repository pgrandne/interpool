import { useState } from 'react'
import { toast } from 'react-toastify';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ABI_Interpool } from '../../utils/ABI_Interpool'
import { useAddressNetwork } from '../../utils/useAddressNetwork'

function ModalClaim({ setModalClaim, pendingWinnings, setClaimed }: {
    setModalClaim: React.Dispatch<React.SetStateAction<boolean>>,
    pendingWinnings: number,
    setClaimed: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const addressNetwork: any = useAddressNetwork()
    const [loading, setLoading] = useState(false)
    const { config }: { config: any } = usePrepareContractWrite({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'claim',
    })
    const { data, write } = useContractWrite({
        ...config,
        onSuccess() {
            toast("⚽ Claim requested")
        },
        onError() {
            toast("❌ Claim canceled!")
            setLoading(false)

        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            setClaimed(true)
            setModalClaim(false)
        },
        onError() {
            toast("❌ Transaction failed!")
            setLoading(false)
        }
    })

    return (
        <div className="modal-wrapper">
            <div data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f754" className="modal-outside-trigger" onClick={(e) => { setModalClaim(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f757" alt="" className="image-18" onClick={(e) => { setModalClaim(false) }} /></div>
                <h2 className="heading-6 heading-6-variation-2">Claim now!</h2>
                <p className="paragraph">Please confirm the amount you want to claim. <br />The amount in USDC will be sent to your personal wallet.</p>
                <div className="div-block-47">
                    <div className="text-block-45">Pending winnings</div>
                    <div className="text-block-44">${pendingWinnings.toFixed(2)}</div>
                </div>
                <div className="div-block-39 div-block-39-withdrawal-variation">
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/usd-coin-usdc-logo.png" loading="lazy" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" sizes="100vw" alt="" className="image-16" />
                            <div className="text-block-43">{pendingWinnings.toFixed(2)}  </div>
                        </div>
                        <div className="text-block-41"> USDC</div>
                    </div>
                </div>
                <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className={!loading ? "hollow-button white" : "hollow-button notactive"}
                    onClick={(e) => {
                        e.preventDefault()
                        setLoading(true)
                        write?.()
                    }}>{loading && <i className="fa fa-refresh fa-spin"></i>} Claim now!</a>
            </div>
        </div>
    )
}

export default ModalClaim;