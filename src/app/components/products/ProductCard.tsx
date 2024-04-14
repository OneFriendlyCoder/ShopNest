"use client"
import { useState } from "react";
import Image from "next/image";
import { TruncateText } from "@/utils/truncatestring";
import { FormatPrice } from "@/utils/formatPrice";
import { Rating } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Category from '../navbar/Category';
import { categories } from '@/utils/Categories';
import { Button } from "@/components/ui/button";


interface ProductCardProps{
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {  
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const totalRatings = data.reviews.length;
    const totalRatingSum = totalRatings > 0 ? data.reviews.reduce((acc: number, item: any)=> item.rating + acc, 0): 0;
    const productRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-[30px] col-span-1 cursor-pointer shadow bg-[#171717] rounded-lg p-2 text-center text-sm hover:scale-105 transition duration-200 hover:shadow-[0_0_20px_0_rgba(0,0,0,0.3)]"
        >
            <div className="flex flex-col items-center w-full gap-1 h-[500px]">
                <div className="aspect-square overflow-hidden relative w-full h-full mt-[10px] bg-[#0F0F0F]">
                    <Image className="w-full h-full object-contain" alt={data.name} fill src={data.images[0].image} />
                    {isHovered && (
                        <Button variant="sexy" className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10" onClick={() => router.push(`/product/${data.id}`)}>
                            Quick View
                        </Button>
                    )}
                </div>
                <div className="mt-4 text-gray-600">{data.category}</div>
                <div className="text-2xl text-slate-300 font-serif">{TruncateText(data.name)}</div>
                <div className="semi-bold mb-[10px] text-2xl font-mono text-yellow-400">{FormatPrice(data.price)}</div>
                {isHovered && (
                    <div className="text-white grid grid-cols-1 gap-3 mb-[10px]">
                        <div>
                            {productRating} Ratings
                        </div>
                        <div>{data.reviews.length} Reviews</div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default ProductCard;
