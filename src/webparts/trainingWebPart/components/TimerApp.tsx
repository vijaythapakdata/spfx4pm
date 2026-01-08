import * as React from "react";

const TimerApp:React.FC<{}>=()=>{
   const[seconds,setSeconds]=React.useState(0);
   React.useEffect(()=>{
    const timer=setInterval(()=>{
        setSeconds(prev=>prev+1);
    },1000);
    return ()=>{
        clearInterval(timer)
    }
   },[]);
    return(
        <>
        <h1>Seconds:{seconds}</h1>
        </>
    )
}

export default TimerApp;