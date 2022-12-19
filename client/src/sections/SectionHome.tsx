// import WcRound16 from '../components/WcRound16'
// import WcRound8 from '../components/WcRound8'
import WcRound4 from '../components/WcRound4'
import WcFinalRound from '../components/WcFinalRound'
// import WcGroupPhase from '../components/WcGroupPhase'
// import WcMatchNoPred from '../components/WcMatchNoPred'
import BannerNextPrediction from '../components/banner/BannerNextPrediction'
import { useAccount, useContractReads, erc20ABI } from 'wagmi'
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { useState } from 'react'
import { ABI_Interpool } from '../utils/ABI_Interpool'
// import { useCurrentContest } from '../utils/useCurrentContest'
import ModalNewContest from '../components/modals/ModalNewContest'

function SectionHome() {
    const addressNetwork = useAddressNetwork()
    const [ticket, setTicket] = useState(0)
    const [rank, setRank] = useState(0)
    const [points, setPoints] = useState(0)
    const [contestId, setContestId] = useState(5)
    const [nbPlayers, setNbPlayers] = useState(0)
    const [modalNewContest, setModalNewContest] = useState(true)
    const [played, setPlayed] = useState(false)
    const { isConnected, address }: { isConnected: boolean, address: any } = useAccount()
    const interPoolTicket = {
        address: addressNetwork.interPoolTicketContract,
        abi: erc20ABI,
    }
    const interPool = {
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
    }


    useContractReads({
        contracts: [
            {
                ...interPoolTicket,
                functionName: 'balanceOf',
                args: [isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interPool,
                functionName: 'getPlayerRank',
                args: [contestId, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interPool,
                functionName: 'getPointsOfPlayerForContest',
                args: [contestId, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interPool,
                functionName: 'getVerifPlayerPlayedPerContest',
                args: [contestId, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interPool,
                functionName: 'getNumberOfPlayers',
                args: [contestId],
            },
        ],
        watch: true,
        onSuccess(data: any) {
            setTicket(parseInt(ethers.utils.formatUnits(data[0]._hex, 0)))
            setRank(parseInt(ethers.utils.formatUnits(data[1]._hex, 0)))
            setPoints(parseInt(ethers.utils.formatUnits(data[2]._hex, 0)))
            setPlayed(data[3])
            setNbPlayers(parseInt(ethers.utils.formatUnits(data[4]._hex, 0)))
        },
    })

    return (
        <section id="home" data-w-id="67ad9710-d385-0ebf-87e3-5d5f429160e0" className="section-home wf-section">
            <div className="container w-container">
                <h1 className="heading-5">QATAR WORLD CUP 2022 <br />~ Prediction Game ~</h1>
                <h1 className="heading-2">If you wanna win big, just be better than the others!</h1>
                <BannerNextPrediction contestId={contestId} setContestId={setContestId} />
                {isConnected && <div className="div-block-54">
                    <div className="div-block-51">
                        <img src="images/arrow2-black.svg" loading="lazy" width="30" alt="" className="arrow-prediction" />
                        <h1 className="heading-10">Your predictions<br />(contest #0{contestId})</h1>
                        <img src="images/arrow2-black.svg" loading="lazy" width="30" alt="" className="image-21 arrow-prediction" />
                    </div>
                    <div className="w-layout-grid grid-10">
                        <div className="div-block-52">
                            <h1 className="heading-10 heading-10-variation">Current rank:</h1>
                            <h1 className="heading-10 heading-10-variation-2">{played ? rank : "-"} / {nbPlayers}</h1>
                        </div>
                        <div className="div-block-52 div-block-52-color-variation">
                            <h1 className="heading-10 heading-10-variation">Current score:</h1>
                            <h1 className="heading-10 heading-10-variation-2">{played ? points : "-"}</h1>
                        </div>
                    </div>
                    <div className="div-block-53">
                    </div>
                </div>}
                {isConnected && <div className="div-block-57">
                    <div className="form-block w-form form-3">
                        <input type="text" className="text-field-2 success-field" />
                        <div className="div-block-58">
                            <div className="text-block-52">Good scores</div>
                            <div className="text-block-52 text-block-52-tiret">:</div>
                            <div className="text-block-52">3 points</div>
                        </div>
                    </div>
                    <div className="form-block w-form form-3">
                        <input type="text" className="text-field-2 avg-success-field" />
                        <div className="div-block-58">
                            <div className="text-block-52">Good outcome</div>
                            <div className="text-block-52 text-block-52-tiret">:</div>
                            <div className="text-block-52">1 point</div>
                        </div>
                    </div>
                    <div className="form-block w-form form-3">
                        <input type="text" className="text-field-2 not-success-field" />
                        <div className="div-block-58">
                            <div className="text-block-52">Wrong outcome</div>
                            <div className="text-block-52 text-block-52-tiret">:</div>
                            <div className="text-block-52">0 point</div>
                        </div>
                    </div>
                </div>}
                {/* {contestId === 2 && <WcRound16 ticket={ticket} played={played} contestId={contestId} nbPlayers={nbPlayers} />}
                {contestId === 1 && played && <WcGroupPhase ticket={ticket} contestId={contestId} nbPlayers={nbPlayers} />}
                {contestId === 1 && !played && <WcMatchNoPred />} */}
                {/* {contestId === 3 && <WcRound8 ticket={ticket} played={played} contestId={contestId} nbPlayers={nbPlayers} />} */}
                {contestId === 4 && <WcRound4 ticket={ticket} played={played} contestId={contestId} nbPlayers={nbPlayers} />}
                {contestId === 5 && <WcFinalRound ticket={ticket} played={played} contestId={contestId} nbPlayers={nbPlayers} />}
                <div className="div-block-7">
                    <div className="text-block-5">You have 100% chance to win *</div>
                    <div className="text-block-6">* This is actually true <a href="https://irruption-lab.gitbook.io/interpool/welcome/frequently-asked-questions#prizes-and-winning" target="_blank" rel="noreferrer" className="link-4">(see details)</a>
                    </div>
                </div>
                {modalNewContest && <ModalNewContest setModalNewContest={setModalNewContest} />}
            </div>
        </section>
    )
}
export default SectionHome;