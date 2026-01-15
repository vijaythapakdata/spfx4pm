import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IFunctionalFormState } from "../CommonMethod/IFunctionalFormState";

export class FunctionalFormServiceClass{
    private web;

    constructor(siteurl:string){
        this.web=Web(siteurl);

    }

public async addItems(ListName:string,formData:IFunctionalFormState):Promise<any>{
    try{
const list =  this.web.lists.getByTitle(ListName);
const items=await list.items.add({
    Title:formData.Name,
    EmailAddress:formData.Email,
    Address:formData.FullAddress,
    Age:parseInt(formData.Age),
    Salary:parseFloat(formData.Salary),
    Score:formData.Score,
    Permission:formData.Permission,
    AdminId:formData.AdminId,
    ManagerId:{results:formData.ManagerId},
    Department:formData.Department,
    CityId:formData.City,
    Gender:formData.Gender,
    Skills:{results:formData.Skills},
    DOB:new Date(formData.DOB)
});
return items;

    }
    catch(err){
console.log("Add item error",err);
throw err;
    }

}
}