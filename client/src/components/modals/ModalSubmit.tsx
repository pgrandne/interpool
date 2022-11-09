import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useAddressNetwork } from '../../utils/useAddressNetwork'
import { ABI_Interpool } from '../../utils/ABI_Interpool'
import { ToastContainer, toast } from 'react-toastify';

interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}

function ModalSubmit({ setModalSubmit, prediction }: { setModalSubmit: React.Dispatch<React.SetStateAction<boolean>>, prediction: IPrediction[] }) {
    const addressNetwork: any = useAddressNetwork();
    const { config }: { config: any } = usePrepareContractWrite({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'savePrediction',
        args: [prediction]
    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            toast("⚽ Predictions Submitted!")
            setTimeout(function () { setModalSubmit(false) }, 3000)
        },
    })


    return (
        <div className="modal-wrapper">
            <div data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f754" className="modal-outside-trigger" onClick={(e) => { setModalSubmit(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="df8b8a49-b342-2aa4-caef-ff324eb8f757" alt="" className="image-18" onClick={(e) => { setModalSubmit(false) }} /></div>
                <h2 className="heading-6 heading-6-variation-2">Confirm your predictions!</h2>
                <p className="paragraph">Please confirm... <br />The amount in USDC will be sent to your personal wallet.</p>
                <div className="div-block-47">
                    <div className="text-block-45">TBD</div>
                    <div className="text-block-44">$Tbd</div>
                </div>
                <div className="div-block-39 div-block-39-withdrawal-variation">
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/usd-coin-usdc-logo.png" loading="lazy" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" sizes="100vw" alt="" className="image-16" />
                            <div className="text-block-43">TBd</div>
                        </div>
                        <div className="text-block-41">tbd</div>
                    </div>
                </div>
                <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className="hollow-button white"
                    onClick={(e) => {
                        e.preventDefault()
                        write?.()
                    }}
                >Validate!</a>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ModalSubmit;