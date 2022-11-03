import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { mumbai } from '../utils/contractAddress'
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
}

interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number,
    status: string
}

function Ligue1MatchLists() {
    const [prediction, setPrediction] = useState<IPrediction[]>([{
        gameId: 0,
        homeScore: 0,
        awayScore: 0,
        status: ""
    }])
    const { config } = usePrepareContractWrite({
        address: mumbai.interPoolContract,
        abi: [{
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "gameId",
                            "type": "uint32"
                        },
                        {
                            "internalType": "uint8",
                            "name": "homeScore",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "awayScore",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "status",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Enet.GameResolve[]",
                    "name": "_gamePredictions",
                    "type": "tuple[]"
                }
            ],
            "name": "savePrediction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },],
        functionName: 'savePrediction',
        args: [prediction]
    })
    const { isLoading, isSuccess, write } = useContractWrite(config)










    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        const result = [
            { gameId: 4010148, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore), status: "t" },
            { gameId: 4010149, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore), status: "t" },
            { gameId: 4010130, homeScore: parseInt(data.match3HomeScore), awayScore: parseInt(data.match3AwayScore), status: "t" },
            { gameId: 4010131, homeScore: parseInt(data.match4HomeScore), awayScore: parseInt(data.match4AwayScore), status: "t" },
            { gameId: 4010173, homeScore: parseInt(data.match5HomeScore), awayScore: parseInt(data.match5AwayScore), status: "t" },
            { gameId: 4010174, homeScore: parseInt(data.match6HomeScore), awayScore: parseInt(data.match6AwayScore), status: "t" }
        ]
        setPrediction(result)
        console.log(prediction)
        write?.()
        console.log(isSuccess)
        console.log(isLoading)
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="div-block-17">
            <div>
                <div className="w-layout-grid grid-3">
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                        <div className="headers-grid-prediction header-group-a">Make your predictions!</div>
                    </div>
                    {/* GameCreate : 4010148,1667324700,FC Porto,Atletico Madrid */}
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa8-3d3dc5f0" className="content-grid-prediction-smaller">18h45</div>
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">FC Porto</div>
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match1HomeScore', { required: true, min: 0, max: 99 })} max={2} className="text-field-2 w-input" />
                            <input type="number" {...register('match1AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Atletico Madrid</div>
                    {/* GameCreate : 4010149,1667324700,Bayer Leverkusen,Club Brugge */}
                    <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">18h45</div>
                    <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Bayer Leverkusen</div>
                    <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match2HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            <input type="number" {...register('match2AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Club Brugge</div>
                    {/* GameCreate : 4010130,1667332800,Liverpool,SSC Napoli*/}
                    <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">21h</div>
                    <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">Liverpool</div>
                    <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match3HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            <input type="number" {...register('match3AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">SSC Napoli</div>
                    {/* GameCreate : 4010131,1667332800,Rangers,Ajax*/}
                    <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">21h</div>
                    <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">Rangers</div>
                    <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match4HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            <input type="number" {...register('match4AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Ajax</div>
                    {/* GameCreate : 4010173,1667332800,Bayern Munich,Inter*/}
                    <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">21h</div>
                    <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Bayern Munich</div>
                    <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match5HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            <input type="number" {...register('match5AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Inter</div>
                    {/* GameCreate : 4010174,1667332800,Viktoria Plzen,Barcelona*/}
                    <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/01</div>
                    <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">21h</div>
                    <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Viktoria Plzen</div>
                    <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" {...register('match6HomeScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                            <input type="number" {...register('match6AwayScore', { required: true, min: 0, max: 99 })} className="text-field-2 w-input" />
                        </div>
                    </div>
                    <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Barcelona</div>
                </div>
                <div className="div-block-6">
                    <input type="submit" value="Submit your predictions!" data-w-id="072ecfd4-6168-39ba-d6f7-70c0be435150" className="hollow-button white hollow-button-inverted" />
                </div>
            </div>
        </form>
    )
}

export default Ligue1MatchLists;