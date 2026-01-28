import { ICamlQuery,sp } from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ILargeListServiceFile } from "../CommonMethod/IFunctionalFormState";
import { ListName } from "../ENUM/ListServices";

export class ServiceClassLargeList{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }

    //get more than 5000 items using WhereClause

    public async getLargeListWhereClause():Promise<ILargeListServiceFile[]>{
        const allItems:ILargeListServiceFile[]=[];
        let position:any;
        do{
const camlQuery:ICamlQuery={
    ViewXml:`
    <View>
    <Query>
    <Where>
    <IsNotNull>
    <FieldRef Name="Title"/>
    </IsNotNull>
    </Where>
    </Query>
    <RowLimit Paged='TRUE'>5000</RowLimit>
    </View>
    `
};

const response=await sp.web.lists.getByTitle(ListName.FirstList).getItemsByCAMLQuery(camlQuery,position);
console.log(`Batched items : ${response.length}`);
allItems.push(...response.map((items:any)=>({
    Title:items.Title
})));
        }
        while(position){
console.log(`Fetching more item ${allItems.length}`);
return allItems;
        }
    }
}