import Countdown from "../../utils/Countdown"
import PrizePool from "../../utils/PrizePool";

function BannerNoTicket() {
    return (
        <div className="w-layout-grid grid grid-no-ticket-yet">
            <a href="#get-your-tickets" id="w-node-c281c257-2dba-658d-2aa3-0705c6a485a3-3d3dc5f0" className="link-block-2">
                <div className="rainbow">
                    <div id="w-node-_2b135944-a289-2599-66e8-4fff354fe2b1-3d3dc5f0" className="div-block-ticket">
                        <div id="w-node-_4e7f2e1c-88ec-5813-188a-414986da3a49-3d3dc5f0" className="div-block-2"><img src="images/ticket-2-blanc.png" loading="lazy" width="35" alt="" className="image" /></div>
                        <div className="div-block-info">
                            <h1 data-w-id="57b8ba69-3cd6-333f-92d6-29d7b8e787b2" className="heading-9">Get your Tickets!</h1>
                        </div>
                    </div>
                </div>
            </a>
            <div id="w-node-_6b61e304-fb49-a93b-24a7-20abbc4407c8-3d3dc5f0" className="div-block colorvariation-2">
                <div id="w-node-_6b61e304-fb49-a93b-24a7-20abbc4407c9-3d3dc5f0" className="div-block-2"><img src="images/piggy-bank-blanc.png" loading="lazy" width="40" alt="" className="image" /></div>
                <div id="w-node-_6b61e304-fb49-a93b-24a7-20abbc4407cb-3d3dc5f0" className="div-block-info">
                    <div className="text-block-3">Prize Pool</div>
                    <PrizePool />
                </div>
            </div>
            <div id="w-node-_40b5d444-6d80-431b-5657-b9e2ab6974ee-3d3dc5f0" className="div-block colorvariation-3">
                <div id="w-node-_40b5d444-6d80-431b-5657-b9e2ab6974ef-3d3dc5f0" className="div-block-2"><img src="images/time-blanc.png" loading="lazy" width="40" alt="" className="image" /></div>
                <div id="w-node-_40b5d444-6d80-431b-5657-b9e2ab6974f1-3d3dc5f0" className="div-block-info">
                    <div className="text-block-3">Prediction period</div>
                    <Countdown />
                </div>
            </div>
        </div>
    )
}

export default BannerNoTicket;