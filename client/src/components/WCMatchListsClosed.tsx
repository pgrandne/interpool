import { Fragment, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ABI_Interpool } from "../utils/ABI_Interpool";
import { useCurrentContest } from "../utils/useCurrentContest";
import ContestTable from './ContestTable';

function WCMatchListsClosed({ ticket }: { ticket: number }) {
    const { address, isConnected } = useAccount()
    const addressNetwork = useAddressNetwork()
    const currentContest = useCurrentContest()
    const [game3370549, setGame3370549] = useState([0, 0, 0])
    const [game3854554, setGame3854554] = useState([0, 0, 0])
    const [game3854559, setGame3854559] = useState([0, 0, 0])
    const [game3854560, setGame3854560] = useState([0, 0, 0])
    const [game3854572, setGame3854572] = useState([0, 0, 0])
    const [game3854573, setGame3854573] = useState([0, 0, 0])
    const [game3854579, setGame3854579] = useState([0, 0, 0])
    const [game3854580, setGame3854580] = useState([0, 0, 0])
    const [game3854585, setGame3854585] = useState([0, 0, 0])
    const [game3854586, setGame3854586] = useState([0, 0, 0])
    const [game3854591, setGame3854591] = useState([0, 0, 0])
    const [game3854592, setGame3854592] = useState([0, 0, 0])
    const [game3854597, setGame3854597] = useState([0, 0, 0])
    const [game3854598, setGame3854598] = useState([0, 0, 0])
    const [game3854603, setGame3854603] = useState([0, 0, 0])
    const [game3854604, setGame3854604] = useState([0, 0, 0])
    const [game3854555, setGame3854555] = useState([0, 0, 0])
    const [game3854556, setGame3854556] = useState([0, 0, 0])
    const [game3854561, setGame3854561] = useState([0, 0, 0])
    const [game3854562, setGame3854562] = useState([0, 0, 0])
    const [game3854574, setGame3854574] = useState([0, 0, 0])
    const [game3854575, setGame3854575] = useState([0, 0, 0])
    const [game3854581, setGame3854581] = useState([0, 0, 0])
    const [game3854582, setGame3854582] = useState([0, 0, 0])
    const [game3854587, setGame3854587] = useState([0, 0, 0])
    const [game3854588, setGame3854588] = useState([0, 0, 0])
    const [game3854593, setGame3854593] = useState([0, 0, 0])
    const [game3854594, setGame3854594] = useState([0, 0, 0])
    const [game3854599, setGame3854599] = useState([0, 0, 0])
    const [game3854600, setGame3854600] = useState([0, 0, 0])
    const [game3854605, setGame3854605] = useState([0, 0, 0])
    const [game3854606, setGame3854606] = useState([0, 0, 0])
    const [game3854557, setGame3854557] = useState([0, 0, 0])
    const [game3854558, setGame3854558] = useState([0, 0, 0])
    const [game3854563, setGame3854563] = useState([0, 0, 0])
    const [game3854564, setGame3854564] = useState([0, 0, 0])
    const [game3854576, setGame3854576] = useState([0, 0, 0])
    const [game3854577, setGame3854577] = useState([0, 0, 0])
    const [game3854583, setGame3854583] = useState([0, 0, 0])
    const [game3854584, setGame3854584] = useState([0, 0, 0])
    const [game3854589, setGame3854589] = useState([0, 0, 0])
    const [game3854590, setGame3854590] = useState([0, 0, 0])
    const [game3854595, setGame3854595] = useState([0, 0, 0])
    const [game3854596, setGame3854596] = useState([0, 0, 0])
    const [game3854601, setGame3854601] = useState([0, 0, 0])
    const [game3854602, setGame3854602] = useState([0, 0, 0])
    const [game3854607, setGame3854607] = useState([0, 0, 0])
    const [game3854608, setGame3854608] = useState([0, 0, 0])

    const fetchScores = () => {
        setGame3370549(data.filter(element => element[0] === 3370549)[0])
        setGame3854554(data.filter(element => element[0] === 3854554)[0])
        setGame3854559(data.filter(element => element[0] === 3854559)[0])
        setGame3854560(data.filter(element => element[0] === 3854560)[0])
        setGame3854572(data.filter(element => element[0] === 3854572)[0])
        setGame3854573(data.filter(element => element[0] === 3854573)[0])
        setGame3854579(data.filter(element => element[0] === 3854579)[0])
        setGame3854580(data.filter(element => element[0] === 3854580)[0])
        setGame3854585(data.filter(element => element[0] === 3854585)[0])
        setGame3854586(data.filter(element => element[0] === 3854586)[0])
        setGame3854591(data.filter(element => element[0] === 3854591)[0])
        setGame3854592(data.filter(element => element[0] === 3854592)[0])
        setGame3854597(data.filter(element => element[0] === 3854597)[0])
        setGame3854598(data.filter(element => element[0] === 3854598)[0])
        setGame3854603(data.filter(element => element[0] === 3854603)[0])
        setGame3854604(data.filter(element => element[0] === 3854604)[0])
        setGame3854555(data.filter(element => element[0] === 3854555)[0])
        setGame3854556(data.filter(element => element[0] === 3854556)[0])
        setGame3854561(data.filter(element => element[0] === 3854561)[0])
        setGame3854562(data.filter(element => element[0] === 3854562)[0])
        setGame3854574(data.filter(element => element[0] === 3854574)[0])
        setGame3854575(data.filter(element => element[0] === 3854575)[0])
        setGame3854581(data.filter(element => element[0] === 3854581)[0])
        setGame3854582(data.filter(element => element[0] === 3854582)[0])
        setGame3854587(data.filter(element => element[0] === 3854587)[0])
        setGame3854588(data.filter(element => element[0] === 3854588)[0])
        setGame3854593(data.filter(element => element[0] === 3854593)[0])
        setGame3854594(data.filter(element => element[0] === 3854594)[0])
        setGame3854599(data.filter(element => element[0] === 3854599)[0])
        setGame3854600(data.filter(element => element[0] === 3854600)[0])
        setGame3854605(data.filter(element => element[0] === 3854605)[0])
        setGame3854606(data.filter(element => element[0] === 3854606)[0])
        setGame3854557(data.filter(element => element[0] === 3854557)[0])
        setGame3854558(data.filter(element => element[0] === 3854558)[0])
        setGame3854563(data.filter(element => element[0] === 3854563)[0])
        setGame3854564(data.filter(element => element[0] === 3854564)[0])
        setGame3854576(data.filter(element => element[0] === 3854576)[0])
        setGame3854577(data.filter(element => element[0] === 3854577)[0])
        setGame3854583(data.filter(element => element[0] === 3854583)[0])
        setGame3854584(data.filter(element => element[0] === 3854584)[0])
        setGame3854589(data.filter(element => element[0] === 3854589)[0])
        setGame3854590(data.filter(element => element[0] === 3854590)[0])
        setGame3854595(data.filter(element => element[0] === 3854595)[0])
        setGame3854596(data.filter(element => element[0] === 3854596)[0])
        setGame3854601(data.filter(element => element[0] === 3854601)[0])
        setGame3854602(data.filter(element => element[0] === 3854602)[0])
        setGame3854607(data.filter(element => element[0] === 3854607)[0])
        setGame3854608(data.filter(element => element[0] === 3854608)[0])
    }

    const { data }: { data: Array<Array<number>> } = useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getPrevisionsPerPlayerPerContest',
        args: [currentContest, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
        onSuccess(data: any) {
            if (isConnected) {
                fetchScores()
            }
        }
    }) as any

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
            color = "text-field-2 w-input"
        }
        return (color)

    }
    return (
        <Fragment>
            <div className="div-block-17">
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa3-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-a">Group A</div>
                        </div>
                        {/* 3370549 */}
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">11/20</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aaa-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aac-3d3dc5f0" className="form-block w-form">
                            <div id="3370549" className="form-3">
                                <input type="number" className={typeof game3370549 === 'undefined' ? "text-field-2 w-input" : colorInput(game3370549[1], game3370549[2], 0, 2)}
                                    readOnly placeholder={typeof game3370549 === 'undefined' ? '' : game3370549[1].toString()} />
                                <input type="number" className={typeof game3370549 === 'undefined' ? "text-field-2 w-input" : colorInput(game3370549[1], game3370549[2], 0, 2)}
                                    readOnly placeholder={typeof game3370549 === 'undefined' ? '' : game3370549[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2ab6-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                        <div id="w-node-_00510f3a-ddab-1583-dfaa-8b7e172c2aa6-3d3dc5f0" className="content-grid-prediction-smaller">(0-2)</div>
                        {/*3854554 */}
                        <div id="w-node-f72edf64-997b-08bb-0ee5-629f72111b84-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                        <div id="w-node-_28be1f7e-faa0-28a0-21e9-9a34415416a4-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                        <div id="w-node-_7eac494d-c0b5-eef7-1df3-6c1eaba8e32c-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854554 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854554[1], game3854554[2], 0, 2)}
                                    readOnly placeholder={typeof game3854554 === 'undefined' ? '' : game3854554[1].toString()} />
                                <input type="number" className={typeof game3854554 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854554[1], game3854554[2], 0, 2)}
                                    readOnly placeholder={typeof game3854554 === 'undefined' ? '' : game3854554[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-fe0180df-9e12-a68e-1094-526b4a728854-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                        <div id="w-node-cc127ddf-2c41-555e-fec7-0ec8c2efdc56-3d3dc5f0" className="content-grid-prediction-smaller">(0-2)</div>
                        {/* 3854555 */}
                        <div id="w-node-_4830f8b0-7449-3a44-cefa-589ba502dfbb-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                        <div id="w-node-_49848d3e-522f-7d50-53cd-161aa91a06c7-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                        <div id="w-node-d5271666-976d-36df-4581-1b566b68fa30-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854555 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854555[1], game3854555[2], 1, 3)}
                                    readOnly placeholder={typeof game3854555 === 'undefined' ? '' : game3854555[1].toString()} />
                                <input type="number" className={typeof game3854555 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854555[1], game3854555[2], 1, 3)}
                                    readOnly placeholder={typeof game3854555 === 'undefined' ? '' : game3854555[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-fa5c4b58-87d9-fe96-9123-a51adf288593-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                        <div id="w-node-eaf6cb1a-e108-5e0f-c43b-4d89b4df2463-3d3dc5f0" className="content-grid-prediction-smaller">(1-3)</div>
                        {/* 3854556 */}
                        <div id="w-node-_32be76ec-3654-2da4-a250-739ce737e2ab-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>

                        <div id="w-node-_36479ddc-fcb2-0310-2adf-d3787b232d7e-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                        <div id="w-node-_9e05f2ca-8e9d-0a81-fe77-946973f7b489-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854556 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854556[1], game3854556[2], 1, 1)}
                                    readOnly placeholder={typeof game3854556 === 'undefined' ? '' : game3854556[1].toString()} />
                                <input type="number" className={typeof game3854556 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854556[1], game3854556[2], 1, 1)}
                                    readOnly placeholder={typeof game3854556 === 'undefined' ? '' : game3854556[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-dccd9955-d99f-e643-5046-b1f2a9e4b939-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                        <div id="w-node-bc819bdc-3140-e9b5-957e-4e51ebb64a87-3d3dc5f0" className="content-grid-prediction-smaller">(1-1)</div>
                        {/* 3854558 */}
                        <div id="w-node-_16843c79-0e50-ae10-5caa-c81ecfd5a751-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                        <div id="w-node-_3795805a-2eea-af38-8afa-d4164c96e851-3d3dc5f0" className="content-grid-prediction">Ecuador</div>
                        <div id="w-node-_006b4fe0-e8a9-281b-f781-f492cd502992-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854558 === 'undefined' ? '' : game3854558[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854558 === 'undefined' ? '' : game3854558[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_3c513a16-b1ef-9be5-a5ed-438efde39358-3d3dc5f0" className="content-grid-prediction">Senegal</div>
                        <div id="w-node-f4954d84-1ad6-5ba6-3f03-ddb58eac9cc1-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854557 */}
                        <div id="w-node-_4ac478ef-02c5-7daa-0dc5-8378b2812116-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                        <div id="w-node-_49825600-23f6-faba-31b0-2008088bda12-3d3dc5f0" className="content-grid-prediction">Netherlands</div>
                        <div id="w-node-_5290c7e8-d089-7e9c-1eb3-a1437a212c84-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854557 === 'undefined' ? '' : game3854557[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854557 === 'undefined' ? '' : game3854557[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-fa5aae3c-4413-c772-3895-ba8bb9702369-3d3dc5f0" className="content-grid-prediction">Qatar</div>
                        <div id="w-node-_432301b4-79cf-d381-abbc-64f0ef16a3cd-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c625-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-b">Group B</div>
                        </div>
                        {/* 3854559 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c628-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62c-3d3dc5f0" className="content-grid-prediction">England</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62e-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854559 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854559[1], game3854559[2], 6, 2)}
                                    readOnly placeholder={typeof game3854559 === 'undefined' ? '' : game3854559[1].toString()} />
                                <input type="number" className={typeof game3854559 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854559[1], game3854559[2], 6, 2)}
                                    readOnly placeholder={typeof game3854559 === 'undefined' ? '' : game3854559[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c638-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c62a-3d3dc5f0" className="content-grid-prediction-smaller">(6-2)</div>
                        {/* 3854560 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63a-3d3dc5f0" className="content-grid-prediction-smaller">11/21</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63e-3d3dc5f0" className="content-grid-prediction">USA</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c640-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854560 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854560[1], game3854560[2], 1, 1)}
                                    readOnly placeholder={typeof game3854560 === 'undefined' ? '' : game3854560[1].toString()} />
                                <input type="number" className={typeof game3854560 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854560[1], game3854560[2], 1, 1)}
                                    readOnly placeholder={typeof game3854560 === 'undefined' ? '' : game3854560[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64a-3d3dc5f0" className="content-grid-prediction">Wales</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c63c-3d3dc5f0" className="content-grid-prediction-smaller">(1-1)</div>
                        {/* 3854562 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64c-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c650-3d3dc5f0" className="content-grid-prediction">Wales</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c652-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854562 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854562[1], game3854562[2], 0, 2)}
                                    readOnly placeholder={typeof game3854562 === 'undefined' ? '' : game3854562[1].toString()} />
                                <input type="number" className={typeof game3854562 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854562[1], game3854562[2], 0, 2)}
                                    readOnly placeholder={typeof game3854562 === 'undefined' ? '' : game3854562[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c65c-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c64e-3d3dc5f0" className="content-grid-prediction-smaller">(0-2)</div>
                        {/* 3854561 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c65e-3d3dc5f0" className="content-grid-prediction-smaller">11/25</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c662-3d3dc5f0" className="content-grid-prediction">England</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c664-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854561 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854561[1], game3854561[2], 0, 0)}
                                    readOnly placeholder={typeof game3854561 === 'undefined' ? '' : game3854561[1].toString()} />
                                <input type="number" className={typeof game3854561 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854561[1], game3854561[2], 0, 0)}
                                    readOnly placeholder={typeof game3854561 === 'undefined' ? '' : game3854561[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c66e-3d3dc5f0" className="content-grid-prediction">USA</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c660-3d3dc5f0" className="content-grid-prediction-smaller">(0-0)</div>
                        {/* 3854563 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c670-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c674-3d3dc5f0" className="content-grid-prediction">Wales</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c676-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854563 === 'undefined' ? '' : game3854563[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854563 === 'undefined' ? '' : game3854563[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c680-3d3dc5f0" className="content-grid-prediction">England</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c672-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854564 */}
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c682-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c686-3d3dc5f0" className="content-grid-prediction">IR Iran</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c688-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854564 === 'undefined' ? '' : game3854564[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854564 === 'undefined' ? '' : game3854564[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c692-3d3dc5f0" className="content-grid-prediction">USA</div>
                        <div id="w-node-_6d320c88-0c1c-8e7b-1a62-ca9cd216c684-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
            </div>
            <div className="div-block-17">
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff0-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-c">Group C</div>
                        </div>
                        {/* 3854572 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff3-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff7-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff9-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854572 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854572[1], game3854572[2], 1, 2)}
                                    readOnly placeholder={typeof game3854572 === 'undefined' ? '' : game3854572[1].toString()} />
                                <input type="number" className={typeof game3854572 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854572[1], game3854572[2], 1, 2)}
                                    readOnly placeholder={typeof game3854572 === 'undefined' ? '' : game3854572[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129003-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee128ff5-3d3dc5f0" className="content-grid-prediction-smaller">(1-2)</div>
                        {/* 3854573 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129005-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129009-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12900b-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854573 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854573[1], game3854573[2], 0, 0)}
                                    readOnly placeholder={typeof game3854573 === 'undefined' ? '' : game3854573[1].toString()} />
                                <input type="number" className={typeof game3854573 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854573[1], game3854573[2], 0, 0)}
                                    readOnly placeholder={typeof game3854573 === 'undefined' ? '' : game3854573[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129015-3d3dc5f0" className="content-grid-prediction">Poland</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129007-3d3dc5f0" className="content-grid-prediction-smaller">(0-0)</div>
                        {/* 3854575 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129017-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12901b-3d3dc5f0" className="content-grid-prediction">Poland</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12901d-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854575 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854575[1], game3854575[2], 2, 0)}
                                    readOnly placeholder={typeof game3854575 === 'undefined' ? '' : game3854575[1].toString()} />
                                <input type="number" className={typeof game3854575 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854575[1], game3854575[2], 2, 0)}
                                    readOnly placeholder={typeof game3854575 === 'undefined' ? '' : game3854575[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction-smaller">(2-0)</div>
                        {/* 3854574 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854574 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854574[1], game3854574[2], 2, 0)}
                                    readOnly placeholder={typeof game3854574 === 'undefined' ? '' : game3854574[1].toString()} />
                                <input type="number" className={typeof game3854574 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854574[1], game3854574[2], 2, 0)}
                                    readOnly placeholder={typeof game3854574 === 'undefined' ? '' : game3854574[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129039-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129019-3d3dc5f0" className="content-grid-prediction-smaller">(2-0)</div>
                        {/* 3854576 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903b-3d3dc5f0" className="content-grid-prediction-smaller">11/29</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903f-3d3dc5f0" className="content-grid-prediction">Poland</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129041-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854576 === 'undefined' ? '' : game3854576[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854576 === 'undefined' ? '' : game3854576[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904b-3d3dc5f0" className="content-grid-prediction">Argentina</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12903d-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854577 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904d-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129051-3d3dc5f0" className="content-grid-prediction">S. Arabia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129053-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854577 === 'undefined' ? '' : game3854577[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854577 === 'undefined' ? '' : game3854577[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12905d-3d3dc5f0" className="content-grid-prediction">Mexico</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12904f-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129061-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-d">Group D</div>
                        </div>
                        {/* 3854580 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129064-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129068-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12906a-3d3dc5f0" className="form-block w-form">
                            <div id="" className="form-3">
                                <input type="number" className={typeof game3854580 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854580[1], game3854580[2], 0, 0)}
                                    readOnly placeholder={typeof game3854580 === 'undefined' ? '' : game3854580[1].toString()} />
                                <input type="number" className={typeof game3854580 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854580[1], game3854580[2], 0, 0)}
                                    readOnly placeholder={typeof game3854580 === 'undefined' ? '' : game3854580[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129074-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129066-3d3dc5f0" className="content-grid-prediction-smaller">(0-0)</div>
                        {/* 3854579 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129076-3d3dc5f0" className="content-grid-prediction-smaller">11/22</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12907a-3d3dc5f0" className="content-grid-prediction">France</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12907c-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854579 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854579[1], game3854579[2], 4, 1)}
                                    readOnly placeholder={typeof game3854579 === 'undefined' ? '' : game3854579[1].toString()} />
                                <input type="number" className={typeof game3854579 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854579[1], game3854579[2], 4, 1)}
                                    readOnly placeholder={typeof game3854579 === 'undefined' ? '' : game3854579[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129086-3d3dc5f0" className="content-grid-prediction">Australia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129078-3d3dc5f0" className="content-grid-prediction-smaller">(4-1)</div>
                        {/* 3854582 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129088-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908c-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908e-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854582 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854582[1], game3854582[2], 0, 1)}
                                    readOnly placeholder={typeof game3854582 === 'undefined' ? '' : game3854582[1].toString()} />
                                <input type="number" className={typeof game3854582 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854582[1], game3854582[2], 0, 1)}
                                    readOnly placeholder={typeof game3854582 === 'undefined' ? '' : game3854582[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee129098-3d3dc5f0" className="content-grid-prediction">Australia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12908a-3d3dc5f0" className="content-grid-prediction-smaller">(0-1)</div>
                        {/* 3854581 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909a-3d3dc5f0" className="content-grid-prediction-smaller">11/26</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909e-3d3dc5f0" className="content-grid-prediction">France</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290a0-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854581 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854581[1], game3854581[2], 2, 1)}
                                    readOnly placeholder={typeof game3854581 === 'undefined' ? '' : game3854581[1].toString()} />
                                <input type="number" className={typeof game3854581 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854581[1], game3854581[2], 2, 1)}
                                    readOnly placeholder={typeof game3854581 === 'undefined' ? '' : game3854581[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290aa-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee12909c-3d3dc5f0" className="content-grid-prediction-smaller">(2-1)</div>
                        {/* 3854584 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ac-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290b0-3d3dc5f0" className="content-grid-prediction">Australia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290b2-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854584 === 'undefined' ? '' : game3854584[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854584 === 'undefined' ? '' : game3854584[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290bc-3d3dc5f0" className="content-grid-prediction">Denmark</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ae-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854583 */}
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290be-3d3dc5f0" className="content-grid-prediction-smaller">11/30</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c2-3d3dc5f0" className="content-grid-prediction">Tunisia</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c4-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854583 === 'undefined' ? '' : game3854583[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854583 === 'undefined' ? '' : game3854583[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290ce-3d3dc5f0" className="content-grid-prediction">France</div>
                        <div id="w-node-d2061d74-31a7-ef0e-418d-e7adee1290c0-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
            </div>
            <div className="div-block-17">
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120012f-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-e">Group E</div>
                        </div>
                        {/* 3854586 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200132-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200136-3d3dc5f0" className="content-grid-prediction">Germany</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200138-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854586 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854586[1], game3854586[2], 1, 2)}
                                    readOnly placeholder={typeof game3854586 === 'undefined' ? '' : game3854586[1].toString()} />
                                <input type="number" className={typeof game3854586 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854586[1], game3854586[2], 1, 2)}
                                    readOnly placeholder={typeof game3854586 === 'undefined' ? '' : game3854586[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200142-3d3dc5f0" className="content-grid-prediction">Japan</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200134-3d3dc5f0" className="content-grid-prediction-smaller">(1-2)</div>
                        {/* 3854585 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200144-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200148-3d3dc5f0" className="content-grid-prediction">Spain</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120014a-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854585 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854585[1], game3854585[2], 7, 0)}
                                    readOnly placeholder={typeof game3854585 === 'undefined' ? '' : game3854585[1].toString()} />
                                <input type="number" className={typeof game3854585 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854585[1], game3854585[2], 7, 0)}
                                    readOnly placeholder={typeof game3854585 === 'undefined' ? '' : game3854585[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200154-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200146-3d3dc5f0" className="content-grid-prediction-smaller">(7-0)</div>
                        {/* 3854588 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200156-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120015a-3d3dc5f0" className="content-grid-prediction">Japan</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120015c-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854588 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854588[1], game3854588[2], 0, 1)}
                                    readOnly placeholder={typeof game3854588 === 'undefined' ? '' : game3854588[1].toString()} />
                                <input type="number" className={typeof game3854588 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854588[1], game3854588[2], 0, 1)}
                                    readOnly placeholder={typeof game3854588 === 'undefined' ? '' : game3854588[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200166-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200158-3d3dc5f0" className="content-grid-prediction-smaller">(0-1)</div>
                        {/* 3854587 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200168-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016c-3d3dc5f0" className="content-grid-prediction">Spain</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016e-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854587 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854587[1], game3854587[2], 1, 1)}
                                    readOnly placeholder={typeof game3854587 === 'undefined' ? '' : game3854587[1].toString()} />
                                <input type="number" className={typeof game3854587 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854587[1], game3854587[2], 1, 1)}
                                    readOnly placeholder={typeof game3854587 === 'undefined' ? '' : game3854587[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200178-3d3dc5f0" className="content-grid-prediction">Germany</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120016a-3d3dc5f0" className="content-grid-prediction-smaller">(1-1)</div>
                        {/* 3854589 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017a-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017e-3d3dc5f0" className="content-grid-prediction">Japan</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200180-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854589 === 'undefined' ? '' : game3854589[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854589 === 'undefined' ? '' : game3854589[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018a-3d3dc5f0" className="content-grid-prediction">Spain</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120017c-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854590 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018c-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200190-3d3dc5f0" className="content-grid-prediction">Costa Rica</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200192-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854590 === 'undefined' ? '' : game3854590[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854590 === 'undefined' ? '' : game3854590[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120019c-3d3dc5f0" className="content-grid-prediction">Germany</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120018e-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a0-3d3dc5f0">
                            <div className="headers-grid-prediction header-goup-f">Group F</div>
                        </div>
                        {/* 3854592 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a3-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a7-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a9-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854592 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854592[1], game3854592[2], 0, 0)}
                                    readOnly placeholder={typeof game3854592 === 'undefined' ? '' : game3854592[1].toString()} />
                                <input type="number" className={typeof game3854592 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854592[1], game3854592[2], 0, 0)}
                                    readOnly placeholder={typeof game3854592 === 'undefined' ? '' : game3854592[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b3-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001a5-3d3dc5f0" className="content-grid-prediction-smaller">(0-0)</div>
                        {/* 3854591 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b5-3d3dc5f0" className="content-grid-prediction-smaller">11/23</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b9-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001bb-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854591 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854591[1], game3854591[2], 1, 0)}
                                    readOnly placeholder={typeof game3854591 === 'undefined' ? '' : game3854591[1].toString()} />
                                <input type="number" className={typeof game3854591 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854591[1], game3854591[2], 1, 0)}
                                    readOnly placeholder={typeof game3854591 === 'undefined' ? '' : game3854591[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c5-3d3dc5f0" className="content-grid-prediction">Canada</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001b7-3d3dc5f0" className="content-grid-prediction-smaller">(1-0)</div>
                        {/* 3854593 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c7-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001cb-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001cd-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854593 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854593[1], game3854593[2], 0, 2)}
                                    readOnly placeholder={typeof game3854593 === 'undefined' ? '' : game3854593[1].toString()} />
                                <input type="number" className={typeof game3854593 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854593[1], game3854593[2], 0, 2)}
                                    readOnly placeholder={typeof game3854593 === 'undefined' ? '' : game3854593[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001d7-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001c9-3d3dc5f0" className="content-grid-prediction-smaller">(0-2)</div>
                        {/* 3854594 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001d9-3d3dc5f0" className="content-grid-prediction-smaller">11/27</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001dd-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001df-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854594 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854594[1], game3854594[2], 4, 1)}
                                    readOnly placeholder={typeof game3854594 === 'undefined' ? '' : game3854594[1].toString()} />
                                <input type="number" className={typeof game3854594 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854594[1], game3854594[2], 4, 1)}
                                    readOnly placeholder={typeof game3854594 === 'undefined' ? '' : game3854594[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001e9-3d3dc5f0" className="content-grid-prediction">Canada</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001db-3d3dc5f0" className="content-grid-prediction-smaller">(4-1)</div>
                        {/* 3854596 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001eb-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ef-3d3dc5f0" className="content-grid-prediction">Canada</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001f1-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854596 === 'undefined' ? '' : game3854596[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854596 === 'undefined' ? '' : game3854596[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001fb-3d3dc5f0" className="content-grid-prediction">Morocco</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ed-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854595 */}
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001fd-3d3dc5f0" className="content-grid-prediction-smaller">12/01</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200201-3d3dc5f0" className="content-grid-prediction">Croatia</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd1200203-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854595 === 'undefined' ? '' : game3854595[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854595 === 'undefined' ? '' : game3854595[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd120020d-3d3dc5f0" className="content-grid-prediction">Belgium</div>
                        <div id="w-node-d6998ca8-d344-e20b-6360-2aacd12001ff-3d3dc5f0" className="content-grid-prediction-smaller"></div>
                    </div>
                </div>
            </div>
            <div className="div-block-17">
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febed6-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-g">Group G</div>
                        </div>
                        {/* 3854598 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febed9-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedd-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedf-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854598 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854598[1], game3854598[2], 1, 0)}
                                    readOnly placeholder={typeof game3854598 === 'undefined' ? '' : game3854598[1].toString()} />
                                <input type="number" className={typeof game3854598 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854598[1], game3854598[2], 1, 0)}
                                    readOnly placeholder={typeof game3854598 === 'undefined' ? '' : game3854598[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febee9-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febedb-3d3dc5f0" className="content-grid-prediction-smaller">(1-0)</div>
                        {/* 3854597 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeeb-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeef-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febef1-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854597 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854597[1], game3854597[2], 2, 0)}
                                    readOnly placeholder={typeof game3854597 === 'undefined' ? '' : game3854597[1].toString()} />
                                <input type="number" className={typeof game3854597 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854597[1], game3854597[2], 2, 0)}
                                    readOnly placeholder={typeof game3854597 === 'undefined' ? '' : game3854597[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febefb-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeed-3d3dc5f0" className="content-grid-prediction-smaller">(2-0)</div>
                        {/* 3854600 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febefd-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf01-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf03-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854600 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854600[1], game3854600[2], 3, 3)}
                                    readOnly placeholder={typeof game3854600 === 'undefined' ? '' : game3854600[1].toString()} />
                                <input type="number" className={typeof game3854600 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854600[1], game3854600[2], 3, 3)}
                                    readOnly placeholder={typeof game3854600 === 'undefined' ? '' : game3854600[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf0d-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febeff-3d3dc5f0" className="content-grid-prediction-smaller">(3-3)</div>
                        {/* 3854599 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf0f-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf13-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf15-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854599 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854599[1], game3854599[2], 1, 0)}
                                    readOnly placeholder={typeof game3854599 === 'undefined' ? '' : game3854599[1].toString()} />
                                <input type="number" className={typeof game3854599 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854599[1], game3854599[2], 1, 0)}
                                    readOnly placeholder={typeof game3854599 === 'undefined' ? '' : game3854599[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf1f-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf11-3d3dc5f0" className="content-grid-prediction-smaller">(1-0)</div>
                        {/* 3854602 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf21-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf25-3d3dc5f0" className="content-grid-prediction">Serbia</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf27-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854602 === 'undefined' ? '' : game3854602[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854602 === 'undefined' ? '' : game3854602[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf31-3d3dc5f0" className="content-grid-prediction">Switzerland</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf23-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854601 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf33-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf37-3d3dc5f0" className="content-grid-prediction">Cameroon</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf39-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854601 === 'undefined' ? '' : game3854601[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854601 === 'undefined' ? '' : game3854601[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf43-3d3dc5f0" className="content-grid-prediction">Brazil</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf35-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
                <div>
                    <div className="w-layout-grid grid-3">
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf47-3d3dc5f0">
                            <div className="headers-grid-prediction header-group-h">Group H</div>
                        </div>
                        {/* 3854604 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4a-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4e-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf50-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854604 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854604[1], game3854604[2], 0, 0)}
                                    readOnly placeholder={typeof game3854604 === 'undefined' ? '' : game3854604[1].toString()} />
                                <input type="number" className={typeof game3854604 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854604[1], game3854604[2], 0, 0)}
                                    readOnly placeholder={typeof game3854604 === 'undefined' ? '' : game3854604[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5a-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf4c-3d3dc5f0" className="content-grid-prediction-smaller">(0-0)</div>
                        {/* 3854603 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5c-3d3dc5f0" className="content-grid-prediction-smaller">11/24</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf60-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf62-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854603 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854603[1], game3854603[2], 3, 2)}
                                    readOnly placeholder={typeof game3854603 === 'undefined' ? '' : game3854603[1].toString()} />
                                <input type="number" className={typeof game3854603 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854603[1], game3854603[2], 3, 2)}
                                    readOnly placeholder={typeof game3854603 === 'undefined' ? '' : game3854603[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf6c-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf5e-3d3dc5f0" className="content-grid-prediction-smaller">(3-2)</div>
                        {/* 3854606 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf6e-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf72-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf74-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854606 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854606[1], game3854606[2], 2, 3)}
                                    readOnly placeholder={typeof game3854606 === 'undefined' ? '' : game3854606[1].toString()} />
                                <input type="number" className={typeof game3854606 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854606[1], game3854606[2], 2, 3)}
                                    readOnly placeholder={typeof game3854606 === 'undefined' ? '' : game3854606[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf7e-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf70-3d3dc5f0" className="content-grid-prediction-smaller">(2-3)</div>
                        {/* 3854605 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf80-3d3dc5f0" className="content-grid-prediction-smaller">11/28</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf84-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf86-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className={typeof game3854605 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854605[1], game3854605[2], 2, 0)}
                                    readOnly placeholder={typeof game3854605 === 'undefined' ? '' : game3854605[1].toString()} />
                                <input type="number" className={typeof game3854605 === 'undefined' ? "text-field-2 w-input" : colorInput(game3854605[1], game3854605[2], 2, 0)}
                                    readOnly placeholder={typeof game3854605 === 'undefined' ? '' : game3854605[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf90-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf82-3d3dc5f0" className="content-grid-prediction-smaller">(2-0)</div>
                        {/* 3854607 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf92-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf96-3d3dc5f0" className="content-grid-prediction">Korea R.</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf98-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854607 === 'undefined' ? '' : game3854607[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854607 === 'undefined' ? '' : game3854607[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa2-3d3dc5f0" className="content-grid-prediction">Portugal</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febf94-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                        {/* 3854608 */}
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa4-3d3dc5f0" className="content-grid-prediction-smaller">12/02</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa8-3d3dc5f0" className="content-grid-prediction">Ghana</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfaa-3d3dc5f0" className="form-block w-form">
                            <div className="form-3">
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854608 === 'undefined' ? '' : game3854608[1].toString()} />
                                <input type="number" className="text-field-2 w-input" readOnly placeholder={typeof game3854608 === 'undefined' ? '' : game3854608[2].toString()} />
                            </div>
                        </div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfb4-3d3dc5f0" className="content-grid-prediction">Uruguay</div>
                        <div id="w-node-_74aead76-a63d-8f28-d55e-d94c20febfa6-3d3dc5f0" className="content-grid-prediction-smaller">-</div>
                    </div>
                </div>
            </div>
            <div className="div-block-6">
                {isConnected && <input type="submit" value="Submission period closed!" className="hollow-button notactive" />}
                {!isConnected && <input type="submit" value="Please connect!" className="hollow-button notactive" />}
            </div>
            <ContestTable />
        </Fragment >
    )
}

export default WCMatchListsClosed;