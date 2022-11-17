import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { useAddressNetwork } from '../../utils/useAddressNetwork'
import { ABI_Interpool } from '../../utils/ABI_Interpool'
import { toast } from 'react-toastify';
import { useState } from 'react';
interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}

function ModalSubmit({ prediction, setModalSubmit, setSubmitted }: {
    prediction: IPrediction[],
    setModalSubmit: React.Dispatch<React.SetStateAction<boolean>>,
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>,


}) {
    const addressNetwork: any = useAddressNetwork();
    const [loading, setLoading] = useState(false)
    const { config }: { config: any } = usePrepareContractWrite({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'savePrediction',
        args: [prediction]
    })
    const { data, write } = useContractWrite({
        ...config,
        onSuccess() {
            toast("⚽ Submission requested!")
        },
        onError() {
            toast("❌ Submission Canceled!")
            setLoading(false)
        }
    })

    useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            setSubmitted(true)
            setModalSubmit(false)
        },
        onError() {
            toast("❌ Transaction failed!")
            setLoading(false)
        }
    })





    return (
        <div className="modal-wrapper">
            <div data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f754" className="modal-outside-trigger" onClick={(e) => { setModalSubmit(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f757" alt="" className="image-18" onClick={(e) => { setModalSubmit(false) }} /></div>
                <h2 className="heading-6 heading-6-variation-2">Submit your <br />predictions</h2>
                <p className="paragraph2">As long as the prediction period is not over, you can submit new predictions. The last submission you have done will be the only one considered, and the previous ones will therefore be overridden.</p>
                <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className={!loading ? "hollow-button white" : "hollow-button notactive"}
                    onClick={(e) => {
                        e.preventDefault()
                        setLoading(true)
                        write?.()
                    }}
                >{loading && <i className="fa fa-refresh fa-spin"></i>} Confirm!</a>
            </div>
        </div>
    )
}

export default ModalSubmit;