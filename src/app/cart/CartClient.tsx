"use client"

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { FormatPrice } from '../../utils/formatPrice';
import { SafeUser } from "../../../types";
import { useRouter } from "next/navigation";
import ItemContentsm from "./ItemContentsm";
interface CartClientProps{
    currentUser: SafeUser | null;
}

const CartClient:React.FC<CartClientProps> = ({currentUser}) => {
    
    const router = useRouter();
    const {cartProducts, handleClearCart, cartTotalAmount} = useCart();

    if(!cartProducts || cartProducts.length === 0){
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl text-white">Your cart is empty</div>
                <div>
                    <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack/>
                    <span className="text-gray-500">Start shopping</span>
                    </Link>
                </div>
            </div>
        )
    } 
    return (  
        <div>
            <Heading title="Shopping Cart" center/>
            <div className="md:hidden">
                <div>
                    {cartProducts && cartProducts.map((item) => {
                        return (<ItemContentsm key={item.id} item={item}/>)
                    })}
                </div>
            </div>

            <div className="hidden md:block">
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-10">
                    <div className="col-span-2 justify-self-start text-white">PRODUCT</div>
                    <div className="justify-self-center text-white">PRICE</div>
                    <div className="justify-self-center text-white">QUANTITY</div>
                    <div className="justify-self-end text-white">TOTAL</div>
                </div>
                <div>
                    {cartProducts && cartProducts.map((item) => {
                        return (<ItemContent key={item.id} item={item}/>)
                    })}
                </div>
            </div>

            
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4 mt-10">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={()=>{handleClearCart()}} small/>
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                        <div className="flex justify-between text-base font-semibold w-full text-white mb-[20px]">
                            <span>SubTotal</span>
                            <span>{FormatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="text-slate-500">Taxes and shipping calculated at checkout</p>
                        <Button label={currentUser ? 'Checkout':'Login to Checkout'} outline={currentUser ? false : true} onClick={()=>{currentUser ? router.push('/checkout'): router.push('/login')}}/>
                        <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2">
                            <MdArrowBack/>
                            <span>Continue shopping</span>
                        </Link>
                </div>
            </div>
        </div>
    );
}
 
export default CartClient;