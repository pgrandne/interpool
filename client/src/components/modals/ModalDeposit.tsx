import { ethers } from 'ethers'
import { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { erc20ABI } from 'wagmi'
import { mumbai } from '../../utils/contractAddress'

function ModalDeposit({ setModalDeposit, amount }: { setModalDeposit: React.Dispatch<React.SetStateAction<boolean>>, amount: string }) {
    const [balance, setBalance] = useState('0')
    const { address } = useAccount()!
    const add: `0x${string}` = address!
    useContractRead({
        address: mumbai.usdcContract,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [add],
        onSuccess(data) {
            setBalance(ethers.utils.formatUnits(data._hex))
        }
    })

    return (
        <div className="modal-wrapper">
            <div data-w-id="17b55dba-8acd-ac79-4b99-88a555b29f51" className="modal-outside-trigger" onClick={(e) => { setModalDeposit(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="17b55dba-8acd-ac79-4b99-88a555b29f54" alt="" className="image-18" onClick={(e) => { setModalDeposit(false) }} /></div>
                <h2 className="heading-7">Deposit Confirmation</h2>
                <p className="paragraph">Once you have your ticket(s) you become eligible to enter the prediction game. More tickets you own, higher are your rewards (more info <a href="https://app.gitbook.com/o/esvKHPPOt4LZoy42lERC/s/9TtqoT2sXyCd3aHeyycM/welcome/frequently-asked-questions#prizes-and-winning">here</a>)<br /></p>
                <div className="div-block-50">
                    <div className="text-block-45">Wallet balance:</div>
                    <div className="text-block-44">{balance}</div>
                </div>
                <div className="div-block-39 div-block-39-variation">
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/usd-coin-usdc-logo.png" loading="lazy" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" sizes="100vw" alt="" className="image-16" />
                            <div className="text-block-43">{parseInt(amount) * 50}</div>
                        </div>
                        <div className="text-block-41">USDC*</div>
                    </div>
                    <div className="div-block-38"><img src="images/next.png" loading="lazy" alt="" className="image-17" /></div>
                    <div className="div-block-36">
                        <div className="div-block-37"><img src="images/ticket-2.png" loading="lazy" alt="" className="image-16" />
                            <div className="text-block-43">{amount}</div>
                        </div>
                        <div className="text-block-41">x Ticket(s)</div>
                    </div>
                </div>
                <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className="hollow-button white">Confirm Deposit</a>
                <p className="paragraph-2">*Get your Deposit back anytime after the game completion.</p>
            </div>
        </div>
    )
}

export default ModalDeposit;