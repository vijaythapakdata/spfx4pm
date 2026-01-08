import * as  React from 'react'
import { ITrainingWebPartProps } from './ITrainingWebPartProps';
import BoxFile from './ButtonFile';
import CounterApp from './CounterApp';
import FormFile from './Form';
import TimerApp from './TimerApp';
// import { useEffect } from 'react';/
const TrainingWebPart:React.FC<ITrainingWebPartProps>=(props)=>{



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
    </>
  )
}
export default TrainingWebPart;