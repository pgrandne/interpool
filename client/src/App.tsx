import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import SectionAccount from './sections/SectionAccount';
import SectionHowToPlay from './sections/SectionHowToPlay';
import SectionGetYourTickets from './sections/SectionGetYourTickets';
import SectionHome from './sections/SectionHome';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const [sections, setSections] = useState<any>()
  const [currentSection, setCurrentSection] = useState("header")

  useEffect(() => {
    setSections(document.querySelectorAll("section"))
  }, [])

  window.onscroll = () => {
    sections.forEach((section: any) => {
      const sectionTop = section.offsetTop;
      if (document.documentElement.scrollTop >= sectionTop - 80) {
        setCurrentSection(section.getAttribute("id"))
      }
    });
  };

  return (
    <div className="content">
      <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <Header />
      <SectionHome />
      <SectionGetYourTickets />
      <SectionHowToPlay />
      <SectionAccount />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
