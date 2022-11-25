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
        <div id="w-node-a6b17af5-47c5-7e56-de42-ea26d682ffb2-3d3dc5f0" className="text-block">{days}D {hours}H {minutes}m</div>

    )
}
export default BannerCountdown;
