import { useContractRead } from 'wagmi'
import { useAddressNetwork } from './useAddressNetwork'
import { ethers } from 'ethers'
import { useState } from 'react'
import { ABI_Interpool } from './ABI_Interpool'


export function useCurrentContest() {
    const [currentContest, setCurrentContest] = useState(0);
    const addressNetwork: any = useAddressNetwork()
    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getCurrentContestId',
        onSuccess(data: any) {
            setCurrentContest(parseInt(ethers.utils.formatUnits(data._hex, 0)))
        },
    })
    return (currentContest)
}
