import { Fragment, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAccount, useContractRead } from 'wagmi'
import ModalSubmit from './modals/ModalSubmit'
import { useAddressNetwork } from "../utils/useAddressNetwork"
import { ABI_Interpool } from '../utils/ABI_Interpool'
import { toast } from 'react-toastify';
import { ethers } from 'ethers'
interface IFormInput {
    match1HomeScore: string,
    match1AwayScore: string,
    match2HomeScore: string,
    match2AwayScore: string,
    match3HomeScore: string,
    match3AwayScore: string,
    match4HomeScore: string,
    match4AwayScore: string,
    match5HomeScore: string,
    match5AwayScore: string,
    match6HomeScore: string,
    match6AwayScore: string,
    match7HomeScore: string,
    match7AwayScore: string,
    match8HomeScore: string,
    match8AwayScore: string,
}

interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}

function Ligue1MatchLists({ ticket }: { ticket: number }) {
    const addressNetwork = useAddressNetwork()
    const { isConnected } = useAccount()
    const [modalSubmit, setModalSubmit] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [predictionsOpen, setPredictionsOpen] = useState(true)
    useEffect(() => {
        if (submitted) {
            toast("⚽ Your predictions are being recorded on the blockchain!")
            setSubmitted(false)
        }
    }, [submitted])

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getContestPredictionEndDate',
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
        } else {
            const result = [
                { gameId: 3904640, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore) }, //1
                { gameId: 3904631, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore) }, //2
                { gameId: 3904632, homeScore: parseInt(data.match3HomeScore), awayScore: parseInt(data.match3AwayScore) }, //3
                { gameId: 3904633, homeScore: parseInt(data.match4HomeScore), awayScore: parseInt(data.match4AwayScore) }, //4
                { gameId: 3904634, homeScore: parseInt(data.match5HomeScore), awayScore: parseInt(data.match5AwayScore) }, //5
                { gameId: 3904636, homeScore: parseInt(data.match6HomeScore), awayScore: parseInt(data.match6AwayScore) }, //6
                { gameId: 3904638, homeScore: parseInt(data.match7HomeScore), awayScore: parseInt(data.match7AwayScore) }, //7
                { gameId: 3904639, homeScore: parseInt(data.match8HomeScore), awayScore: parseInt(data.match8AwayScore) }, //8
            ]
            setPrediction(result)
            setModalSubmit(true)
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} className="div-block-17">
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-a">Make your predictions!</div>
                        </div>
                        {/* Game 1 : [3904640,1668283200,Rennes,Toulouse] */}
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">11/12</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa8-3d3dc5f0" className="content-grid-prediction-smaller">21h</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">Rennes</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match1HomeScore', { required: true, min: 0, max: 99 })} max={2} className="text-field-2 w-input" />
                                <input type="number" {...register('match1AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Toulouse</div>

                        {/* Game 2 : [3904631,1668368700,Monaco,Marseille] */}
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">20h45</div>
                        <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Monaco</div>
                        <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match2HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match2AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Marseille</div>

                        {/* Game 3 : [3904632,1668348000,Nantes,AC Ajaccio] */}
                        <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">15h</div>
                        <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">Nantes</div>
                        <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match3HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match3AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">AC Ajaccio</div>

                        {/* Game 4 : [3904633,1668348000,Lille,Angers] */}
                        <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">15h</div>
                        <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">Lille</div>
                        <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match4HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match4AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Angers</div>

                        {/* Game 5 : [3904634,1668348000,Montpellier,Reims] */}
                        <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">15h</div>
                        <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Montpellier</div>
                        <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match5HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match5AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Reims</div>

                        {/* Game 6 : [3904636,1668340800,Paris Saint-Germain,Auxerre] */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">13h</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Paris Saint-Germain</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match6HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match6AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Auxerre</div>

                        {/* Game 7 : [3904638,1668355500,Strasbourg,Lorient] */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Strasbourg</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match7HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match7AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Lorient</div>

                        {/* Game 8 : [3904639,1668348000,Brest,Troyes] */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/13</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">15h</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Brest</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" {...register('match8HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                <input type="number" {...register('match8AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Troyes</div>
                    </div>
                    <div className="div-block-6">
                        {isConnected && predictionsOpen && <input type="submit" value="Submit your predictions!" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted" />}
                        {isConnected && !predictionsOpen && <input type="submit" value="Predictions period closed!" className="hollow-button notactive" />}
                        {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
                    </div>
                </div>
            </form >
            {modalSubmit && <ModalSubmit prediction={prediction} setModalSubmit={setModalSubmit} setSubmitted={setSubmitted} />}
        </Fragment>
    )
}

export default Ligue1MatchLists;