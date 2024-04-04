import Container from "@/app/components/Container";
import { Order } from '@prisma/client';
import getOrderById from "../../../../actions/getOrderById";
import OrderDetails from "@/app/order/[orderId]/OrderDetails";
import NullData from "@/app/components/NullData";

interface IParams{
    orderId?: string;                                                
}

const Order1 = async ({params}:{params:IParams}) => {                      
    const order = await getOrderById(params);
    if(!order) return <NullData title="No order"/>
    return (  
        <div className="p-8">
            <Container>
                <OrderDetails order={order}/>

            </Container>
        </div>
    );
}
 
export default Order1;