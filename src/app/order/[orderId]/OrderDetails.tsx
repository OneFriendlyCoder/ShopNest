"use client";

import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";
import { FormatPrice } from "@/utils/formatPrice";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const router = useRouter();

    return (
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div className="mt-8">
                <Heading title="Order Details" />
            </div>
            <div>Order Id: {order.id}</div>
            <div>Total Amount: <span className="font-bold">{FormatPrice(order.amount)}</span></div>
            <div className="flex gap-2 items-center">
                <div>Payment Status:</div>
                <div>
                    {order.status === 'pending' ? 
                        <Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" /> 
                        :  order.status === 'complete' ? 
                        <Status text="Completed" icon={MdDone} bg="bg-green-200" color="text-green-700" /> :
                        <></>
                    }
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <div>Delivery Status:</div>
                <div>
                    {order.deliveryStatus === 'dispatched' ? 
                        <Status text="Dispatched" icon={MdDeliveryDining} bg="bg-slate-200" color="text-slate-700" /> 
                        :  order.deliveryStatus === 'delivered' ? 
                        <Status text="Delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" /> :
                        <></>
                    }
                </div>
            </div>

        </div>
    );
};

export default OrderDetails;
