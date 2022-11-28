import { Fragment, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { ABI_Interpool } from "../utils/ABI_Interpool";
import { useCurrentContest } from "../utils/useCurrentContest";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

function ContestTable() {
    const addressNetwork = useAddressNetwork()
    const currentContest = useCurrentContest()
    const [playerAddress, setPlayerAddress] = useState('0x000000000000000000000000000000000000dEaD')
    const { address }: { address: any } = useAccount()
    const [pointsTable, setPointsTable] = useState([])
    let rank: any
    let previousScore: any


    useEffect(() => {
        setPlayerAddress(address);
    }, [address])

    const { data }: { data: any } = useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getPointsTable',
        args: [currentContest],
        onSuccess(data: any) {
            setPointsTable(data)
        }
    }) as any

    const calculateRank = (i: number, score: number) => {
        if (i === 0) {
            rank = 1
            previousScore = score
        } else {
            if (previousScore !== score) {
                rank = i + 1
                previousScore = score
            }
        }
        return rank
    }

    return (
        <div className="w-layout-grid grid-4">
            <div className="header-grid-history header-grid-history-left">Player</div>
            <div className="header-grid-history">Number of tickets</div>
            <div className="header-grid-history">Rank</div>
            <div className="header-grid-history">Points</div>
            <div className="header-grid-history header-grid-history-droite">Winnings (TBA)</div>
            {pointsTable.sort((a: any, b: any): any => parseInt(ethers.utils.formatUnits(b[2]._hex, 0)) - parseInt(ethers.utils.formatUnits(a[2]._hex, 0))).map((element: any, i: number) =>
                //  {pointsTable.sort((a: any, b: any): any => parseInt(ethers.utils.formatUnits(a[2]._hex, 0)) < parseInt(ethers.utils.formatUnits(b[2]._hex, 0)) ? 1 : 1).map((element: any, i: number) =>
                <Fragment key={i}>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{element[0].substring(0, 4)}...{element[0].substring(element.player.length - 4)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{ethers.utils.formatUnits(element[1]._hex, 0)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}> {calculateRank(i, parseInt(ethers.utils.formatUnits(element[2]._hex, 0)))} / 20</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{ethers.utils.formatUnits(element[2]._hex, 0)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>-</div>
                </Fragment>)
            }
        </div >
    )
}
export default ContestTable;



