import { useEffect, useState } from "react";
import { useContractRead } from 'wagmi'
import { useAddressNetwork } from './useAddressNetwork'
import { ethers } from 'ethers'
import { ABI_Interpool } from './ABI_Interpool'

function ContestEndCountdown({ contestId }: { contestId: number }) {
    const addressNetwork = useAddressNetwork()
    const [countDown, setCountDown] = useState(0)
    const [countDownDate, setCountDownDate] = useState(1670022000000)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getContestEndDate',
        args: [contestId],
        onSuccess(data: any) {
            setCountDownDate(1000 * parseInt(ethers.utils.formatUnits(data._hex, 0)))
        },
    })



    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1);
        setDays(Math.floor((countDown % (1000 * 60 * 60 * 24 * 31)) / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
        return () => clearInterval(interval);
    }, [countDownDate, countDown]);

    return (
        <div id="w-node-a6b17af5-47c5-7e56-de42-ea26d682ffb2-3d3dc5f0" className="text-block">{days}D {hours}H {minutes}m</div>

    )
}
export default ContestEndCountdown;
