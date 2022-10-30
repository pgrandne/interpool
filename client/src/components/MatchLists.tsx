import { Fragment, useState } from "react";
import { useContractRead } from 'wagmi';
import ABI_Interpool from '../utils/ABI_Interpool.json'
import { goerli } from '../utils/contractAddress'
import Result from "./Result";

function MatchList() {
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [gameId, setGameId] = useState('');
    const [prediction, setPrediction] = useState('');
    useContractRead({
        address: goerli.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getGameCreate',
        args: ['0xcd3dde689901b3e81b088a4d677b87e5ec638e8b2753cc7a928cd34f3f273a00', 6],
        onSuccess(data: any) {
            setHomeTeam(data[2])
            setAwayTeam(data[3])
            setGameId(data[0])
        },
    })

    // useContractWrite

    // const handleSubmit = () => {


    // }


    return (
        <Fragment>
            <form>
                <div className="w-layout-grid grid-3">
                    <div className="headers-grid-prediction">Team 1</div>
                    <div className="headers-grid-prediction">1</div>
                    <div className="headers-grid-prediction">D</div>
                    <div className="headers-grid-prediction">2</div>
                    <div className="headers-grid-prediction">Team 2</div>
                    <div className="content-grid-prediction">{homeTeam}</div>

                    <input type="radio" id="homeTeam" checked={prediction === '0'} className="w-form-formradioinput w-radio-input" onChange={() => setPrediction("0")} />
                    <input type="radio" id="draw" checked={prediction === '1'} className="w-form-formradioinput w-radio-input" onChange={() => setPrediction("1")} />
                    <input type="radio" id="awayTeam" checked={prediction === '2'} className="w-form-formradioinput w-radio-input" onChange={() => setPrediction("2")} />

                    <div id="w-node-ac06ab93-b871-02ec-5fbc-8630c7aa8747-3d3dc5f0" className="content-grid-prediction">{awayTeam}</div>
                </div>
            </form>
            <div className="div-block-6"><a href="/" className="hollow-button white">Submit your Prediction!</a></div>
            <br />
            <Result gameId={gameId} />
        </Fragment>
    )

}

export default MatchList;