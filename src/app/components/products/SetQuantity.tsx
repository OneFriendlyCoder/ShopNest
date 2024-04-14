"use client"

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps{
    cartCounter?: boolean,
    cartProduct: CartProductType,
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnstyles = 'border-[1.2px] border-slate-300 px-2 rounded text-white'

const SetQuantity: React.FC<SetQtyProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
    return (  
        <div className="flex gap-8 items-center">
            {cartCounter ? null: <div className="font-semibold text-gray-500">QUANTITY:</div>}
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQtyDecrease} className={btnstyles}>-</button>  {/* handleQtyIncrease is directly used as the event handler and no additional logic or argument is required for the funciton to execute */}
                <div className="text-white">{cartProduct.quantity}</div>
                <button onClick={handleQtyIncrease} className={btnstyles}>+</button>
            </div>
        </div>
    );
}
 
export default SetQuantity;