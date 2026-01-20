import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListName } from "../ENUM/ListServices";

export default class GettingChoiceApiClass{
    private context:WebPartContext;

    constructor(context:WebPartContext){
        this.context=context;

    }
     public async getChoiceFields(ListName:string,siteurl:string,fieldValue:any):Promise<any>{
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName}')/fields?$filter=EntityPropertyName eq '${fieldValue}'`,

  {
    method:'GET',
    headers:{
      'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Erorr found while reading the choice ${response.text}-${response.statusText}`);
};

const data=await response.json();
const choices=data.value[0].Choices;
return choices.map((items:any)=>({
  key:items,
  text:items
}));
    }
    catch(err){
console.error('err found',err);
return [];
    }
  }
  //get lookup

  public async getLookup():Promise<any>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${ListName.LookupList}')/items?$select=Title,ID`,
  {
    method:'GET',
    headers:{
         'Accept':'application/json;odata=nometadata'
    }
  }
);
if(!response.ok){
  throw new Error(`Erorr found while reading the lookup ${response.text}-${response.statusText}`);
};
const data=await response.json();
return data.value.map((city:{ID:string,Title:string})=>({
key:city.ID,
text:city.Title
}));
    }
    catch(er){
console.error(er);
return[]
    }
  }
}