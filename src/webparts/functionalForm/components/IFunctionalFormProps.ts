import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalFormProps {
  ListName:string;
  context:WebPartContext;
  siteurl:string;
  departmentOptions:string;
  genderoptions:string;
  skillsoptions:any;
  cityoptions:string;
}
