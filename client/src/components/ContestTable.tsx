import { Fragment, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { ABI_Interpool } from "../utils/ABI_Interpool";
import { useCurrentContest } from "../utils/useCurrentContest";

import { players } from "../utils/manualResult";

function ContestTable() {
    const addressNetwork = useAddressNetwork()
    const currentContest = useCurrentContest()
    const [playerAddress, setPlayerAddress] = useState('0x000000000000000000000000000000000000dEaD')
    const { address }: { address: any } = useAccount()

    useEffect(() => {
        setPlayerAddress(address);
    }, [address])

    const { data }: { data: any } = useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getPointsTable',
        args: [currentContest]
    })

    // const test = []
    // for (let i = 0; i < data.length; i++) {
    //     test.push(data[i])
    // }

    // console.log(test)

    // const test = () => {


    // }



    return (
        <div className="w-layout-grid grid-4">
            <div className="header-grid-history header-grid-history-left">Player</div>
            <div className="header-grid-history">Number of tickets</div>
            <div className="header-grid-history">Rank</div>
            <div className="header-grid-history">Points</div>
            <div className="header-grid-history header-grid-history-droite">Winnings</div>
            {/*0xFDdc8C8305C101e7Fa9b3C6a93008785e5f5F51d*/}
            {/* {found.map(element =>
                <Fragment key={element[0]}>
                    <div className={playerAddress === element.player ? "content-grid-history-selected" : "content-grid-history"}>{element.player.substring(0, 4)}...{element.player.substring(element.player.length - 4)}</div>
                    <div className={playerAddress === element.player ? "content-grid-history-selected" : "content-grid-history"}>{element.tickets}</div>
                    <div className={playerAddress === element.player ? "content-grid-history-selected" : "content-grid-history"}>{element.rank} / 20</div>
                    <div className={playerAddress === element.player ? "content-grid-history-selected" : "content-grid-history"}>{element.points}</div>
                    <div className={playerAddress === element.player ? "content-grid-history-selected" : "content-grid-history"}> </div>
                </Fragment>)} */}
        </div >
    )
}
export default ContestTable;



