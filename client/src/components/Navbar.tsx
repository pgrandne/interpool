function Navbar({ currentSection, setCurrentSection }: { currentSection: any, setCurrentSection: React.Dispatch<any> }) {

    return (
        <div data-collapse="medium" data-animation="default" data-duration="400" data-no-scroll="1" data-easing="ease" data-easing2="ease" role="banner" className="left-navigation w-nav">
            <a href="/" className="logo-link w-nav-brand"><img src="images/Interpool.png" loading="lazy" width="50" srcSet="images/Interpool-p-500.png 500w, images/Interpool.png 902w" sizes="49.99622344970703px" alt="" />
                <h1 className="brand-text">InterPool</h1>
            </a>
            <nav role="navigation" className="nav-menu w-nav-menu">
                <ul>
                    <li>
                        <a href="#home" className={(currentSection === "header" || currentSection === "home") ? "nav-link w-inline-block w--current" : "nav-link w-inline-block"}>
                            <div className="div-block-3">
                                {currentSection !== "header" && currentSection !== "home" && <img src="images/soccer-fieldb-blanc.png" loading="lazy" width="25" alt="" className="image-2 image-home-current" />}
                                {(currentSection === "header" || currentSection === "home") && <img src="images/soccer-field-blue.png" loading="lazy" width="25" alt="" className="image-2 image-home-current" />}
                                <div>Home</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#get-your-tickets" className={(currentSection === "get-your-tickets") ? "nav-link w-inline-block w--current" : "nav-link w-inline-block"}>
                            <div className="div-block-3">
                                {(currentSection !== "get-your-tickets") && <img src="images/ticket-2-blanc.png" loading="lazy" width="25" alt="" className="image-2 image-get-ticket-inactive" />}
                                {(currentSection === "get-your-tickets") && <img src="images/ticket-2-bleu.png" loading="lazy" width="25" alt="" className="image-2 image-get-ticket-inactive" />}
                                <div>Get Tickets</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#how-to-play" className={(currentSection === "how-to-play") ? "nav-link w-inline-block w--current" : "nav-link w-inline-block"}>
                            <div className="div-block-3">
                                {(currentSection !== "how-to-play") && <img src="images/megaphone-blanc.png" loading="lazy" width="25" alt="" className="image-2 image-how-to-play-inactive" />}
                                {(currentSection === "how-to-play") && <img src="images/megaphone-blue.png" loading="lazy" width="25" alt="" className="image-2 image-how-to-play-inactive" />}
                                <div>How to play</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#account" className={(currentSection === "account") ? "nav-link w-inline-block w--current" : "nav-link w-inline-block"}>
                            <div className="div-block-3">
                                {(currentSection !== "account") && <img src="images/account-blanc.png" loading="lazy" width="23" alt="" className="image-2 image-account-inactive" />}
                                {(currentSection === "account") && <img src="images/Account-blue.png" loading="lazy" width="22" alt="" className="image-2 image-account-inactive" />}
                                <div>Account</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
            {/* <div className="hamburger-button w-nav-button">
                <div className="w-icon-nav-menu"></div>
            </div> */}
            <div className="social-footer w-hidden-medium w-hidden-small w-hidden-tiny">
                <a href="https://irruption-lab.gitbook.io/interpool/" target="_blank" rel="noreferrer" className="social-icon-link w-inline-block">
                    <div className="text-block-49">Documentation</div>
                </a>
                <a href="https://www.linkedin.com/company/irruption-lab" target="_blank" rel="noreferrer" className="social-icon-link w-inline-block"><img src="images/social-09-white.svg" width="17" alt="" /></a>
                <a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer" className="social-icon-link w-inline-block"><img src="images/social-18-white.svg" width="17" alt="" /></a>
                <a href="https://github.com/pgrandne/Interpool" target="_blank" rel="noreferrer" className="social-icon-link w-inline-block"><img src="images/social-33-white.svg" width="17" alt="" /></a>
                <a href="https://www.youtube.com/@IrruptionLab" target="_blank" rel="noreferrer" className="social-icon-link w-inline-block"><img src="images/social-16-white.svg" width="17" alt="" /></a>
            </div>
        </div >
    )
}

export default Navbar;