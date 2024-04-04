'use client'

import { Product } from "@prisma/client";
import {DataGrid} from '@mui/x-data-grid';
import { FormatPrice } from '../../../utils/formatPrice';
import { GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdClose, MdDone } from "react-icons/md";
interface ManageProductsClientProps{
    products: Product[];
}

const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {
    
    let rows: any = [];
    if(products){
        rows = products.map((product) => {
            return{
                id: product.id,
                name: product.name,
                description: product.description,
                price: FormatPrice(product.price),
                catergory: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            };
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Name', width:220},
        {field: 'price', headerName: 'Price(USD)', width:100, renderCell: (params) => {return(<div className="font-bold text-slate-800">{params.row.price}</div>)}},
        {field: 'category', headerName: 'Category', width:100},
        {field: 'inStock', headerName: 'InStock', width:100,  renderCell: (params) => {return(<div className="font-bold text-slate-800">{params.row.inStock === true ? <Status text="In stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700"/> : <Status text="out of stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700"/>}</div>)}},
        {field: 'brand', headerName: 'Brand', width:100},
        {field: 'action', headerName: 'Actions', width:200, renderCell: (params) => {return(<div>Action</div>)}},
        {field: 'images', headerName: 'Images', width:220},
    ]

    return (  
        <div className="m-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Products" center/>
            </div>
            <div style={{height: 600, width: "100%"}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection
                    />
            </div>
        </div>
    );
}
 
export default ManageProductsClient;