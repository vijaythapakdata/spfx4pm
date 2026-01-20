import * as React from 'react';
import styles from './FormikValidation.module.scss';
import type { IFormikValidationProps } from './IFormikValidationProps';
import { FormikService } from '../../../CommonServiceApi/FormikValidationStationService';
import {sp} from "@pnp/sp/presets/all";
import * as Yup from 'yup';
import { Formik,FormikProps } from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import {  PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DatePickerStrings, FormateDate } from '../../../DateFormateFiles/DateValue';
const stackTokens = { childrenGap: 10 };
const FormikValidation:React.FC<IFormikValidationProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null);

React.useEffect(()=>{
 sp.setup({
  spfxContext:props.context as any
 }) ;
 setService(FormikService()); 

},[props.context,props.siteurl]);

//validation schema

const validationForm=Yup.object().shape({
  name:Yup.string().required("Task name is required"),
  details:Yup.string().min(15,"Minimum 15 or characters are required").required("Task details are required"),
  startDate:Yup.date().required("start date is required"),
  endDate:Yup.date().required("End date is required"),
  phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"Phone number must be 10 digits"),
  projectName:Yup.string().required("Project name is required"),
  emailAddress:Yup.string().email("Invalid email format").required("Email address is required")
});

// common field 

const getFieldProps=(formik:FormikProps<any>,field:string)=>({
  ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
});

//create record 

const createRecord=async(record:any)=>{
  try{
if(!service) return;
const item =await service.createItems(props.ListName,{
  Title:record.name,
  ProjectName:record.projectName,
  EmailAddress:record.emailAddress,
  PhoneNumber:record.phoneNumber,
  TaskDetails:record.details,
  StartDate:record.startDate,
  EndDate:record.endDate
});
console.log("Item created:",item);
Dialog.alert("Record created successfully!");
  }
  catch(err){
console.error("Error creating item:",err);
  }
}

  return(
    <>

    <Formik
    
    initialValues={{
      name:"",
      details:"",
      projectName:"",
      startDate:null,
      endDate:null,
      phoneNumber:"",
      emailAddress:""
    }}
    validationSchema={validationForm}
    onSubmit={(values,helpers)=>{
      createRecord(values).then(()=>helpers.resetForm())
    }}
    >

{(formik:FormikProps<any>)=>(
  <form onSubmit={formik.handleSubmit}>
    <div className={styles.formikValidation}>
<Stack tokens={stackTokens}>
<Label className={styles.lbl}>User Name </Label>

  <PeoplePicker
      context={props.context as any}
      personSelectionLimit={1}
      showtooltip={true}
     disabled={true}
      principalTypes={[PrincipalType.User]}
      resolveDelay={1000}
      ensureUser={true}
      defaultSelectedUsers={[props.context.pageContext.user.displayName]}
      webAbsoluteUrl={props.siteurl}
      />
      <Label className={styles.lbl}>Task Name </Label>

      <TextField
      {...getFieldProps(formik,'name')}
      />
        <Label className={styles.lbl}>Email Address </Label>

      <TextField
      {...getFieldProps(formik,'emailAddress')}
      />
        <Label className={styles.lbl}>Phone Number </Label>

      <TextField
      {...getFieldProps(formik,'phoneNumber')}
      />
       <Label className={styles.lbl}>Project Name </Label>
       <Dropdown
       options={[
        {key:'Project A',text:'Project A'},
        {key:'Project B',text:'Project B'},
        {key:'Project C',text:'Project C'}
       ]}
       selectedKey={formik.values.projectName}
       onChange={(_,options)=>formik.setFieldValue('projectName',options?.key as string)}
       errorMessage={formik.errors.projectName as string}
       />
        <Label className={styles.lbl}>Start Date </Label>
        <DatePicker
        value={formik.values.startDate}
        strings={DatePickerStrings}
        formatDate={FormateDate}
        textField={{...getFieldProps(formik,'startDate')}}
        onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
        />
          <Label className={styles.lbl}>End Date </Label>
        <DatePicker
        value={formik.values.endDate}
        strings={DatePickerStrings}
        formatDate={FormateDate}
        textField={{...getFieldProps(formik,'endDate')}}
        onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
        />
          <Label className={styles.lbl}>Task Details </Label>

      <TextField
      {...getFieldProps(formik,'details')}
      multiline
      rows={5}
      />
</Stack>
<PrimaryButton
className={styles.btn}
text='Save'
type='submit'
iconProps={{iconName:'save'}}
/>
<PrimaryButton
className={styles.btn}
text='Cancel'
onClick={formik.handleReset as any}
iconProps={{iconName:'cancel'}}
/>

    </div>

  </form>
)}

    </Formik>
    </>
  )
}
export default FormikValidation;
