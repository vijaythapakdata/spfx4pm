import { TextField } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
const FormFile:React.FC<{}>=()=>{
    const [name,setName]=useState<string>('');


    return(
        <>
        <TextField
        label="Name"
        value={name}
        onChange={(_,b)=>setName(b||"")}
        />
     <p>{name}</p>
        </>
    )
}

export default FormFile;