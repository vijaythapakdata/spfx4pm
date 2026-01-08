import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
const CounterApp:React.FC<{}>=()=>{

    // count is initilaizing the value of state and setcount is updating the value ofcount every timeuser interract
const [count,setCount]=useState<number>(0);
 React.useEffect(()=>{
     console.log("Hello useEffect")
    
    },[]);
    return(
        <>
        <p><span>Counter APP:</span>{count} </p>
        <PrimaryButton
        text="Count" onClick={()=>setCount(count+1)}

        />
        {/* count =0, 1 */}
        </>
    )
}

export default CounterApp;