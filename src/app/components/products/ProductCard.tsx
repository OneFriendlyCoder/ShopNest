"use client"

import Image from "next/image";
import { TruncateText } from "@/utils/truncatestring";
import { FormatPrice } from "@/utils/formatPrice";
import { Rating } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface ProductCardProps{
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {  

    const router = useRouter();

    const totalRatings = data.reviews.length;
    const totalRatingSum = totalRatings > 0 ? data.reviews.reduce((acc: number, item: any)=> item.rating + acc, 0): 0;
    const productRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;
    return (  
        <div onClick={()=>router.push(`/product/${data.id}`)} className="col-span-1 cursor-pointer border-[1.2px] border-white bg-white rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image className="w-full h-full object-contain" alt={data.name} fill src={data.images[0].image}/>
                </div>
                <div className="mt-4">
                    {TruncateText(data.name)}
                </div>
                <div>
                    {productRating} Ratings
                </div>
                <div>{data.reviews.length} Reviews</div>
                <div className="semi-bold">{FormatPrice(data.price)}</div>
            </div>
        </div>
    );
}
 
export default ProductCard;
