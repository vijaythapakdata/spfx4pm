import * as  React from 'react'
import { ITrainingWebPartProps } from './ITrainingWebPartProps';
import BoxFile from './ButtonFile';
import CounterApp from './CounterApp';
import FormFile from './Form';
import TimerApp from './TimerApp';
import { PrimaryButton } from '@fluentui/react';
// import { useEffect } from 'react';/
// import {sp} from "@pnp/sp";
const TrainingWebPart:React.FC<ITrainingWebPartProps>=(props)=>{
var c=90;
   var fruits=["Apple","Mango","Grapes"];
  const varScopeFunction=async()=>{
    const a=5;
     console.log(a);
// const name="Vijay";
    //  let

    let b=80;
    b=90
    console.log(b);//90
    c=100;
    console.log(c);

    const fruits=["Apple","Mango","Grapes"];
    fruits.forEach((e)=>{
      console.log(e); //Apple , Mango , Grapes 0^1

    })
    for(const f of fruits){
      console.log(f); //Apple,Mango,Grapes 0^2
    }

    const num1='10';
    const num2=20;
    console.log(parseInt(num1)+num2); /// a=1020,30,error 30

    const sal=10;
    const sal1=10.4;
    Math.ceil(sal1); //10
    console.log(sal+sal1)//20.4 , 20
  }
 

  return(
    <>
    <p>Helllo I am functional compononet</p>
    <BoxFile/>
    <CounterApp/>
    <FormFile/>
    <hr>
    </hr>
    <p>Stop Watch</p>
    <TimerApp/>

   <span>SiteUrl: {props.context.pageContext.web.absoluteUrl}</span> 
   <br/>
     <span>Current User Name: {props.context.pageContext.user.displayName}</span> 

     <PrimaryButton 
     text='Call Function' onClick={varScopeFunction}

     
     />
<br/>
<br/>

{fruits.map((e)=>{
  console.log(e);
})}
  
    </>
  )
}
export default TrainingWebPart;