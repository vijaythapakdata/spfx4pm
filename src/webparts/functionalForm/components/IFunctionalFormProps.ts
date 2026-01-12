import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFunctionalFormProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  ListName:string;
  context:WebPartContext;
  siteurl:string;
}
