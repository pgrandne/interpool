import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/css/normalize.css';
import './utils/css/webflow.css';
import './utils/css/interpool.webflow.css'
import "@rainbow-me/rainbowkit/styles.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { connectorsForWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { rainbowMagicConnector } from './components/connection/RainbowMagicConnector';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID })],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      rainbowMagicConnector({ chains }),
      injectedWallet({ chains, }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider showRecentTransactions={true} chains={chains} modalSize="compact" theme={darkTheme({
        accentColor: 'none',
        accentColorForeground: 'black',
        borderRadius: 'large',
      })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
