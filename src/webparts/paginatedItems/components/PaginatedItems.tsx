import * as React from 'react';
import {sp} from '@pnp/sp/presets/all'
import type { IPaginatedItemsProps } from './IPaginatedItemsProps';
import PaginatedItemsClass from '../../../CommonServiceApi/PaginatedServiceApi';
import { Table, Input } from 'antd';
const PaginatedItems :React.FC<IPaginatedItemsProps>=(props)=>{
  const [items,setItems]=React.useState<any[]>([]);
  const [searchtext,setSearchtext]=React.useState<string>('');

  React.useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});

PaginatedItemsClass.getPaginatedItems().then((response)=>setItems(response))
.catch((err)=>console.error('err',err));
  },[props.context]);

  const columns=[
    {
     title:"Name",
     dataIndex:"Title",
     key:"Title",
     sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||"")
    },
     {
     title:"Email Address",
     dataIndex:"EmailAddress",
     key:"EmailAddress",
     sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||"")
    },
    {
      title:"Age",
      dataIndex:"Age",
      key:"Age",
      sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0)
    },
    {
      title:"Admin",
      dataIndex:"Admin",
      key:"Admin",
      sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||"")
    },
    {
      title:"City",
      dataIndex:"City",
      key:"City",
      sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||"")
    }
  ]
//handle search
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchtext(e.target.value);
  }

  const filteredItems=items.filter((item)=>(
    item?.EmailAddress?.toLowerCase().includes(searchtext.toLowerCase())
    ||item?.Age?.toString().includes(searchtext)
    ||item?.Admin?.toLowerCase().includes(searchtext.toLowerCase())
    ||item?.City?.toLowerCase().includes(searchtext.toLowerCase()))
||item?.Title?.toLowerCase().includes(searchtext.toLowerCase())
)
  return(
    <>

    <Input placeholder='Search here' 
    style={{marginBottom:20} }
    value={searchtext} 
    onChange={handleSearch}/>
    <Table columns={columns} 
    dataSource={filteredItems}  
    pagination={{pageSize:5}}/>
    </>
  )
}
export default PaginatedItems ;
