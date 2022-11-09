import { erc20ABI, useContractRead } from "wagmi";
import { goerli } from '../utils/contractAddress'
import { ethers } from 'ethers'

function SectionHowToPlay() {
    useContractRead({
        address: '0x1Ee669290939f8a8864497Af3BC83728715265FF',
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: ['0x52CF62b15bA2b932006A3ffd9F3C5aaD496e9F9E'],
        onSuccess(data) {
            console.log(ethers.utils.formatUnits(data._hex, 6))
        },
    })



    return (
        <section id="How-to-play" data-w-id="188a1cbe-f5f2-a28c-fb5f-7b23cda3aa9a" className="section-how-to-play wf-section">
            <div className="w-container">
                <h1>How to Play?</h1>
                <p>1. InterPool is live on Goerli (Ethereum Testnet) and Mumbai (Polygon Testnet). Professional third parties will audit the InterPool code prior full deployment on the mainnet. <br />
                    The first prediction game is now live for the FIFA WORLD CUP - Group stage. Competition starting date: November 20th 2022.<br /><br />
                    2. To join the prediction game you are required to get at least 1 ticket during the prediction phase (a countdown is shown above). More tickets you get, higher will be your winnings. <br />
                    In order to get tickets, you need to deposit a multiple of the unitary price (50 USDC). You can faucet USDC directly on the InterPool app. <br />
                    All the participant deposits will be locked during the game period in order to generate interests. <br />
                    Those interests represent the overall prize pool that the game participants will share.<br /><br />
                    3. Once you got your ticket(s) you become eligible to enter the prediction game.<br />
                    This is the key moment where you need to show your prediction skills!<br />
                    You don't necessarily need to be 100% correct on your predictions, you just need to be better than the others to get higher rewards!<br /><br />
                    <em>Note 1: your predictions must be saved during the prediction period (there is a countdown shown above). As the first prediction game is live for the FIFA WORLD CUP - Group phase, your prediction must be saved prior the starting date: November 20th 2022.<br />‍<br />
                        Note 2: As long as the prediction period is not over, you can submit new predictions. The last submission you have done will be the only one considered, and the previous ones will therefore be overridden.</em><br /><br />
                    4. At the end of the contest, the prize pool is split based on the final rankings of all the participants.<br />
                    The details of the prize pool distribution is explained in (<a href="https://irruption-lab.gitbook.io/interpool/welcome/frequently-asked-questions#prizes-and-winning" target="_blank" rel="noreferrer">here</a>).<br /><br />
                    5. You can get your deposit back right after the end of the contest, or go on for another round, your ticket(s) make you eligible for all the future games! Fill in your predictions for the next contest and win more prizes! </p>
            </div>
        </section>
    )
}
export default SectionHowToPlay;