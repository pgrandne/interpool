import { useEffect, useState } from "react";

function BannerCountdown() {
    const [countDown, setCountDown] = useState(0)
    const countDownDate = 1670022000000
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1);
        setDays(Math.floor((countDown % (1000 * 60 * 60 * 24 * 31)) / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
        return () => clearInterval(interval);
    }, [countDown]);

    return (
        <div className="block-contest-result-in block-home-section">
            <div className="div-block colorvariation-4">
                <div id="w-node-a6b17af5-47c5-7e56-de42-ea26d682ffad-3d3dc5f0" className="div-block-2"><img src="images/Coupe-blanc.png" loading="lazy" width="40" alt="" className="image" /></div>
                <div id="w-node-a6b17af5-47c5-7e56-de42-ea26d682ffaf-3d3dc5f0" className="div-block-20">
                    <div className="text-block-15">Winners announcement in </div>
                    <div className="div-block-21">
                        <div className="w-layout-grid grid-7">
                            <div id="w-node-a6b17af5-47c5-7e56-de42-ea26d682ffb2-3d3dc5f0" className="text-block-16 text-block-16-right-align">{days} </div>
                            <div id="w-node-f30833a2-a181-0371-c3fa-eee26d40a0bf-3d3dc5f0" className="text-block-16">D </div>
                            <div className="text-block-16 text-block-16-right-align">{hours} </div>
                            <div className="text-block-16">H </div>
                            <div className="text-block-16 text-block-16-right-align">{minutes}</div>
                            <div className="text-block-16">min </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BannerCountdown;
