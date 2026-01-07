import * as  React from 'react'
import { ITrainingWebPartProps } from './ITrainingWebPartProps';
import BoxFile from './ButtonFile';
const TrainingWebPart:React.FC<ITrainingWebPartProps>=(props)=>{

  return(
    <>
    <p>Helllo I am functional compononet</p>
    <BoxFile/>
    </>
  )
}
export default TrainingWebPart;