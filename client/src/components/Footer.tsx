import { Fragment } from "react";

function Footer() {
    return (
        <Fragment>
            <footer className="footer center wf-section">
                <div className="w-container">
                    <div className="div-block-61">
                        <div className="div-block-62">
                            <a href="https://irruption-lab.gitbook.io/interpool/" target="_blank" rel="noreferrer" className="w-inline-block">
                                <div className="text-block-49">Documentation</div>
                            </a>
                            <a href="https://www.linkedin.com/company/irruption-lab" target="_blank" rel="noreferrer" className="w-inline-block">
                                <img src="images/social-09-black.svg" alt="" width="17" />
                            </a>
                            <a href="https://twitter.com/IrruptionLab" target="_blank" rel="noreferrer" className="w-inline-block">
                                <img src="images/social-18-black.svg" alt="" width="17" />
                            </a>
                            <a href="https://github.com/pgrandne/Interpool" target="_blank" rel="noreferrer" className="w-inline-block">
                                <img src="images/social-33-black.svg" alt="" width="17" />
                            </a>
                            <a href="https://www.youtube.com/@IrruptionLab" target="_blank" rel="noreferrer" className="w-inline-block">
                                <img src="images/social-16-black.svg" alt="" width="17" />
                            </a>
                        </div>
                        <div className="footer-text">by <a href="https://irruptionlab.com" className="link-2">Irruption Lab</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer;
