import { useState } from "react";
import ModalMoreTickets from "../components/modals/ModalMoreTickets";
import ModalRedeem from "../components/modals/ModalRedeem";
import ModalClaim from "../components/modals/ModalClaim";
import BannerTickets from "../components/home/BannerTickets";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'

function SectionAccount() {
    const addressNetwork = useAddressNetwork()
    const [ticket, setTicket] = useState(0)
    const { isConnected, address }: { isConnected: boolean, address: any } = useAccount()
    useContractRead({
        address: addressNetwork.interPoolTicketContract,
        abi: erc20ABI,
        functionName: 'balanceOf',
        watch: true,
        args: [isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
        onSuccess(data: any) {
            setTicket(parseInt(ethers.utils.formatUnits(data._hex, 0)))
        },
    })

    const [modalRedeem, setModalRedeem] = useState(false)
    const [modalMoreTickets, setModalMoreTickets] = useState(false)
    const [modalClaim, setModalClaim] = useState(false)

    return (
        <section id="Account" data-w-id="90400c33-4d36-cc84-d01f-507bc873a726" className="section-account wf-section">
            <div className="container-3 w-container">
                <h1>On-going prediction game</h1>
                <BannerTickets ticket={ticket} />
                <h1>Account details</h1>
                <div className="w-layout-grid grid-5">
                    <div id="w-node-e00559bd-addc-db20-b067-e2b04976c8e7-3d3dc5f0" className="account-details-grid-heading">Tickets</div>
                    <div id="w-node-c1e81ac4-71c0-32d4-6233-8d1a57d9a86d-3d3dc5f0" className="text-block-grid-content">{ticket}</div>
                    <div id="w-node-_23834aa8-b05c-48c4-6c93-858034514a29-3d3dc5f0">
                        <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className="hollow-button white"
                            onClick={(e) => {
                                e.preventDefault()
                                setModalRedeem(true)
                            }}
                        >Redeem your tickets</a>
                    </div>
                    <div id="w-node-c4b2e9f4-9be0-f147-c346-35eca6c6e9d5-3d3dc5f0" className="div-block-48">
                        <div id="w-node-f34601d1-b651-b667-ebec-c34b6d7c6687-3d3dc5f0" className="account-details-grid-heading">Pending Winnings</div><img src="images/trophy.png" loading="lazy" width="35" id="w-node-ac5ac2a7-1fb1-3ea2-a16d-f95ef4722400-3d3dc5f0" sizes="34.99055099487305px" srcSet="images/trophy.png 500w, images/trophy.png 512w" alt="" className="image-19" />
                    </div>
                    <div id="w-node-_18474311-dda1-9d24-5fc2-19e8d34e7da1-3d3dc5f0" className="text-block-grid-content">$82.0</div>
                    <div id="w-node-_3613a481-370e-2c98-3fc4-cbfe298cc1cd-3d3dc5f0" className="div-block-49">
                        <a href="/" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted"
                            onClick={(e) => {
                                e.preventDefault()
                                setModalMoreTickets(true)
                            }}
                        >Get more tickets!</a>
                        <a href="/" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted"
                            onClick={(e) => {
                                e.preventDefault()
                                setModalClaim(true)
                            }}
                        >Claim now!</a>
                    </div>
                    <div id="w-node-cd5c49f3-3443-15f4-fee3-549c3907df1f-3d3dc5f0" className="account-details-grid-heading">Total Winnings</div>
                    <div id="w-node-_691393fb-f6ac-f9a3-ad79-c9918787c975-3d3dc5f0" className="text-block-grid-content">$205.0</div>
                </div>
                <h1>Current contest ranking</h1>
                <div className="w-layout-grid grid-4">
                    <div id="w-node-ade59832-9e80-0a14-2933-cb481c0bd5c8-3d3dc5f0" className="header-grid-history header-grid-history-left">Prediction Game</div>
                    <div id="w-node-_529643fb-8c8a-4deb-3340-ec7494a5abee-3d3dc5f0" className="header-grid-history">Prize Pool</div>
                    <div id="w-node-_3516d465-5aa2-1ac4-fafa-6dfe38e10d3d-3d3dc5f0" className="header-grid-history">Rank</div>
                    <div id="w-node-e0051b68-543d-1fe6-cef2-e0c50e02645a-3d3dc5f0" className="header-grid-history">Participants</div>
                    <div id="w-node-d12aa462-b1e7-5186-1dbe-5765aa5e3ae9-3d3dc5f0" className="header-grid-history header-grid-history-droite">Winnings</div>
                    <div id="w-node-_64932c9e-4808-d561-0cd9-677953178864-3d3dc5f0" className="content-grid-history">#4</div>
                    <div id="w-node-_3fb0138f-fb6f-aa8d-0711-d670c91d5750-3d3dc5f0" className="content-grid-history">$3,120.00</div>
                    <div id="w-node-bcd0c380-d5a0-b33f-4f89-5178696c32d7-3d3dc5f0" className="content-grid-history">6</div>
                    <div id="w-node-_138b185a-30d7-acc4-cfab-69438ef52dbc-3d3dc5f0" className="content-grid-history">142</div>
                    <div id="w-node-_911736f7-4f0d-0086-e921-4ea6edb9cf9d-3d3dc5f0" className="content-grid-history">$82.00</div>
                    <div id="w-node-_40b77038-886e-e802-1b32-bbf728ba0ed5-3d3dc5f0" className="content-grid-history">#3</div>
                    <div id="w-node-d3d40ff3-4e40-38e2-2744-e06399c6d325-3d3dc5f0" className="content-grid-history">$3,107.35</div>
                    <div id="w-node-cfd1cd2f-1b84-f26e-4217-15c2258c7db5-3d3dc5f0" className="content-grid-history">6</div>
                    <div id="w-node-aeb18608-fab3-8a4e-a6db-c30d30f06258-3d3dc5f0" className="content-grid-history">142</div>
                    <div id="w-node-_19d36965-20fe-1bb9-80bb-719aed32d378-3d3dc5f0" className="content-grid-history">$100.00</div>
                    <div id="w-node-ea22a431-b6af-e7de-7b5c-e6a18d0d40d0-3d3dc5f0" className="content-grid-history">#2</div>
                    <div id="w-node-_6497bf6f-9e3a-6155-d62b-3c44ec42a4e0-3d3dc5f0" className="content-grid-history">$2,802.10</div>
                    <div id="w-node-f795d8da-7c6b-8f2f-aafa-4b984d7a3396-3d3dc5f0" className="content-grid-history">12</div>
                    <div id="w-node-_1b67f4f5-654d-32bc-3435-cf7e57bd8c17-3d3dc5f0" className="content-grid-history">172</div>
                    <div id="w-node-aa5db594-d675-ce87-abce-94475be03f2a-3d3dc5f0" className="content-grid-history">$22.00</div>
                    <div id="w-node-_65888af4-c1e6-20a2-9cdb-2ee96df26bea-3d3dc5f0" className="content-grid-history">#1</div>
                    <div id="w-node-_5171b502-a0b4-a67f-923c-2fae49b3d9ae-3d3dc5f0" className="content-grid-history">$1,820.00</div>
                    <div id="w-node-f5c7c90b-8499-e785-855a-3dbb80a5169f-3d3dc5f0" className="content-grid-history">45</div>
                    <div id="w-node-_5f7ef733-14a7-273c-7e28-e2aba74798af-3d3dc5f0" className="content-grid-history">102</div>
                    <div id="w-node-_2325228c-eb24-899d-519d-258763b597cb-3d3dc5f0" className="content-grid-history">$1.00</div>
                </div>
            </div>
            {modalRedeem && <ModalRedeem setModalRedeem={setModalRedeem} />}
            {modalMoreTickets && <ModalMoreTickets setModalMoreTickets={setModalMoreTickets} />}
            {modalClaim && <ModalClaim setModalClaim={setModalClaim} />}
        </section>
    )
}

export default SectionAccount;