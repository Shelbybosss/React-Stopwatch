import React,{useState,useEffect,useRef} from "react"

function Stopwatch () {

const [isRunning,setIsRunning] = useState(localStorage.getItem("isRunning") === true );
const [elapsedTime, setElapsedTime] = useState(parseInt(localStorage.getItem("elapsedTime")) || 0);
const intervalIdRef = useRef(null);
const startTimeRef = useRef(0);

useEffect(() => {


    

    if(isRunning){
        intervalIdRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current);
            localStorage.setItem("elapsedTime", elapsedTime);
        },10)
    }

    return () => {
        clearInterval(intervalIdRef.current);
    }

},[isRunning,elapsedTime])

useEffect(() => {
    localStorage.setItem("isRunning", isRunning);
  }, [isRunning]);

function Start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
}

function Stop () {
    setIsRunning(false);
}

function Reset () {
    setElapsedTime(0);
    setIsRunning(false);
}

function FormatTime () {

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");



    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    console.log("running");


}




    return(
        <div className="stopwatch">
            <div className="display">{FormatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={Start}>Start</button>
                <button className="stop-button" onClick={Stop}>Stop</button>
                <button className="reset-button" onClick={Reset}>Reset</button>

            </div>



        </div>
    );
}

export default Stopwatch