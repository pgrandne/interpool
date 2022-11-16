import { useAccount, useContractRead, usePrepareContractWrite, useContract, erc20ABI } from "wagmi";
import { useAddressNetwork } from '../../utils/useAddressNetwork'
import { useState } from "react";
import { ethers } from "ethers";
import { ABI_Interpool } from '../../utils/ABI_Interpool'

function ModalMoreTickets({ setModalMoreTickets, ticket, pendingWinnings }: {
    setModalMoreTickets: React.Dispatch<React.SetStateAction<boolean>>,
    ticket: number,
    pendingWinnings: number
}) {
    const addressNetwork = useAddressNetwork()
    const { address }: { address: any } = useAccount()
    const [usdcBalance, setUsdcBalance] = useState(0)
    const [newTicket, setNewTicket] = useState(1)

    useContractRead({
        address: addressNetwork.usdcContract,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
        onSuccess(data: any) {
            setUsdcBalance(parseFloat(ethers.utils.formatUnits(data._hex, 6)))
        },
    })

    return (
        <div className="modal-wrapper">
            <div data-w-id="8332a3c0-a742-fae8-9847-b84aee7f42c1" className="modal-outside-trigger" onClick={(e) => { setModalMoreTickets(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="8332a3c0-a742-fae8-9847-b84aee7f42c4" alt="" className="image-18" onClick={(e) => { setModalMoreTickets(false) }} /></div>
                <h2 className="heading-6 heading-6-variation-2 heading-6-var-3">Get more Tickets!</h2>
                <p>Convert your winnings into additional tickets and get higher rewards for the next contest! More details <a href="https://irruption-lab.gitbook.io/interpool/welcome/frequently-asked-questions" target="_blank" rel="noreferrer">here</a>
                </p>
                <p className="paragraph">You currently own <strong>{ticket} Ticket(s)</strong> and have <strong>${pendingWinnings} in winnings</strong> to convert. If required additional USDC can be deposited from your personal wallet.
                </p>
                <div className="div-block-43">
                    <div className="div-block-45">
                        <div className="text-block-50">Available winnings:</div>
                        <div className="text-block-51">${pendingWinnings}</div>
                    </div>
                    <div className="div-block-46">
                        <div className="text-block-50">Wallet balance:</div>
                        <div className="text-block-51">{usdcBalance.toFixed(2)} USDC</div>
                    </div>
                </div>
                <div className="div-block-39 div-block-39-var-more-tickets">
                    <div className="w-layout-grid grid-8">
                        <div id="w-node-a176e6d6-2dd2-571b-7ec6-742bc50f177c-3d3dc5f0" className="div-block-38"><img src="images/next.png" loading="lazy" alt="" className="image-17" /></div>
                        <div id="w-node-a176e6d6-2dd2-571b-7ec6-742bc50f177e-3d3dc5f0" className="div-block-36">
                            <div className="div-block-37"><img src="images/ticket-2.png" loading="lazy" alt="" className="image-16" />
                                <input type="string" className="text-field w-input" maxLength={256} name="name-8" data-name="Name 8" placeholder={newTicket.toString()} id="name-8"
                                    onChange={(e) => {
                                        e.target.value !== '' ?
                                            setNewTicket(parseInt(e.target.value)) :
                                            setNewTicket(0)
                                    }}
                                />
                            </div>
                            <div className="text-block-41">x Ticket(s)</div>
                        </div>
                        <div id="w-node-a176e6d6-2dd2-571b-7ec6-742bc50f1776-3d3dc5f0" className="div-block-37 div-block-37-variation-more-tickets">
                            <div className="text-block-47">$</div>
                            <div className="text-block-48">{pendingWinnings}</div>
                        </div>
                        <div id="w-node-_262d8d38-d327-b960-5df4-b666955be277-3d3dc5f0">
                            <div className="text-block-47">+</div>
                        </div>
                        <div className="div-block-36 div-block-36-variation-more-tickets">
                            <div className="div-block-37 div-block-37-variation-more-tickets"><img src="images/usd-coin-usdc-logo.png" loading="lazy" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" sizes="100vw" alt="" className="image-16" />
                                <div className="text-block-48">{50 * newTicket - pendingWinnings}</div>
                            </div>
                            <div className="text-block-47">USDC</div>
                        </div>
                    </div>
                </div>
                <a href="/" data-w-id="10726a2a-0f38-c4f5-17d4-b50ee7aa8dd5" className="hollow-button white notactive">Confirm</a>
            </div>
        </div>
    )
}

export default ModalMoreTickets;