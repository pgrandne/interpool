import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function ContestTable() {
    const [playerAddress, setPlayerAddress] = useState('0x000000000000000000000000000000000000dEaD')
    const { address }: { address: any } = useAccount()

    useEffect(() => {
        setPlayerAddress(address);
    }, [address])

    return (
        <div className="w-layout-grid grid-4">
            <div className="header-grid-history header-grid-history-left">Player</div>
            <div className="header-grid-history">Number of tickets</div>
            <div className="header-grid-history">Rank</div>
            <div className="header-grid-history">Points</div>
            <div className="header-grid-history header-grid-history-droite">Winnings</div>
            {/*0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d*/}
            <div className={playerAddress === "0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d" ? "content-grid-history-selected" : "content-grid-history"}>0xFD...F51d</div>
            <div className={playerAddress === "0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD*/}
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>0xAC...EaCD</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x94b9420F65fB3ec966d96BB034b35AF86487D929*/}
            <div className={playerAddress === "0x94b9420F65fB3ec966d96BB034b35AF86487D929" ? "content-grid-history-selected" : "content-grid-history"}> 0x94...D929</div>
            <div className={playerAddress === "0x94b9420F65fB3ec966d96BB034b35AF86487D929" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x94b9420F65fB3ec966d96BB034b35AF86487D929" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x94b9420F65fB3ec966d96BB034b35AF86487D929" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x94b9420F65fB3ec966d96BB034b35AF86487D929" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A*/}
            <div className={playerAddress === "0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A" ? "content-grid-history-selected" : "content-grid-history"}>0xc6...2b9A</div>
            <div className={playerAddress === "0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xc6c0CF1C5fC64c5ED1EBa8bBd115d88BFa5b2b9A" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F*/}
            <div className={playerAddress === "0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F" ? "content-grid-history-selected" : "content-grid-history"}>0x01...AC0F</div>
            <div className={playerAddress === "0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x016915CAF0Fb947a1b4F9E8140478BC8c00FAC0F" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab*/}
            <div className={playerAddress === "0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab" ? "content-grid-history-selected" : "content-grid-history"}>0x63...2Eab</div>
            <div className={playerAddress === "0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x6323bed46ECFE5aD99e23D8A0ac43Cd1D4a12Eab" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x0cA1B52abea96d048509e107376ea78424c3a938*/}
            <div className={playerAddress === "0x0cA1B52abea96d048509e107376ea78424c3a938" ? "content-grid-history-selected" : "content-grid-history"}>0x0c...a938</div>
            <div className={playerAddress === "0x0cA1B52abea96d048509e107376ea78424c3a938" ? "content-grid-history-selected" : "content-grid-history"}>6</div>
            <div className={playerAddress === "0x0cA1B52abea96d048509e107376ea78424c3a938" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x0cA1B52abea96d048509e107376ea78424c3a938" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x0cA1B52abea96d048509e107376ea78424c3a938" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x26110dB3F832475fFCb2B645797985773f4603c9*/}
            <div className={playerAddress === "0x26110dB3F832475fFCb2B645797985773f4603c9" ? "content-grid-history-selected" : "content-grid-history"}>0x26...03c9</div>
            <div className={playerAddress === "0x26110dB3F832475fFCb2B645797985773f4603c9" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x26110dB3F832475fFCb2B645797985773f4603c9" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x26110dB3F832475fFCb2B645797985773f4603c9" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x26110dB3F832475fFCb2B645797985773f4603c9" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x3c96E3C3A18246111802a05C335631434d6D8916*/}
            <div className={playerAddress === "0x3c96E3C3A18246111802a05C335631434d6D8916" ? "content-grid-history-selected" : "content-grid-history"}>0x3c...8916</div>
            <div className={playerAddress === "0x3c96E3C3A18246111802a05C335631434d6D8916" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x3c96E3C3A18246111802a05C335631434d6D8916" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x3c96E3C3A18246111802a05C335631434d6D8916" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x3c96E3C3A18246111802a05C335631434d6D8916" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6*/}
            <div className={playerAddress === "0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6" ? "content-grid-history-selected" : "content-grid-history"}>0x07...55B6</div>
            <div className={playerAddress === "0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x0799660Cb6A476112515CeacD1A85cB7ce2F55B6" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x82D4836f311D666402c72F6f083E8366B419D1FE*/}
            <div className={playerAddress === "0x82D4836f311D666402c72F6f083E8366B419D1FE" ? "content-grid-history-selected" : "content-grid-history"}>0x82...D1FE</div>
            <div className={playerAddress === "0x82D4836f311D666402c72F6f083E8366B419D1FE" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0x82D4836f311D666402c72F6f083E8366B419D1FE" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x82D4836f311D666402c72F6f083E8366B419D1FE" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x82D4836f311D666402c72F6f083E8366B419D1FE" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x878F6105074071eec43cA7E426fB198414E8c312*/}
            <div className={playerAddress === "0x878F6105074071eec43cA7E426fB198414E8c312" ? "content-grid-history-selected" : "content-grid-history"}>0x87...c312</div>
            <div className={playerAddress === "0x878F6105074071eec43cA7E426fB198414E8c312" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x878F6105074071eec43cA7E426fB198414E8c312" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x878F6105074071eec43cA7E426fB198414E8c312" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x878F6105074071eec43cA7E426fB198414E8c312" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x313198071B5FF181706EdE26671b199D3BC27Eef*/}
            <div className={playerAddress === "0x313198071B5FF181706EdE26671b199D3BC27Eef" ? "content-grid-history-selected" : "content-grid-history"}>0x31...7Eef</div>
            <div className={playerAddress === "0x313198071B5FF181706EdE26671b199D3BC27Eef" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x313198071B5FF181706EdE26671b199D3BC27Eef" ? "content-grid-history-selected" : "content-grid-history"}>3</div>
            <div className={playerAddress === "0x313198071B5FF181706EdE26671b199D3BC27Eef" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x313198071B5FF181706EdE26671b199D3BC27Eef" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393*/}
            <div className={playerAddress === "0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393" ? "content-grid-history-selected" : "content-grid-history"}>0xaa...0393</div>
            <div className={playerAddress === "0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0xaa2A8Cf5BB24452Edf2a704ab4803FA580b60393" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x770569f85346B971114e11E4Bb5F7aC776673469*/}
            <div className={playerAddress === "0x770569f85346B971114e11E4Bb5F7aC776673469" ? "content-grid-history-selected" : "content-grid-history"}>0x77...3469</div>
            <div className={playerAddress === "0x770569f85346B971114e11E4Bb5F7aC776673469" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0x770569f85346B971114e11E4Bb5F7aC776673469" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0x770569f85346B971114e11E4Bb5F7aC776673469" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0x770569f85346B971114e11E4Bb5F7aC776673469" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF*/}
            <div className={playerAddress === "0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF" ? "content-grid-history-selected" : "content-grid-history"}>0x5e...31BF</div>
            <div className={playerAddress === "0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0x5eb436cf741c02d0D94804Ffe7A285B4127A31BF" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7*/}
            <div className={playerAddress === "0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7" ? "content-grid-history-selected" : "content-grid-history"}>0xfB...e9f7</div>
            <div className={playerAddress === "0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0xfB2aD06900978260E8b2bAFcE04D606dec77e9f7" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x207b7641073d9d029951994F1e1beAf26898f938*/}
            <div className={playerAddress === "0x207b7641073d9d029951994F1e1beAf26898f938" ? "content-grid-history-selected" : "content-grid-history"}>0x20...f938</div>
            <div className={playerAddress === "0x207b7641073d9d029951994F1e1beAf26898f938" ? "content-grid-history-selected" : "content-grid-history"}>4</div>
            <div className={playerAddress === "0x207b7641073d9d029951994F1e1beAf26898f938" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0x207b7641073d9d029951994F1e1beAf26898f938" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0x207b7641073d9d029951994F1e1beAf26898f938" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0x2F9691Dd9E3fDB64Daf2dC36A3B8d4F67A764654*/}
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>0x2F...4654</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>1</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0xAC4DDaf8FBfFba0f1e8c7619720335FD4f03EaCD" ? "content-grid-history-selected" : "content-grid-history"}> </div>
            {/*0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0*/}
            <div className={playerAddress === "0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0" ? "content-grid-history-selected" : "content-grid-history"}>0xe7...f2E0</div>
            <div className={playerAddress === "0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0" ? "content-grid-history-selected" : "content-grid-history"}>2</div>
            <div className={playerAddress === "0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0" ? "content-grid-history-selected" : "content-grid-history"}>14</div>
            <div className={playerAddress === "0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0" ? "content-grid-history-selected" : "content-grid-history"}>0</div>
            <div className={playerAddress === "0xe7F19eca18A1c3Efe94c7B9f80ac9CBDD797f2E0" ? "content-grid-history-selected" : "content-grid-history"}> </div>
        </div >
    )
}
export default ContestTable;



