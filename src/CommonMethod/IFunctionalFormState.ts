export interface IFunctionalFormState{
    Key?:number;
    Name?:string;
    Email?:string;
    FullAddress?:string;
    Age?:any;
    Salary?:any;
    Score?:number;
    Permission?:boolean
    Admin?:string;
    AdminId?:number;
    Manager?:any[];
    ManagerId?:any[];
    Department?:string;
    City?:string;
    Gender?:string;
    Skills?:any;
    DOB?:any;
}

export interface IPaginatedState{
Key:number;
Title:string;
EmailAddress:string;
Age:number;
Admin:string;
City:string;
}

export interface ILargeListServiceFile{
    Title:string;
   
}