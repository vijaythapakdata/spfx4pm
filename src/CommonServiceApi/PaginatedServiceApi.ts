import {sp} from "@pnp/sp/presets/all";
import { IFunctionalFormState } from "../CommonMethod/IFunctionalFormState";
import { ListName } from "../ENUM/ListServices";

export default class PaginatedItemsClass{

    public static async getPaginatedItems():Promise<IFunctionalFormState[]>{
        try{
const data =await sp.web.lists.getByTitle(ListName.FirstList).items.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title")
.expand("Admin","City").get();

return data.map(e=>({
    Key:e.Id,
    Name:e.Title,
    Email:e.EmailAddress,
    Age:e.Age,
    Admin:e.Admin?.Title,
    City:e.City?.Title
}));
        }
        catch(err){
console.log("Errr",err);
return [];
        }
    }
}