"use client"

interface ProductDetailsProps{
    product: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const totalRatings = product.reviews.length;
    const totalRatingSum = totalRatings > 0 ? product.reviews.reduce((acc: number, item: any)=> item.rating + acc, 0): 0;
    const productRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;
    return (  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                Images
            </div>
            <div className="flex flex-col gap-1 text-dlate-500 text-sm">
                <h1 className="text-3xl font-medium text-slate-700">{product.name}</h1>
                <div className="flex items-center gap-2">
                    {productRating} Rating
                    <div>{product.reviews.length} Review</div>

                </div>
            </div>
        </div>
    );
}
 
export default ProductDetails;