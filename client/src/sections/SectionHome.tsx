import WCMatchLists from "../components/WCMatchLists";
import BannerCountdown from "../components/home/BannerCountdown";
import BannerNoTicket from "../components/home/BannerNoTicket";
import BannerTickets from "../components/home/BannerTickets";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { useState } from "react";


function SectionHome() {
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

    return (
        <section id="home" data-w-id="67ad9710-d385-0ebf-87e3-5d5f429160e0" className="section-home wf-section">
            <div className="container w-container">
                <BannerCountdown />
                {(ticket === 0) && <BannerNoTicket />}
                {(ticket > 0) && <BannerTickets ticket={ticket} />}
                <h1 className="heading-5">QATAR WORLD CUP 2022 <br />~ Prediction Game ~</h1>
                <h1 className="heading-2">If you wanna win big, just be better than the others!</h1>
                {/* <WCMatchLists /> */}
                <WCMatchLists ticket={ticket} />
                <div className="div-block-7">
                    <div className="text-block-5">You have 100% chance to win *</div>
                    <div className="text-block-6">* This is actually true <a href="https://app.gitbook.com/o/esvKHPPOt4LZoy42lERC/s/9TtqoT2sXyCd3aHeyycM/welcome/frequently-asked-questions#prizes-and-winning" target="_blank" rel="noreferrer" className="link-4">(see details)</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SectionHome;