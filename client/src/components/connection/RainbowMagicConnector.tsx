import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector';
import {
    Chain,
    Wallet,
} from '@rainbow-me/rainbowkit';
export interface MyWalletOptions {
    chains: Chain[];
}


export const rainbowMagicConnector = ({ chains }: MyWalletOptions): Wallet => ({
    id: 'magic',
    name: 'eMail or Social Login ',
    iconUrl: './images/email.png',
    iconBackground: '#fff',
    createConnector: () => {
        // const connector = getWalletConnectConnector({ chains });
        const connector: any = new MagicConnectConnector({
            chains: chains,
            options: {
                apiKey: "REACT_APP_MAGICLINK_KEY",
                magicSdkConfiguration: {
                    network: "goerli"
                },
            },
        })
        return {
            connector,
        };
    },
});