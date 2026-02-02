import * as React from 'react';
// import styles from './LargeListCode.module.scss';
import type { ILargeListCodeProps } from './ILargeListCodeProps';

import { IDropdownOption ,Dropdown, PrimaryButton, DetailsList} from '@fluentui/react';
import { useState,useMemo,useEffect } from 'react';
import { ServiceClassLargeList } from '../../../CommonServiceApi/ILargeListService';
import { ILargeListServiceFile } from '../../../CommonMethod/IFunctionalFormState';

const pageSizeOptions:IDropdownOption[]=[
  {key:10,text:"10 items"},
  {key:20,text:"20 items"},
  {key:30,text:"30 items"}
]
const LargeListCode:React.FC<ILargeListCodeProps>=(props)=>{
const [pagedObject,setPagedObject]=useState<any>(null);
const [prevPageStack,setPrevPageStack]=useState<any[]>([]);
const[pageSize,setPageSzie]=useState<number>(10);
const [loading,setLoading]=useState<boolean>(false);
const[items,setItems]=useState<ILargeListServiceFile[]>([])

const service=useMemo(()=>{
return new ServiceClassLargeList(props.context)
},[props.context]);

//load first page

useEffect(()=>{
  loadPage();
},[pageSize]);
//real pnp pagination
const loadPage=async(paged?:any)=>{
 setLoading(true);
 const res=await service.getLargeListItemsOdata(pageSize,paged) ;
 setItems(res.items);
 setPagedObject(res.pageObject)
 setLoading(false);
}

//next page
const nextPage=async()=>{
  if(!pagedObject) return;
  setPrevPageStack(prev=>[...prev,pagedObject]);
  loadPage(pagedObject);
}

//previous page

const previousPage=async()=>{
  if(prevPageStack.length===0) return;
  const lastPaged=prevPageStack[prevPageStack.length-1];
  const updated=[...prevPageStack];
  updated.pop();
  setPrevPageStack(updated);
  loadPage(lastPaged);
}
return(
  <>
  {/* Page size */}
  <Dropdown
  label="Page Size"
  options={pageSizeOptions}
  selectedKey={pageSize}
  onChange={(_,opt)=>setPageSzie(opt?.key as any)}
  style={{width:200,marginBottom:20}}
  />
  {/* Pagination button */}
  <div style={{display:"flex", gap:10,marginBottom:20}}>

<PrimaryButton
text="⏮️ Previous"
disabled={prevPageStack.length===0}
onClick={previousPage}
/>
<PrimaryButton
text="Next ⏭️"
disabled={!pagedObject}
onClick={nextPage}
/>
  </div>

  <DetailsList
  items={items}
  compact
  />
  {loading&&<p>Loading....</p>}
  </>
)
}
export default LargeListCode;