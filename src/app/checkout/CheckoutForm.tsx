"use client"

import { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FormatPrice } from '@/utils/formatPrice';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Button from '../components/Button';


interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm:React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {

    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const formattedPrice = FormatPrice(cartTotalAmount);

    useEffect(() => {
        if(!stripe) {return}
        if(!clientSecret) {return}
        handleSetPaymentSuccess(false); 
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!stripe || !elements){return}
        setIsLoading(true);
        const result = await stripe.confirmPayment({
            elements, redirect: 'if_required'
        })
        if(!result.error){
                toast.success('Payment Successful');            
                handleClearCart();              
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);           
            }
            setIsLoading(false);
        }


    return (  
        <form onSubmit={handleSubmit} id="payment-form">
            <div className='mb-6'>
                <Heading title="Enter your details to complete checkout" />
            </div>
            <h2 className='font-semibold mt-4 mb-2 text-gray-400'>Address Information</h2>
            <AddressElement options={{mode: 'shipping', allowedCountries: ["US", "Kenya"]}}/>

            <h2 className='font-semibold mt-4 mb-2 text-gray-400'>Payment Information</h2>
            <PaymentElement id="payment-element" options={{layout: "tabs"}}/>

            <div className='py-4 mt-6 text-center text-white text-4xl font-bold'>
                Total: {formattedPrice}
            </div>
            <Button label={isLoading ? 'Processing' : 'Pay Now'} disabled={isLoading || !stripe || !elements} onClick={()=>{handleSubmit}}/>      
        </form>
    );
}
  
export default CheckoutForm;