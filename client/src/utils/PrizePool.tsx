import { useContractRead } from 'wagmi'
import { useAddressNetwork } from '../utils/useAddressNetwork'
import { ethers } from 'ethers'
import { useState } from 'react'
import { ABI_Interpool } from '../utils/ABI_Interpool'

function PrizePool() {
    const [prizePool, setPrizePool] = useState(0)
    const addressNetwork: any = useAddressNetwork()

    useContractRead({
        address: addressNetwork.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getGlobalPrizePool',
        onSuccess(data: any) {
            setPrizePool(parseFloat(ethers.utils.formatUnits(data._hex, 6)))
        },
    })




    return (
        <div id="w-node-_6b61e304-fb49-a93b-24a7-20abbc4407ce-3d3dc5f0" className="text-block text-block-variation">${prizePool}</div>
    )
}

export default PrizePool;
