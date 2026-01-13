import * as React from 'react';
// import styles from './FunctionalForm.module.scss';
import type { IFunctionalFormProps } from './IFunctionalFormProps';
import { IFunctionalFormState } from '../../../CommonMethod/IFunctionalFormState';
import { FunctionalFormServiceClass } from '../../../CommonServiceApi/FunctionalFormServiceApi';
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, TextField ,Slider,Toggle} from '@fluentui/react';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
const  FunctionalForm :React.FC<IFunctionalFormProps>=(props)=>{
  const [formData,setFormData]=React.useState<IFunctionalFormState>({
    Name:"",
    Email:"",
    FullAddress:"",
    Age:"",
    Salary:"",
    Score:1,
    Permission:false,
    Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[]
  });
  //Get admin single selected people picker method 
  const getAdmin=(items:any[])=>{
if(items.length>0){
  setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
}
else{
  setFormData(prev=>({...prev,Admin:"",AdminId:0}))
}
  }
//get Managers multiselect people picker

const getManager=(items:any[])=>{
  setFormData(prev=>({...prev,Manager:items.map(i=>i.text)}))
  setFormData(prev=>({...prev,ManagerId:items.map(i=>i.id)}))
}

  
  const createForm=async()=>{
    try{
const service=new FunctionalFormServiceClass(props.siteurl);
const result=await service.addItems(props.ListName,formData);
Dialog.alert(`Item created successfully with Id ${result.data.Id}`);
console.log(result);

setFormData({
  Name:"",
   Email:"",
    FullAddress:"",
    Age:"",
    Salary:"",
    Score:1,
    Permission:false,
     Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[]
});
    }
    catch(err){
console.error(`Error occurred while creating items`,err);
Dialog.alert(`Errorr`);
    }
  }
//Form Event
const handleChange=(field:keyof IFunctionalFormState,value:string|boolean|number):void=>{
  setFormData(prev=>({...prev,[field]:value})); ///a=[1,2,3,4,5], ...a[3,4] , console.log(a)=4,5
  
}

  return(
    <>
<TextField
label='Name'
value={formData.Name}
onChange={(_,e)=>handleChange("Name",e||'')}
/>  
<TextField
label='Email'
value={formData.Email}
onChange={(_,e)=>handleChange("Email",e||'')}
/> 
<TextField
label='Age'
value={formData.Age}
onChange={(_,e)=>handleChange("Age",e||'')}
/> 
<TextField
label='Salary'
value={formData.Salary}
onChange={(_,e)=>handleChange("Salary",e||'')}
prefix='$'
suffix='USD'
/> 
<Slider
label='Score'
min={1}
max={100}
step={1}
value={formData.Score}
onChange={(e)=>handleChange("Score",e)}
/>
<Toggle
label='Permission'
checked={formData.Permission}
onChange={(_,checked)=>handleChange("Permission",checked!!)}
/>
{/* People Picker */}
<PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={getAdmin}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true}
    defaultSelectedUsers={[formData.Admin?formData.Admin:'']}
    webAbsoluteUrl={props.siteurl}
    />
    <PeoplePicker
    context={props.context as any}
    titleText="Managers"
    personSelectionLimit={2}
    showtooltip={true}
    onChange={getManager}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true}
    defaultSelectedUsers={formData.Manager}
    webAbsoluteUrl={props.siteurl}
    />
<TextField
label='Full Address'
value={formData.FullAddress}
onChange={(_,e)=>handleChange("FullAddress",e||'')}
multiline
rows={5}
/> 
<br/>
<PrimaryButton
text='Save'
onClick={createForm}
iconProps={{iconName:'save'}}
/>  
    </>
  )
}
export default FunctionalForm;
