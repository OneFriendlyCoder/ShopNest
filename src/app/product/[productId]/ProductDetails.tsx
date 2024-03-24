"use client"

interface ProductDetailsProps{
    product: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    return (  
        <div>Product Details</div>
    );
}
 
export default ProductDetails;