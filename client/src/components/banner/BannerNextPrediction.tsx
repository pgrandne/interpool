import SubmissionEndCountdown from '../../utils/SubmissionEndCountdown'
import PrizePool from '../../utils/PrizePool'
import { useContractRead } from 'wagmi'
import { useAddressNetwork } from '../../utils/useAddressNetwork'
import { ABI_Interpool } from '../../utils/ABI_Interpool'
import { ethers } from 'ethers'
import { useState } from 'react'
// import { useCurrentContest } from '../../utils/useCurrentContest'
import ContestEndCountdown from '../../utils/ContestEndCountdown'

function BannerNextPrediction({ contestId, setContestId }: {
    contestId: number,
    setContestId: React.Dispatch<React.SetStateAction<number>>,
}) {
    const [nbPlayers, setNbPlayers] = useState('0')
    const addressNetwork = useAddressNetwork()
    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getNumberOfPlayers',
        args: [contestId],
        watch: true,
        onSuccess(data: any) {
            setNbPlayers(ethers.utils.formatUnits(data._hex, 0))
        },
    })

    const handleClick = () => {
        if (contestId === 1) {
            setContestId(2)
        } else setContestId(1)
    }

    return (
        <div className="w-layout-grid grid-11">
            <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740b5-3d3dc5f0" className="div-block">
                <div className="div-block-2">
                    <img src="images/ranking-blanc.png" loading="lazy" alt="" className="image" width="35" />
                </div>
                <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740b8-3d3dc5f0" className="div-block-info">
                    <div className="div-block-13">
                        <div className="text-block-3">{contestId === 2 ? "Current contest" : "Previous contest"}</div>
                    </div>
                    <div className="text-block">#0{contestId}</div>
                </div>
            </div>
            <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740be-3d3dc5f0" className="div-block color-variation-1">
                <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740bf-3d3dc5f0" className="div-block-2">
                    <img src="images/piggy-bank-blanc.png" loading="lazy" alt="" className="image" width="40" /></div>
                <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740c1-3d3dc5f0" className="div-block-info">
                    <div className="text-block-3">{contestId === 2 ? "Estimated Prizes" : "Prizes"}</div>
                    <PrizePool />
                </div>
            </div>
            <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740c6-3d3dc5f0" className="div-block colorvariation-2">
                <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740c7-3d3dc5f0" className="div-block-2">
                    <img src="images/participant-white.png" loading="lazy" alt="" className="image" width="40" />
                </div>
                <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740c9-3d3dc5f0" className="div-block-info">
                    <div className="text-block-3">Participants</div><div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740cc-3d3dc5f0" className="text-block">{nbPlayers}</div>
                </div>
            </div>
            {contestId === 1 && <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740ce-3d3dc5f0" className="div-block colorvariation-3">
                <div className="div-block-2">
                    <img src="images/Coupe-blanc.png" loading="lazy" alt="" className="image" width="40" />
                </div>
                <div className="div-block-info">
                    <div className="text-block-3">Winner announcement</div>
                    <ContestEndCountdown contestId={contestId} />
                </div>
            </div>}
            {contestId === 2 && <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740ce-3d3dc5f0" className="div-block colorvariation-3">
                <div className="div-block-2">
                    <img src="images/time-blanc.png" loading="lazy" alt="" className="image" width="40" />
                </div>
                <div className="div-block-info">
                    <div className="text-block-3">Submission Period</div>
                    <SubmissionEndCountdown contestId={contestId} />
                </div>
            </div>}
            <a href="/" id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740fb-3d3dc5f0" className=" link-block-2"
                onClick={(e) => {
                    e.preventDefault()
                    handleClick()
                }}>
                <div className="div-block colorvariation-5">
                    <div className="div-block-56">
                        <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740fc-3d3dc5f0" className="div-block-2">
                            {contestId === 1 && < img src="images/line-4.png" loading="lazy" alt="" className="image" width="35" />}
                            {contestId === 2 && <img src="images/previous.svg" loading="lazy" alt="" className="image" width="35" />}
                        </div>
                        <div className="div-block-info">
                            {contestId === 1 && <h1 data-w-id="9150fb1c-3bd2-da6e-746d-6456b7f740ff" className="heading-9 heading-nextcontest">Submit your predictions for the current contest!</h1>}
                            {contestId === 2 && <h1 data-w-id="9150fb1c-3bd2-da6e-746d-6456b7f740ff" className="heading-9 heading-nextcontest">Back to previous contest!</h1>}
                        </div>
                    </div>
                    {contestId === 1 && <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740df-3d3dc5f0" className="div-block inner-div-block">
                        <div id="w-node-_9150fb1c-3bd2-da6e-746d-6456b7f740e0-3d3dc5f0" className="div-block-2">
                            <img src="images/time-blanc.png" loading="lazy" alt="" className="image image-without-outline" width="40" />
                        </div>
                        <div className="div-block-info">
                            <div className="text-block-3">Submission period</div>
                            <div className="text-block text-block-pred-mobile-variation"><SubmissionEndCountdown contestId={contestId + 1} /></div>
                        </div>
                    </div>}
                </div>
            </a>
        </div>
    )
}

export default BannerNextPrediction