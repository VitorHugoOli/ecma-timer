import {useEffect, useState} from "react";

function Timer() {
    const [timer, setTimer] = useState<number>(0)
    const [formatTimer, setFormatTimer] = useState<String>("")
    const [stopTimer, setStopTimer] = useState<boolean>(false)
    let refTimer: NodeJS.Timeout;

    const startTimer = () => {
        refTimer = setInterval(() => {
            setTimer(timer + 1)
        }, 1000);
    }

    useEffect(() => {
        !stopTimer && startTimer()
        return () => refTimer && clearInterval(refTimer);
    })

    const format2digits = (number: number) => (number < 10 ? '0' : '') + number;

    useEffect(() => {
        const format: Date = new Date(2021)
        format.setSeconds(timer)
        setFormatTimer(`${format2digits(format.getMinutes())}:${format2digits(format.getSeconds())}`)
    }, [timer])

    return (
        <div style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <h1>{formatTimer}</h1>
            <div style={{display: "flex", flexDirection: "row", width: "50%", justifyContent: "space-between"}}>
                <button onClick={() => {
                    if (!refTimer) {
                        stopTimer && setStopTimer(false)
                        startTimer()
                    }
                }}>
                    Start
                </button>
                <button onClick={() => setTimer(0)}>
                    Clear Time
                </button>
                <button onClick={() => {
                    setStopTimer(true)
                    clearTimeout(refTimer);
                    setTimer(0);
                }}>
                    Kill timer
                </button>
            </div>

        </div>

    )
}

export default Timer
