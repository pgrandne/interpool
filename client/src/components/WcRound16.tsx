import { Fragment, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAccount, useContractRead } from 'wagmi'
import ModalSubmit from './modals/ModalSubmit'
import { useAddressNetwork } from "../utils/useAddressNetwork"
import { ABI_Interpool } from '../utils/ABI_Interpool'
import { toast } from 'react-toastify';
import { ethers } from 'ethers'
import { IFormInput } from '../utils/contractAddress'
interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}


function WcRound16({ ticket, played }: { ticket: number, played: boolean }) {
    const addressNetwork = useAddressNetwork()
    const { address, isConnected } = useAccount()
    const [modalSubmit, setModalSubmit] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [predictionsOpen, setPredictionsOpen] = useState(true)

    const [game3370550, setGame3370550] = useState([0, 0, 0])
    const [game3370551, setGame3370551] = useState([0, 0, 0])
    const [game3370552, setGame3370552] = useState([0, 0, 0])
    const [game3370553, setGame3370553] = useState([0, 0, 0])
    const [game3370554, setGame3370554] = useState([0, 0, 0])
    const [game3370555, setGame3370555] = useState([0, 0, 0])
    const [game3370556, setGame3370556] = useState([0, 0, 0])
    const [game3370557, setGame3370557] = useState([0, 0, 0])

    const fetchScores = (data: Array<Array<number>>) => {
        setGame3370550(data.filter(element => element[0] === 3370550)[0])
        setGame3370551(data.filter(element => element[0] === 3370551)[0])
        setGame3370552(data.filter(element => element[0] === 3370552)[0])
        setGame3370553(data.filter(element => element[0] === 3370553)[0])
        setGame3370554(data.filter(element => element[0] === 3370554)[0])
        setGame3370555(data.filter(element => element[0] === 3370555)[0])
        setGame3370556(data.filter(element => element[0] === 3370556)[0])
        setGame3370557(data.filter(element => element[0] === 3370557)[0])
    }

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getPrevisionsPerPlayerPerContest',
        args: [2, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
        onSuccess(data: any) {
            if (isConnected) {
                fetchScores(data)
            }
        }
    })


    useEffect(() => {
        if (submitted) {
            toast("⚽ Your predictions have been saved on the blockchain!")
            setSubmitted(false)
        }
    }, [submitted])

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getContestPredictionSubmissionEndDate',
        args: [2],
        onSuccess(data: any) {
            new Date().getTime() > (parseInt(ethers.utils.formatUnits(data._hex, 0)) * 1000) ? setPredictionsOpen(false) : setPredictionsOpen(true)
        },
    })

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
                { gameId: 3370550, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore) }, //1
                { gameId: 3370551, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore) }, //2
                { gameId: 3370552, homeScore: parseInt(data.match3HomeScore), awayScore: parseInt(data.match3AwayScore) }, //3
                { gameId: 3370553, homeScore: parseInt(data.match4HomeScore), awayScore: parseInt(data.match4AwayScore) }, //4
                { gameId: 3370555, homeScore: parseInt(data.match5HomeScore), awayScore: parseInt(data.match5AwayScore) }, //5
                { gameId: 3370554, homeScore: parseInt(data.match6HomeScore), awayScore: parseInt(data.match6AwayScore) }, //6
                { gameId: 3370556, homeScore: parseInt(data.match7HomeScore), awayScore: parseInt(data.match7AwayScore) }, //7
                { gameId: 3370557, homeScore: parseInt(data.match8HomeScore), awayScore: parseInt(data.match8AwayScore) }, //8
            ]
            setPrediction(result)
            console.log(prediction)
            setModalSubmit(true)
        }
    }

    return (
        <Fragment>
            <h2 className="heading-5">KNOCKOUT STAGE<br />~ Round of 16 ~</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid-knockout">
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-a">Make your predictions!</div>
                        </div>
                        {/* 3370550 1A 2B */}
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">12/03</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match1HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370550 === 'undefined' || !played ? '' : game3370550[1].toString()}
                                />
                                <input type="number" {...register('match1AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370550 === 'undefined' || !played ? '' : game3370550[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">USA</div>
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370551 1C 2D */}
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">12/03</div>
                        <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                        <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match2HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370551 === 'undefined' || !played ? '' : game3370551[1].toString()}
                                />
                                <input type="number" {...register('match2AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370551 === 'undefined' || !played ? '' : game3370551[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Australia</div>
                        <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370552 1D 2C */}
                        <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">12/04</div>
                        <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">France</div>
                        <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match3HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370552 === 'undefined' || !played ? '' : game3370552[1].toString()}
                                />
                                <input type="number" {...register('match3AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370552 === 'undefined' || !played ? '' : game3370552[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">Poland</div>
                        <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370553 1B 2A */}
                        <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">12/04</div>
                        <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">England</div>
                        <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match4HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370553 === 'undefined' || !played ? '' : game3370553[1].toString()}
                                />
                                <input type="number" {...register('match4AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370553 === 'undefined' || !played ? '' : game3370553[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                        <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370555 1E 2F */}
                        <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">12/05</div>
                        <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Japan</div>
                        <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match5HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370555 === 'undefined' || !played ? '' : game3370555[1].toString()}
                                />
                                <input type="number" {...register('match5AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370555 === 'undefined' || !played ? '' : game3370555[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                        <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370554 1G 2H */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/05</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">1st Group G</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match6HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370554 === 'undefined' || !played ? '' : game3370554[1].toString()}
                                />
                                <input type="number" {...register('match6AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370554 === 'undefined' || !played ? '' : game3370554[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">2nd Group H</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370556 1F 2E */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/06</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match7HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370556 === 'undefined' || !played ? '' : game3370556[1].toString()}
                                />
                                <input type="number" {...register('match7AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370556 === 'undefined' || !played ? '' : game3370556[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Spain</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3370557 1H 2G */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/06</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">1st Group H</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match8HomeScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370557 === 'undefined' || !played ? '' : game3370557[1].toString()}
                                />
                                <input type="number" {...register('match8AwayScore', { required: true, min: 0, max: 99 })}
                                    className={isConnected ? "text-field-2 w-input" : "text-field-2 not-connected-field"}
                                    placeholder={typeof game3370557 === 'undefined' || !played ? '' : game3370557[2].toString()}
                                />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">2nd Group G</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div className="div-block-6">
                    {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
                    {isConnected && !predictionsOpen && <input type="submit" value="Submission period closed!" className="hollow-button notactive" />}
                    {isConnected && predictionsOpen && <input type="submit" value={played ? "Update your predictions!" : "Submit your predictions!"} data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted" />}

                </div>
            </form>
            {modalSubmit && <ModalSubmit prediction={prediction} setModalSubmit={setModalSubmit} setSubmitted={setSubmitted} />}
        </Fragment >
    )
}

export default WcRound16;