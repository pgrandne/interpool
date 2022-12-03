import { Fragment, useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { ABI_Interpool } from "../utils/ABI_Interpool";
// import { useCurrentContest } from "../utils/useCurrentContest";

function ContestTable() {
    const addressNetwork = useAddressNetwork()
    const [playerAddress, setPlayerAddress] = useState('0x000000000000000000000000000000000000dEaD')
    const { address, isConnected }: { address: any, isConnected: boolean } = useAccount()
    const [pointsTable, setPointsTable] = useState([])
    let rank: any
    let previousScore: any


    useEffect(() => {
        if (isConnected)
            setPlayerAddress(address)
    }, [isConnected, address])

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getContestTable',
        args: [1],
        onSuccess(data: any) {
            sortPointsTable(data)
        }
    })

    const sortPointsTable = (data: any) => {
        const tempTable = data.slice().sort((a: any, b: any) => parseInt(ethers.utils.formatUnits(b[2]._hex, 0)) - parseInt(ethers.utils.formatUnits(a[2]._hex, 0)))
        setPointsTable(tempTable)
    }

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
            <div className="header-grid-history">Nb of tickets</div>
            <div className="header-grid-history">Rank</div>
            <div className="header-grid-history">Points</div>
            <div className="header-grid-history header-grid-history-right">Winnings</div>
            {pointsTable.map((element: any, i: number) =>
                <Fragment key={i}>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{element[0].substring(0, 4)}...{element[0].substring(element.player.length - 4)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{ethers.utils.formatUnits(element[1]._hex, 0)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}> {calculateRank(i, parseInt(ethers.utils.formatUnits(element[2]._hex, 0)))} / 20</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>{ethers.utils.formatUnits(element[2]._hex, 0)}</div>
                    <div className={playerAddress === element[0] ? "content-grid-history-selected" : "content-grid-history"}>${parseFloat(ethers.utils.formatUnits(element[4]._hex, 6)).toFixed(2)}</div>
                </Fragment>)
            }
        </div >
    )
}
export default ContestTable;



