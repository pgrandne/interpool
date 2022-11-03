import Connection from "./connection/Connection";

function Header() {
    return (
        <div className="section-header wf-section">
            <div className="div-block-14">
                <h1 className="heading-8">The only prediction contest where everyone wins! </h1>
                <div className="div-block-15">
                    <div className="div-block-16"><img src="images/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png" loading="lazy" width="25" alt="" />
                        <div>Polygon</div>
                    </div>
                    <Connection />
                </div>
                <h1 className="heading-8 heading-8-slogan-mobile">The only prediction contest where everyone wins! </h1>
            </div>
        </div>
    )
}

export default Header;