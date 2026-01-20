import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export const FormikService=()=>{

    const createItems=async(ListName:string,body:any)=>{
        const createItems=await sp.web.lists.getByTitle(ListName).items.add(body);
        return createItems;
    }
    return(
        {createItems}
    )
}