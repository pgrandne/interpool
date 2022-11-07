import { useEffect, useState } from "react"

function Countdown() {
    const [countDown, setCountDown] = useState(0)
    const countDownDate = 1668189600000
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1);
        setHours(Math.floor((countDown % (1000 * 60 * 60 * 24 * 31)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds(Math.floor((countDown % (1000 * 60)) / (1000)))
        return () => clearInterval(interval);
    }, [countDown]);

    return (
        <div id="w-node-_40b5d444-6d80-431b-5657-b9e2ab6974f4-3d3dc5f0" className="text-block text-block-variation">
            {Math.floor(hours / 10)}{Math.floor(hours % 10)}:
            {Math.floor(minutes / 10)}{Math.floor(minutes % 10)}:
            {Math.floor(seconds / 10)}{Math.floor(seconds % 10)}
        </div>
    )
}
export default Countdown;