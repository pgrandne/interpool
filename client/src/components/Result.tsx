import { Fragment, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import ABI_Interpool from '../utils/ABI_Interpool.json'
import { goerli } from '../utils/contractAddress'

function Result({ gameId }: { gameId: string }) {
    const { address } = useAccount()

    const [result, setResult] = useState(false);
    const [textResult, setTextResult] = useState('No result');
    useContractRead({
        address: goerli.interPoolContract,
        abi: ABI_Interpool,
        functionName: 'getGameCreate',
        args: [address, '0xcd3dde689901b3e81b088a4d677b87e5ec638e8b2753cc7a928cd34f3f273a00', gameId],
        onSuccess(data: any) {
            console.log(data)
        },
    })
    return (
        <Fragment>
            <div className="div-block-6"><a href="/" className="hollow-button white">Check Results!</a></div>
            <br />
            <div className="div-block-6">{textResult}</div>
        </Fragment>
    )
}

export default Result