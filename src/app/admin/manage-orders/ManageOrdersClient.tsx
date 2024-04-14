'use client'

import { Order, User } from "@prisma/client";
import {DataGrid} from '@mui/x-data-grid';
import { FormatPrice } from '../../../utils/formatPrice';
import { GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

type ExtendedOrder = Order & {
    user: User
}

interface ManageOrdersClientProps{
    orders: ExtendedOrder[];
}

const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {
    const router = useRouter();
    let rows: any = [];
    if(orders){
        rows = orders.map((order) => {
            return{
                id: order.id,
                customer: order.user.name,
                amount: FormatPrice(order.amount /100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220, renderCell: (params) => {return(<div className="font-bold text-white">{params.row.id}</div>)}},
        {field: 'customer', headerName: 'Customer Name', width:130, renderCell: (params) => {return(<div className="font-bold text-white">{params.row.customer}</div>)}},
        {field: 'amount', headerName: 'Amount(USD)', width:130, renderCell: (params) => {return(<div className="font-bold text-white">{params.row.amount}</div>)}},

        {
            field: 'deliveryStatus',
            headerName: 'Delivery Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className="font-bold">
                        {params.row.deliveryStatus === 'pending' ? (
                            <Status text="Pending" icon={MdAccessTimeFilled}  color="text-slate-500"/>
                        ) : params.row.deliveryStatus === 'dispatched' ? (
                            <Status text="Dispatched" icon={MdDeliveryDining} color="text-purple-700"/>
                        ) : params.row.deliveryStatus === 'delivered' ? (
                            <Status text="Delivered" icon={MdDone} color="text-green-700"/>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            }
        },

        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className="font-bold">
                        {params.row.paymentStatus === 'pending' ? (
                            <Status text="Pending" icon={MdAccessTimeFilled} color="text-slate-500"/>
                        ) : params.row.paymentStatus === 'complete' ? (
                            <Status text="Completed" icon={MdDone} color="text-green-700"/>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            }
        },
        
        {field: 'date', headerName: 'Date', width: 130, renderCell: (params) => {return(<div className="font-bold text-white">{params.row.date}</div>)}},

        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full mt-[10px]">
                        <ActionBtn icon={MdDeliveryDining} onClick={() => handleDispatch(params.row.id)} />
                        <ActionBtn icon={MdDone} onClick={() => handleDeliver(params.row.id)} />
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/order/${params.row.id}`)} />
                    </div>
                );
            }
        }
        

    ]

    const handleDispatch = useCallback((id: String) => {
        axios.put('/api/order',{
            id,
            deliveryStatus: 'dispatched'
        }).then((res)=>{
            toast.success('Order Dispatched')
            router.refresh();
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }, [])

    const handleDeliver = useCallback((id: String) => {
        axios.put('/api/order',{
            id,
            deliveryStatus: 'delivered'
        }).then((res)=>{
            toast.success('Order Delivered')
            router.refresh();
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }, [])
 


    return (  
        <div className="m-w-[1150px] m-auto text-xl mt-[30px]">
            <div className="mb-[50px]">
                <Heading title="Manage Orders" center/>
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
                    disableRowSelectionOnClick
                    />
            </div>
        </div>
    );
}
 
export default ManageOrdersClient;