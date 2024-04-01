import { createContext, useEffect } from "react"
import { useState } from "react";
import { useContext, useCallback } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {toast} from "react-hot-toast";
import { product } from '../utils/product';
import { setPriority } from "os";
type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent : string | null;
    handleSetPaymentIntent: (val: string|null) => void;
};

interface Props{
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);
export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);


    useEffect(()=>{
        const cartItems: any = localStorage.getItem('usercartitems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        const ShopNestPaymentIntent: any = localStorage.getItem('ShopNestPaymentIntent');           //getting payment_intent from the local storage
        const paymentIntent: string | null = JSON.parse(ShopNestPaymentIntent);
        setCartProducts(cProducts);
        setPaymentIntent(paymentIntent);
    },[])

    useEffect(()=>{                                                     // calculating the total amount and qty of items
        const getTotals = () =>{
            if(cartProducts){
                const {total, qty} = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                },{
                    total: 0,
                    qty: 0
                });
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals();
    },[cartProducts])

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

    const handleClearCart = useCallback(() =>{
        setCartProducts(null);
        setCartTotalQty(0);
        setCartTotalAmount(0);
        localStorage.setItem('usercartitems', JSON.stringify(null)); 
    },[cartProducts]);

    const handleSetPaymentIntent = useCallback((val: string|null) => {              //will set the payment intent
        setPaymentIntent(val);
        localStorage.setItem('ShopNestPaymentIntent', JSON.stringify(val));
    },[paymentIntent])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        paymentIntent,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        handleSetPaymentIntent,
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