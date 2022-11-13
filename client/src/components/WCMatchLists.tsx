import { Fragment, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAccount, useContractRead } from 'wagmi'
import ModalSubmit from './modals/ModalSubmit'
import { useAddressNetwork } from "../utils/useAddressNetwork"
import { ABI_Interpool } from '../utils/ABI_Interpool'
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers'
import { IFormInput } from '../utils/contractAddress'
interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}


function WCMatchLists({ ticket }: { ticket: number }) {
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
                { gameId: 1, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore) }, //1
                { gameId: 2, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore) }, //2
                { gameId: 3, homeScore: parseInt(data.match3HomeScore), awayScore: parseInt(data.match3AwayScore) }, //3
                { gameId: 4, homeScore: parseInt(data.match4HomeScore), awayScore: parseInt(data.match4AwayScore) }, //4
                { gameId: 5, homeScore: parseInt(data.match5HomeScore), awayScore: parseInt(data.match5AwayScore) }, //5
                { gameId: 6, homeScore: parseInt(data.match6HomeScore), awayScore: parseInt(data.match6AwayScore) }, //6
                { gameId: 7, homeScore: parseInt(data.match7HomeScore), awayScore: parseInt(data.match7AwayScore) }, //7
                { gameId: 8, homeScore: parseInt(data.match8HomeScore), awayScore: parseInt(data.match8AwayScore) }, //8
                { gameId: 9, homeScore: parseInt(data.match9HomeScore), awayScore: parseInt(data.match9AwayScore) }, //9
                { gameId: 10, homeScore: parseInt(data.match10HomeScore), awayScore: parseInt(data.match10AwayScore) }, //10
                { gameId: 11, homeScore: parseInt(data.match11HomeScore), awayScore: parseInt(data.match11AwayScore) }, //11
                { gameId: 12, homeScore: parseInt(data.match12HomeScore), awayScore: parseInt(data.match12AwayScore) }, //12
                { gameId: 13, homeScore: parseInt(data.match13HomeScore), awayScore: parseInt(data.match13AwayScore) }, //13
                { gameId: 14, homeScore: parseInt(data.match14HomeScore), awayScore: parseInt(data.match14AwayScore) }, //14
                { gameId: 15, homeScore: parseInt(data.match15HomeScore), awayScore: parseInt(data.match15AwayScore) }, //15
                { gameId: 16, homeScore: parseInt(data.match16HomeScore), awayScore: parseInt(data.match16AwayScore) }, //16
                { gameId: 17, homeScore: parseInt(data.match17HomeScore), awayScore: parseInt(data.match17AwayScore) }, //17
                { gameId: 18, homeScore: parseInt(data.match18HomeScore), awayScore: parseInt(data.match18AwayScore) }, //18
                { gameId: 19, homeScore: parseInt(data.match19HomeScore), awayScore: parseInt(data.match19AwayScore) }, //19
                { gameId: 20, homeScore: parseInt(data.match20HomeScore), awayScore: parseInt(data.match20AwayScore) }, //20
                { gameId: 21, homeScore: parseInt(data.match21HomeScore), awayScore: parseInt(data.match21AwayScore) }, //21
                { gameId: 22, homeScore: parseInt(data.match22HomeScore), awayScore: parseInt(data.match22AwayScore) }, //22
                { gameId: 23, homeScore: parseInt(data.match23HomeScore), awayScore: parseInt(data.match23AwayScore) }, //23
                { gameId: 24, homeScore: parseInt(data.match24HomeScore), awayScore: parseInt(data.match24AwayScore) }, //24
                { gameId: 26, homeScore: parseInt(data.match25HomeScore), awayScore: parseInt(data.match25AwayScore) }, //25
                { gameId: 26, homeScore: parseInt(data.match26HomeScore), awayScore: parseInt(data.match26AwayScore) }, //26
                { gameId: 27, homeScore: parseInt(data.match27HomeScore), awayScore: parseInt(data.match27AwayScore) }, //27
                { gameId: 28, homeScore: parseInt(data.match28HomeScore), awayScore: parseInt(data.match28AwayScore) }, //28
                { gameId: 29, homeScore: parseInt(data.match29HomeScore), awayScore: parseInt(data.match29AwayScore) }, //29
                { gameId: 30, homeScore: parseInt(data.match30HomeScore), awayScore: parseInt(data.match30AwayScore) }, //30
                { gameId: 31, homeScore: parseInt(data.match31HomeScore), awayScore: parseInt(data.match31AwayScore) }, //31
                { gameId: 32, homeScore: parseInt(data.match32HomeScore), awayScore: parseInt(data.match32AwayScore) }, //32
                { gameId: 33, homeScore: parseInt(data.match33HomeScore), awayScore: parseInt(data.match33AwayScore) }, //33
                { gameId: 34, homeScore: parseInt(data.match34HomeScore), awayScore: parseInt(data.match34AwayScore) }, //34
                { gameId: 35, homeScore: parseInt(data.match35HomeScore), awayScore: parseInt(data.match35AwayScore) }, //35
                { gameId: 36, homeScore: parseInt(data.match36HomeScore), awayScore: parseInt(data.match36AwayScore) }, //36
                { gameId: 37, homeScore: parseInt(data.match37HomeScore), awayScore: parseInt(data.match37AwayScore) }, //37
                { gameId: 38, homeScore: parseInt(data.match38HomeScore), awayScore: parseInt(data.match38AwayScore) }, //38
                { gameId: 39, homeScore: parseInt(data.match39HomeScore), awayScore: parseInt(data.match39AwayScore) }, //39
                { gameId: 40, homeScore: parseInt(data.match40HomeScore), awayScore: parseInt(data.match40AwayScore) }, //40
                { gameId: 41, homeScore: parseInt(data.match41HomeScore), awayScore: parseInt(data.match41AwayScore) }, //41
                { gameId: 42, homeScore: parseInt(data.match42HomeScore), awayScore: parseInt(data.match42AwayScore) }, //42
                { gameId: 43, homeScore: parseInt(data.match43HomeScore), awayScore: parseInt(data.match43AwayScore) }, //43
                { gameId: 44, homeScore: parseInt(data.match44HomeScore), awayScore: parseInt(data.match44AwayScore) }, //44
                { gameId: 45, homeScore: parseInt(data.match45HomeScore), awayScore: parseInt(data.match45AwayScore) }, //45
                { gameId: 46, homeScore: parseInt(data.match46HomeScore), awayScore: parseInt(data.match46AwayScore) }, //46
                { gameId: 47, homeScore: parseInt(data.match47HomeScore), awayScore: parseInt(data.match47AwayScore) }, //47
                { gameId: 48, homeScore: parseInt(data.match48HomeScore), awayScore: parseInt(data.match48AwayScore) }, //48
            ]
            setPrediction(result)
            setModalSubmit(true)
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="div-block-17">
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-a">Group A - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">11/20</div>
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa8-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match1HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match1AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                            {/* */}
                            <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                            <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                            <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match2HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match2AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                            {/*  */}
                            <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                            <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                            <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match3HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match3AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                            {/*  */}
                            <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                            <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                            <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match4HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match4AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                            {/*  */}
                            <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                            <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                            <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match5HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match5AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                            {/*  */}
                            <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                            <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                            <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match6HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match6AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                        </div>
                    </div>
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c625-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-b">Group B - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c628-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62a-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62c-3d3dc5f0" className="content-grid-prediction">England</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62e-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match7HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match7AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c638-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63a-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63c-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63e-3d3dc5f0" className="content-grid-prediction">USA</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c640-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match8HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match8AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64a-3d3dc5f0" className="content-grid-prediction">Wales</div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64c-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64e-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c650-3d3dc5f0" className="content-grid-prediction">Wales</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c652-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match9HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match9AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c65c-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c65e-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c660-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c662-3d3dc5f0" className="content-grid-prediction">England</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c664-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match10HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match10AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c66e-3d3dc5f0" className="content-grid-prediction">USA</div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c670-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c672-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c674-3d3dc5f0" className="content-grid-prediction">Wales</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c676-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match11HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match11AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c680-3d3dc5f0" className="content-grid-prediction">England</div>
                            {/*  */}
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c682-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c684-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c686-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c688-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match12HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match12AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c692-3d3dc5f0" className="content-grid-prediction">USA</div>
                        </div>
                    </div>
                </div>
                <div className="div-block-17">
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff0-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-c">Group C - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff3-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff5-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff7-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff9-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match13HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match13AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129003-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129005-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129007-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129009-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12900b-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match14HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match14AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129015-3d3dc5f0" className="content-grid-prediction">Poland</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129017-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12901b-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12901d-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match15HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match15AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129027-3d3dc5f0" className="content-grid-prediction">Poland</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129029-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12902b-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12902d-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12902f-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match16HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match16AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129039-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903b-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903d-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903f-3d3dc5f0" className="content-grid-prediction">Poland</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129041-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match17HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match17AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904b-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904d-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904f-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129051-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129053-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match18HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match18AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12905d-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                        </div>
                    </div>
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129061-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-d">Group D - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129064-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129066-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129068-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12906a-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match19HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match19AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129074-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129076-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129078-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12907a-3d3dc5f0" className="content-grid-prediction">France</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12907c-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match20HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match20AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129086-3d3dc5f0" className="content-grid-prediction">Australia</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129088-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908a-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908c-3d3dc5f0" className="content-grid-prediction">Australia</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908e-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match21HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match21AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129098-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909a-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909c-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909e-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290a0-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match22HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match22AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290aa-3d3dc5f0" className="content-grid-prediction">France</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ac-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ae-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290b0-3d3dc5f0" className="content-grid-prediction">Australia</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290b2-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match23HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match23AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290bc-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                            {/*  */}
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290be-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c0-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c2-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c4-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match24HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match24AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ce-3d3dc5f0" className="content-grid-prediction">France</div>
                        </div>
                    </div>
                </div>
                <div className="div-block-17">
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120012f-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-e">Group E - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200132-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200134-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200136-3d3dc5f0" className="content-grid-prediction">Germany</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200138-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match25HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match25AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200142-3d3dc5f0" className="content-grid-prediction">Japan</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200144-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200146-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200148-3d3dc5f0" className="content-grid-prediction">Spain</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120014a-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match26HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match26AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200154-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200156-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200158-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120015a-3d3dc5f0" className="content-grid-prediction">Japan</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120015c-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match27HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match27AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200166-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200168-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016a-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016c-3d3dc5f0" className="content-grid-prediction">Spain</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016e-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match28HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match28AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200178-3d3dc5f0" className="content-grid-prediction">Germany</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017a-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017c-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017e-3d3dc5f0" className="content-grid-prediction">Japan</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200180-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match29HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match29AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018a-3d3dc5f0" className="content-grid-prediction">Spain</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018c-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018e-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200190-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200192-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match30HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match30AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120019c-3d3dc5f0" className="content-grid-prediction">Germany</div>
                        </div>
                    </div>
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a0-3d3dc5f0">
                                <div className="headers-grid-prediction header-goup-f">Group F - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a3-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a5-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a7-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a9-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match31HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match31AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b3-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b5-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b7-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b9-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001bb-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match32HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match32AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c5-3d3dc5f0" className="content-grid-prediction">Canada</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c7-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c9-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001cb-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001cd-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match33HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match33AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001d7-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001d9-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001db-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001dd-3d3dc5f0" className="content-grid-prediction">Canada</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001df-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match34HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match34AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001e9-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001eb-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ed-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ef-3d3dc5f0" className="content-grid-prediction">Canada</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001f1-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match35HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match35AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001fb-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                            {/*  */}
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001fd-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ff-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200201-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200203-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match36HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match36AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120020d-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                        </div>
                    </div>
                </div>
                <div className="div-block-17">
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febed6-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-g">Group G - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febed9-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedb-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedd-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedf-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match37HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match37AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febee9-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeeb-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeed-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeef-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febef1-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match38HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match38AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febefb-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febefd-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeff-3d3dc5f0" className="content-grid-prediction-smaller">11h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf01-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf03-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match39HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match39AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf0d-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf0f-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf11-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf13-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf15-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match40HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match40AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf1f-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf21-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf23-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf25-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf27-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match41HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match41AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf31-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf33-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf35-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf37-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf39-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match42HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match42AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf43-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                        </div>
                    </div>
                    <div>
                        <div className="w-layout-grid grid-3">
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf47-3d3dc5f0">
                                <div className="headers-grid-prediction header-group-h">Group H - Make your predictions!</div>
                            </div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4a-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4c-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4e-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf50-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match43HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match43AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5a-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5c-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5e-3d3dc5f0" className="content-grid-prediction-smaller">17h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf60-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf62-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match44HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match44AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf6c-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf6e-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf70-3d3dc5f0" className="content-grid-prediction-smaller">14h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf72-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf74-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match45HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match45AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf7e-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf80-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf82-3d3dc5f0" className="content-grid-prediction-smaller">20h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf84-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf86-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match46HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match46AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf90-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf92-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf94-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf96-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf98-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match47HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match47AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa2-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                            {/*  */}
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa4-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa6-3d3dc5f0" className="content-grid-prediction-smaller">16h</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa8-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfaa-3d3dc5f0" className="form-block w-form">
                                <div className="form-3">
                                    <input type="number" {...register('match48HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                    <input type="number" {...register('match48AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                                </div>
                            </div>
                            <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfb4-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                        </div>
                    </div>
                </div>
                <div className="div-block-6">
                    {isConnected && predictionsOpen && <input type="submit" value="Submit your predictions!" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted" />}
                    {isConnected && !predictionsOpen && <input type="submit" value="Predictions period closed!" className="hollow-button notactive" />}
                    {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
                </div>
            </form>
            {modalSubmit && <ModalSubmit prediction={prediction} setModalSubmit={setModalSubmit} setSubmitted={setSubmitted} />}
            <ToastContainer />
        </Fragment >
    )
}

export default WCMatchLists;