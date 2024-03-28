import { createContext, useEffect } from "react"
import { useState } from "react";
import { useContext, useCallback } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {toast} from "react-hot-toast";
type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;

};

interface Props{
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);
export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(()=>{
        const cartItems: any = localStorage.getItem('usercartitems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        setCartProducts(cProducts);
    },[])

    const handleAddProductToCart = useCallback((product: CartProductType) =>{               // adding the product to the state
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev];
                updatedCart.push(product);
            }else{
                updatedCart = [product];
            }
            toast.success("Product added to cart");
            localStorage.setItem('usercartitems', JSON.stringify(updatedCart));             //persistent storage
            return updatedCart;
        })
    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }
    return <CartContext.Provider value={value} {...props}/>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(context === null){
        throw new Error("useCart must be used within a cart context provider")
    }
    return context;
}