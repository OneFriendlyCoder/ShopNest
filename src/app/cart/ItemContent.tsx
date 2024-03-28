"use client"

import { FormatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { TruncateText } from "@/utils/truncatestring";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
interface ItemContentProps{
    item: CartProductType
}

const ItemContent: React.FC<ItemContentProps> = ({item}) => {
    const {handleRemoveProductFromCart} = useCart();
    return (  
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`} />
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.selectedImage.image} alt={item.name} fill className="object-contain"/>
                </div>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`}>{TruncateText(item.name)}</Link>
                    <div>{item.selectedImage.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={()=>handleRemoveProductFromCart(item)}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{FormatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity cartCounter={true} cartProduct={item} handleQtyDecrease={()=>{}} handleQtyIncrease={()=>{}}/>
            </div>
            <div className="justify-self-end font-semibold">
                {FormatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}
 
export default ItemContent;