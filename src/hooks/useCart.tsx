import { createContext, useEffect } from "react"
import { useState } from "react";
import { useContext, useCallback } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {toast} from "react-hot-toast";
import { product } from '../utils/product';
type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
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


    const handleRemoveProductFromCart = useCallback((product: CartProductType) =>{               // removing the product from the state
        if(cartProducts){
            const filterProducts = cartProducts.filter((item) => {
                return item.id !== product.id;
            })
            setCartProducts(filterProducts);
            toast.success("Product removed from cart");
            localStorage.setItem('usercartitems', JSON.stringify(filterProducts));             //persistent storage
            return filterProducts;
        }
    }, [cartProducts]);


    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 99){
            return toast.error("Maximum capacity reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts];
            const index = updatedCart.findIndex((item) => {
                return item.id === product.id;
            })
            if(index > -1){
                updatedCart[index].quantity += 1;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('usercartitems', JSON.stringify(updatedCart)); 
        } 
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1){
            return toast.error("Minimum reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts];
            const index = updatedCart.findIndex((item) => {
                return item.id === product.id;
            })
            if(index > -1){
                updatedCart[index].quantity -= 1;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('usercartitems', JSON.stringify(updatedCart)); 
        } 
    }, [cartProducts]);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease
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