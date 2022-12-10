import { Fragment, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import ModalSubmit from './modals/ModalSubmit'
import CurrentContestTable from './CurrentContestTable'
import { useAccount, useContractReads } from 'wagmi'
import { useAddressNetwork } from "../utils/useAddressNetwork"
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { ABI_Interpool } from '../utils/ABI_Interpool'
import { IFormInput } from '../utils/contractAddress'

interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}

function WcRound4({ ticket, played, contestId, nbPlayers }: { ticket: number, played: boolean, contestId: number, nbPlayers: number }) {
    const addressNetwork = useAddressNetwork()
    const { address, isConnected } = useAccount()
    const [modalSubmit, setModalSubmit] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [predictionsOpen, setPredictionsOpen] = useState(true)

    const [game3370569, setGame3370569] = useState([0, 0, 0])
    const [game3370570, setGame3370570] = useState([0, 0, 0])


    const fetchScores = (data: Array<Array<number>>) => {
        setGame3370569(data.filter(element => element[0] === 3370569)[0])
        setGame3370570(data.filter(element => element[0] === 3370570)[0])

    }

    const interpoolContract = {
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
    }

    useContractReads({
        contracts: [
            {
                ...interpoolContract,
                functionName: 'getPrevisionsPerPlayerPerContest',
                args: [4, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
            },
            {
                ...interpoolContract,
                functionName: 'getContestPredictionSubmissionEndDate',
                args: [4],
            },
        ],
        onSuccess(data: any) {
            if (isConnected) {
                fetchScores(data[0])
                new Date().getTime() > (parseInt(ethers.utils.formatUnits(data[1]._hex, 0)) * 1000) ? setPredictionsOpen(false) : setPredictionsOpen(true)

            }
        }

    })



    useEffect(() => {
        if (submitted) {
            toast("⚽ Your predictions have been saved on the blockchain!")
            setSubmitted(false)
        }
    }, [submitted])

    const [prediction, setPrediction] = useState<IPrediction[]>([{
        gameId: 0,
        homeScore: 0,
        awayScore: 0
    }])

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        if (ticket === 0) {
            toast("⚽ Get your tickets to submit your predictions!")
            document.getElementById('get-your-tickets')?.scrollIntoView();
        } else {
            const result = [
                { gameId: 3370569, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore) }, //1
                { gameId: 3370570, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore) }, //2
            ]
            setPrediction(result)
            setModalSubmit(true)
        }
    }

    const calculateMatchResult = (homeScore: number, awayScore: number) => {
        let gameResult: number;
        if (homeScore > awayScore) {
            gameResult = 0;
        } else if (awayScore > homeScore) {
            gameResult = 2;
        } else {
            gameResult = 1;
        }
        return gameResult;
    }

    const colorInput = (
        playerHomeScore: number,
        playerAwayScore: number,
        resultHomeScore: number,
        resultAwayScore: number
    ) => {
        let color: string
        if (isConnected && playerHomeScore === resultHomeScore && playerAwayScore === resultAwayScore) {
            color = "text-field-2 success-field"
        } else if (isConnected && calculateMatchResult(playerHomeScore, playerAwayScore) === calculateMatchResult(resultHomeScore, resultAwayScore)) {
            color = "text-field-2 avg-success-field"
        } else if (isConnected) {
            color = "text-field-2 not-success-field"
        }
        else {
            color = "text-field-2 w-input not-connected-field"
        }
        return (color)
    }

    return (
        <Fragment>
            <h2 className="heading-5">KNOCKOUT STAGE<br />~ semi-final ~</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid-knockout">
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-a">Make your predictions!</div>
                        </div>
                        {/* 3370569,Argentina,Croatia] */}
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">12/13</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match1HomeScore', { required: true, min: 0, max: 99 })}
                                    className="text-field-2 w-input"
                                    placeholder={typeof game3370569 === 'undefined' || !played ? '' : game3370569[1].toString()}
                                />
                                <input type="number" {...register('match1AwayScore', { required: true, min: 0, max: 99 })}
                                    className="text-field-2 w-input"
                                    placeholder={typeof game3370569 === 'undefined' || !played ? '' : game3370569[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370570,France,Morocco */}
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">12/14</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">France</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match2HomeScore', { required: true, min: 0, max: 99 })}
                                    className="text-field-2 w-input"
                                    placeholder={typeof game3370570 === 'undefined' || !played ? '' : game3370570[1].toString()}
                                />
                                <input type="number" {...register('match2AwayScore', { required: true, min: 0, max: 99 })}
                                    className="text-field-2 w-input"
                                    placeholder={typeof game3370570 === 'undefined' || !played ? '' : game3370570[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div className="text-block-52 hero-title-wrapper">Note: During the knockout stage, <strong>you cannot predict any draw</strong>. A winner is expected, meaning you should add the penalties in your predictions.<br />(Ex: if the score is 1-1 at the end of the prolongations, and the results of the penalties are 3-5, then correct prediction is 4-6)</div>
                <div className="div-block-6">
                    {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
                    {isConnected && !predictionsOpen && <input type="submit" value="Submission period closed!" className="hollow-button notactive" />}
                    {isConnected && predictionsOpen && <input type="submit" value={played ? "Update your predictions!" : "Submit your predictions!"} data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted" />}
                </div>
                {/* <CurrentContestTable /> */}
            </form>
            {modalSubmit && <ModalSubmit prediction={prediction} setModalSubmit={setModalSubmit} setSubmitted={setSubmitted} />}
        </Fragment >
    )
}

export default WcRound4;