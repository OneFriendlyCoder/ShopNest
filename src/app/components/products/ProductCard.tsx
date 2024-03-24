"use client"

import Image from "next/image";

interface ProductCardProps{
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({data}) => {
    return (  
        <div className="col-span-1 cursor-pointer border-[1.2px] border-white bg-white rounded-sm p-2 transition hover:scale-105 text-center text-sm">
            <div className="flex elex-col item-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image className="w-full h-full object-contain" alt={data.name} fill src={data.images[0].image}/>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
 
export default ProductCard;