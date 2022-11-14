import { useEffect, useState } from "react";
import ModalMoreTickets from "../components/modals/ModalMoreTickets";
import ModalRedeem from "../components/modals/ModalRedeem";
import ModalClaim from "../components/modals/ModalClaim";
import BannerTickets from "../components/home/BannerTickets";
import { useAccount, useContractReads, erc20ABI } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ABI_Interpool } from '../utils/ABI_Interpool'
import { ethers } from 'ethers'
import { ToastContainer, toast } from 'react-toastify';

function SectionAccount() {
    const addressNetwork = useAddressNetwork()
    const [ticket, setTicket] = useState(0)
    const [pendingWinnings, setPendingWinnings] = useState(0)
    const [claimedWinnings, setClaimedWinnings] = useState(0)
    const [redeemed, setRedeemed] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const { isConnected, address }: { isConnected: boolean, address: any } = useAccount()

    const interpoolTicketContract = {
        address: addressNetwork.interPoolTicketContract,
        abi: erc20ABI,
    }
    const interpoolContract = {
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
    }

    useEffect(() => {
        if (redeemed) {
            toast("⚽ Redeem Confirmation!")
            setRedeemed(false)
        }
        if (claimed) {
            toast("⚽ Claim Confirmation!")
            setClaimed(false)

        }
    }, [redeemed, claimed])

    useContractReads({
        contracts: [
            {
                ...interpoolTicketContract,
                functionName: 'balanceOf',
                args: [isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interpoolContract,
                functionName: 'getWinningsPerPlayer',
                args: [isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
        ],
        watch: true,
        onSuccess(data: any) {
            setTicket(parseInt(ethers.utils.formatUnits(data[0]._hex, 0)))
            setPendingWinnings(parseFloat(ethers.utils.formatUnits(data[1][0]._hex, 6)))
            setClaimedWinnings(parseFloat(ethers.utils.formatUnits(data[1][1]._hex, 6)))
        },
    })

    const [modalRedeem, setModalRedeem] = useState(false)
    const [modalMoreTickets, setModalMoreTickets] = useState(false)
    const [modalClaim, setModalClaim] = useState(false)

    return (
        <section id="account" data-w-id="90400c33-4d36-cc84-d01f-507bc873a726" className="section-account wf-section">
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
                    <div id="w-node-_18474311-dda1-9d24-5fc2-19e8d34e7da1-3d3dc5f0" className="text-block-grid-content">${pendingWinnings}</div>
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
                    <div id="w-node-_691393fb-f6ac-f9a3-ad79-c9918787c975-3d3dc5f0" className="text-block-grid-content">${pendingWinnings + claimedWinnings}</div>
                </div>
                <h1>Final contest ranking</h1>
                <div className="w-layout-grid grid-4">
                    <div id="w-node-ade59832-9e80-0a14-2933-cb481c0bd5c8-3d3dc5f0" className="header-grid-history header-grid-history-left">Player</div>
                    <div id="w-node-_529643fb-8c8a-4deb-3340-ec7494a5abee-3d3dc5f0" className="header-grid-history">Number of tickets</div>
                    <div id="w-node-_3516d465-5aa2-1ac4-fafa-6dfe38e10d3d-3d3dc5f0" className="header-grid-history">Rank</div>
                    <div id="w-node-e0051b68-543d-1fe6-cef2-e0c50e02645a-3d3dc5f0" className="header-grid-history">Global Prize Pool</div>
                    <div id="w-node-d12aa462-b1e7-5186-1dbe-5765aa5e3ae9-3d3dc5f0" className="header-grid-history header-grid-history-droite">Winnings</div>
                    <div id="w-node-_64932c9e-4808-d561-0cd9-677953178864-3d3dc5f0" className="content-grid-history"> To be announced</div>
                    <div id="w-node-_3fb0138f-fb6f-aa8d-0711-d670c91d5750-3d3dc5f0" className="content-grid-history"> </div>
                    <div id="w-node-bcd0c380-d5a0-b33f-4f89-5178696c32d7-3d3dc5f0" className="content-grid-history"> </div>
                    <div id="w-node-_138b185a-30d7-acc4-cfab-69438ef52dbc-3d3dc5f0" className="content-grid-history"> </div>
                    <div id="w-node-_911736f7-4f0d-0086-e921-4ea6edb9cf9d-3d3dc5f0" className="content-grid-history"> </div>
                </div>
            </div>
            {modalRedeem && <ModalRedeem setModalRedeem={setModalRedeem} ticket={ticket} setRedeemed={setRedeemed} />}
            {modalMoreTickets && <ModalMoreTickets setModalMoreTickets={setModalMoreTickets} ticket={ticket} pendingWinnings={pendingWinnings} />}
            {modalClaim && <ModalClaim setModalClaim={setModalClaim} pendingWinnings={pendingWinnings} setClaimed={setClaimed} />}
            <ToastContainer />
        </section>
    )
}

export default SectionAccount;