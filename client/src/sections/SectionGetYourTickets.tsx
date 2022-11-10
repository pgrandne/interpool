import { useEffect, useState } from "react";
import ModalDeposit from "../components/modals/ModalDeposit";
import { ToastContainer, toast } from 'react-toastify';
import { useAccount } from "wagmi";

function SectionGetYourTickets() {
    const { isConnected } = useAccount()
    const [deposited, setDeposited] = useState(false)
    useEffect(() => {
        if (deposited) {
            toast("⚽ USDC Deposit Confirmation!")
            setDeposited(false)
        }
    }, [deposited])

    const [nbTickets, setNbTickets] = useState(1);
    const [modalDeposit, setModalDeposit] = useState(false);
    return (
        <section id="get-your-tickets" data-w-id="1d9e582d-b4e2-39bf-da9e-2c5517289a0e" className="section-buy-ticket wf-section">
            <div className="container-2 w-container">
                <div className="div-block-18">
                    <h1 data-w-id="11d36449-1ec6-cc9e-b0ea-c2b94a3fc351" className="heading-6">Get your Tickets!</h1>
                    <div className="text-block-13">Each ticket require a deposit of $50 that will be locked during the full contest period. <br />More tickets you get, higher will be your winnings! </div>
                    <div className="div-block-8">
                        <div className="form-block-2 w-form">
                            <form id="email-form-3" name="email-form-3" data-name="Email Form 3" method="get" className="form-2"><label className="field-label">Get</label>
                                <input type="string" className="text-field w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder={nbTickets.toString()} id="name-8"
                                    onChange={(e) => {
                                        e.target.value !== '' ?
                                            setNbTickets(parseInt(e.target.value)) :
                                            setNbTickets(0)
                                    }}
                                /><label className="field-label">Tickets</label></form>
                        </div>
                        {/* <div className="text-block-8">($150)*</div> */}
                        {!isConnected && <a href="/" className="hollow-button notactive">Please connect!</a>}
                        {isConnected && <a href="/" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted"
                            onClick={(e) => {
                                e.preventDefault()
                                setModalDeposit(true)
                            }}
                        >Confirm</a>}
                    </div>
                    <div className="text-block-14">* You can get your deposit back right after the end of the contest, or fill in your prediction for the next contest and win more prizes!</div>
                </div>
            </div>
            {modalDeposit && <ModalDeposit nbTickets={nbTickets} setModalDeposit={setModalDeposit} setDeposited={setDeposited} />}
            <ToastContainer />
        </section >
    )
}
export default SectionGetYourTickets;