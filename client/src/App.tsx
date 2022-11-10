import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import 'react-toastify/dist/ReactToastify.css';
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
import { useEffect, useState } from 'react';

function App() {
  const [sections, setSections] = useState<any>()
  const [navLi, setNavLi] = useState<any>()
  const [currentSection, setCurrentSection] = useState("home")

  useEffect(() => {
    setSections(document.querySelectorAll("section"))
    setNavLi(document.querySelectorAll("nav ul li a"))
  }, [])

  window.onscroll = () => {
    sections.forEach((section: any) => {
      const sectionTop = section.offsetTop;
      if (document.documentElement.scrollTop >= sectionTop - 80) {
        setCurrentSection(section.getAttribute("id"))
        console.log(currentSection)
      }
    });
  };

  const { chains, provider } = configureChains(
    [chain.goerli],
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
          <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
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
