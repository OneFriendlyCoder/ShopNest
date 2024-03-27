"use client"
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { product } from '../../../utils/product';
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
interface ProductDetailsProps{
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: SelectedImgType,
    quantity: number,
    price: number,
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return (
        <hr className="w-[30%] my-2"></hr>
    )
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const {handleAddProductToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const router = useRouter();
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: {...product.images[0]},
        quantity: 1,
        price: product.price,
    })

    useEffect(()=>{
        setIsProductInCart(false);
        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item)=>item.id === product.id)
            if(existingIndex > -1){setIsProductInCart(true);}
        }
    },[cartProducts])

    const totalRatings = product.reviews.length;
    const totalRatingSum = totalRatings > 0 ? product.reviews.reduce((acc: number, item: any)=> item.rating + acc, 0): 0;
    const productRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

    // useCallback is being used in order to memoize function
    const handleColorSelect = useCallback((value: SelectedImgType)=>{
        setCartProduct((prev) => {
            return {...prev, selectedImage: value}
        })
    }, [cartProduct.selectedImage])


    const handleQtyIncrease = useCallback(()=>{
        if(cartProduct.quantity === 99) return
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity + 1}
        })
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(()=>{
        if(cartProduct.quantity === 1) return
        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity-1}
        })
    }, [cartProduct]);



    return (  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-dlate-500 text-sm">
                <h1 className="text-3xl font-medium text-slate-700">{product.name}</h1>
                <div className="flex items-center gap-2">
                    {productRating} Rating
                    <div>{product.reviews.length} Review</div>
                </div>
                <Horizontal />
                <div className="text-justify">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY: </span>{product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND: </span>{product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <Horizontal />
                {
                    isProductInCart? 
                    <>
                       <p className="mb-2 text-slate-500 flex items-center gap-1">
                            <MdCheckCircle size={20} className="text-teal-400"/>
                            <span>Product Added to Cart</span> 
                       </p> 
                       <div className="max-w-[300px]">
                        <Button label="View Cart" outline onClick={()=> router.push('/cart')}/>
                       </div>
                    </> 
                    : 
                    <>
                        <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect}/>
                        <Horizontal />
                        <SetQuantity cartProduct={cartProduct} handleQtyIncrease={handleQtyIncrease} handleQtyDecrease={handleQtyDecrease} />
                        <Horizontal />
                        <div className="max-w-[300px]"><Button label="Add to Cart" onClick={()=>handleAddProductToCart(cartProduct)}/></div>        {/* adding the cart product to the state */}
                    </>
                }
            </div>
        </div>
    );
}
 
export default ProductDetails;