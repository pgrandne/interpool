import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { rainbowMagicConnector } from './components/connection/RainbowMagicConnector';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import SectionAccount from './sections/SectionAccount';
import SectionHowToPlay from './sections/SectionHowToPlay';
import SectionGetYourTickets from './sections/SectionGetYourTickets';
import SectionHome from './sections/SectionHome';

function App() {
  const { chains, provider } = configureChains(
    [chain.polygonMumbai],
    [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID })],
  );

  const connectors = connectorsForWallets([
    {
      groupName: 'Suggested',
      wallets: [
        rainbowMagicConnector({ chains }),
        // injectedWallet({ chains, }),
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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact" theme={darkTheme({
        accentColor: 'none',
        accentColorForeground: 'black',
        borderRadius: 'large',
      })}
      >
        <div className="content">
          <Navbar />
          <Header />
          <SectionHome />
          <SectionGetYourTickets />
          <SectionHowToPlay />
          <SectionAccount />
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>

  );
}

export default App;
