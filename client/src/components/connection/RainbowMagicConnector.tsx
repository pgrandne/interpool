// RainbowMagicConnector.ts

import { MagicAuthConnector } from '@everipedia/wagmi-magic-connector';
import { Chain, Wallet } from '@rainbow-me/rainbowkit';
export interface MyWalletOptions {
    chains: Chain[];
}

export const rainbowMagicConnector = ({ chains }: MyWalletOptions): Wallet => ({
    id: 'magic',
    name: 'Email',
    iconUrl: './images/proton.png',
    iconBackground: '#fff',
    createConnector: (): any => {
        const connector = new MagicAuthConnector({
            chains: chains,
            options: {
                apiKey: process.env.REACT_APP_MAGICLINK_KEY!,
                magicSdkConfiguration: {
                    network: {
                        rpcUrl: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_ID}`, // your ethereum, polygon, or optimism mainnet/testnet rpc URL
                        chainId: 5,
                    },
                },
                //...Other options (check out full API below)
            },
        });
        return {
            connector,
        };
    },
});