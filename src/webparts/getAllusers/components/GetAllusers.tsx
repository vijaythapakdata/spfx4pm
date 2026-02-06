import * as React from 'react';
// import styles from './GetAllusers.module.scss';
import type { IGetAllusersProps } from './IGetAllusersProps';
import { useState,useCallback} from 'react';
import { IUserInfo } from '../../../CommonMethod/IFunctionalFormState';
import { DetailsList,PrimaryButton,SearchBox,Spinner } from '@fluentui/react';

const  GetAllusers:React.FC<IGetAllusersProps>=(props)=>{
  const [users,setUsers]=useState<IUserInfo[]>([]);
  const [search,setSearch]=useState<string>('');
  const [nextLink,setNextLink]=useState<string|null>(null);
  const [loading,setLoading]=useState<boolean>(false);

  const getUsers=useCallback(async(url?:string)=>{
    setLoading(true);
    const client=await props.graphClient.getClient("3");
    const response=url? await client.api(url).get():await client.api("/users")
    .version("v1.0")
    .select("id,displayName,mail,department,jobTitle").top(50)
    .get();
    const list:IUserInfo[]=response.value.map((u:any)=>({
      id:u.id,
      displayName:u.displayName,
      mail:u.mail,
      jobTitle:u.jobTitle,
      department:u.department
    }));
    setUsers(list);
    setNextLink(response['@odata.nextLink']||null);
    setLoading(false);
    setLoading(false)
  },[props.graphClient]);

  const  nextPage=()=>{
    if(nextLink) getUsers(nextLink);
  }
  const filteredItems=users.filter(u=>u?.displayName?.toLowerCase().includes(search.toLowerCase())
||u?.mail?.toLowerCase().includes(search.toLowerCase())
||u?.department?.toLowerCase().includes(search.toLowerCase())
||u?.jobTitle?.toLowerCase().includes(search.toLowerCase())
);

  return(
    <>
    <PrimaryButton
    text='Get Users'
    onClick={()=>getUsers()}
    iconProps={{iconName:'people'}}
    />
    <br/>
    <SearchBox
    placeholder='search here...'
    value={search}
    onChange={(_,val)=>setSearch(val||'')}
    style={{width:300,marginTop:20}}
    />
    {loading&&<Spinner label='loading...'/>}
    {/* Detalist */}
    <DetailsList
    items={filteredItems}
    />
    {/* Next button */}
    {nextLink&&(
      <PrimaryButton
      text='Next Page'
      onClick={nextPage}
      style={{marginTop:10}}
      iconProps={{iconName:'next'}}
      />
    )}
    </>
  )
}
export default  GetAllusers;
