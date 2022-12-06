import { Fragment, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { useAddressNetwork } from "../utils/useAddressNetwork"
import { ABI_Interpool } from '../utils/ABI_Interpool'
import CurrentContestTable from './CurrentContestTable';

function WcRound16({ ticket, played }: { ticket: number, played: boolean }) {
    const addressNetwork = useAddressNetwork()
    const { address, isConnected } = useAccount()

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
            <h2 className="heading-5">KNOCKOUT STAGE<br />~ Round of 16 ~</h2>
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
                            <input type="number" className={typeof game3370550 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370550[1], game3370550[2], 3, 1)}
                                placeholder={typeof game3370550 === 'undefined' || !played ? '' : game3370550[1].toString()}
                            />
                            <input type="number" className={typeof game3370550 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370550[1], game3370550[2], 3, 1)}
                                placeholder={typeof game3370550 === 'undefined' || !played ? '' : game3370550[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">USA</div>
                    <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">(3-1)</div>
                    {/* 3370551 1C 2D */}
                    <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">12/03</div>
                    <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                    <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370551 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370551[1], game3370551[2], 2, 1)}
                                placeholder={typeof game3370551 === 'undefined' || !played ? '' : game3370551[1].toString()}
                            />
                            <input type="number" className={typeof game3370551 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370551[1], game3370551[2], 2, 1)}
                                placeholder={typeof game3370551 === 'undefined' || !played ? '' : game3370551[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Australia</div>
                    <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">(2-1)</div>
                    {/* 3370552 1D 2C */}
                    <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">12/04</div>
                    <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">France</div>
                    <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370552 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370552[1], game3370552[2], 3, 1)}
                                placeholder={typeof game3370552 === 'undefined' || !played ? '' : game3370552[1].toString()}
                            />
                            <input type="number" className={typeof game3370552 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370552[1], game3370552[2], 3, 1)}
                                placeholder={typeof game3370552 === 'undefined' || !played ? '' : game3370552[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">Poland</div>
                    <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">(3-1)</div>
                    {/* 3370553 1B 2A */}
                    <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">12/04</div>
                    <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">England</div>
                    <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370553 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370553[1], game3370553[2], 3, 0)}
                                placeholder={typeof game3370553 === 'undefined' || !played ? '' : game3370553[1].toString()}
                            />
                            <input type="number" className={typeof game3370553 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370553[1], game3370553[2], 3, 0)}
                                placeholder={typeof game3370553 === 'undefined' || !played ? '' : game3370553[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                    <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">(3-0)</div>
                    {/* 3370555 1E 2F */}
                    <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">12/05</div>
                    <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Japan</div>
                    <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370555 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370555[1], game3370555[2], 2, 4)}
                                placeholder={typeof game3370555 === 'undefined' || !played ? '' : game3370555[1].toString()}
                            />
                            <input type="number" className={typeof game3370555 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370555[1], game3370555[2], 2, 4)}
                                placeholder={typeof game3370555 === 'undefined' || !played ? '' : game3370555[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                    <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">(2-4)</div>
                    {/* 3370554 1G 2H */}
                    <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/05</div>
                    <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                    <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370554 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370554[1], game3370554[2], 4, 1)}
                                placeholder={typeof game3370554 === 'undefined' || !played ? '' : game3370554[1].toString()}
                            />
                            <input type="number" className={typeof game3370554 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370554[1], game3370554[2], 4, 1)}
                                placeholder={typeof game3370554 === 'undefined' || !played ? '' : game3370554[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                    <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">(4-1)</div>
                    {/* 3370556 1F 2E */}
                    <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/06</div>
                    <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                    <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370556 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370556[1], game3370556[2], 3, 0)}
                                placeholder={typeof game3370556 === 'undefined' || !played ? '' : game3370556[1].toString()}
                            />
                            <input type="number" className={typeof game3370556 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370556[1], game3370556[2], 3, 0)}
                                placeholder={typeof game3370556 === 'undefined' || !played ? '' : game3370556[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Spain</div>
                    <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">(3-0)</div>
                    {/* 3370557 1H 2G */}
                    <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">12/06</div>
                    <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                    <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                        <div className="form-3">
                            <input type="number" className={typeof game3370557 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370557[1], game3370557[2], 6, 1)}
                                placeholder={typeof game3370557 === 'undefined' || !played ? '' : game3370557[1].toString()}
                            />
                            <input type="number" className={typeof game3370557 === 'undefined' ? "text-field-2 not-connected-field" : colorInput(game3370557[1], game3370557[2], 6, 1)}
                                placeholder={typeof game3370557 === 'undefined' || !played ? '' : game3370557[2].toString()}
                            />
                        </div>
                    </div>
                    <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                    <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">(6-1)</div>
                </div>
            </div>
            <div className="div-block-6">
                {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
                {isConnected && <input type="submit" value="Submission period closed!" className="hollow-button notactive" />}

            </div>
            <CurrentContestTable />
        </Fragment >
    )
}

export default WcRound16;