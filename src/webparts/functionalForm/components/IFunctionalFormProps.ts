import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalFormProps {
  ListName:string;
  context:WebPartContext;
  siteurl:string;
  departmentOptions:string|any;
  genderoptions:string|any;
  skillsoptions?:any;
  cityoptions?:string|any;
}
