"use client"

import Heading from "@/app/components/Heading";
import moment from "moment";
import Avatar from "@/app/components/Avatar";
interface ListRatingProps{
    product: any;
}

const ListRating: React.FC<ListRatingProps> = ({product}) => {
        if(product.reviews.length === 0) {return null}
    return (  
        <div>   
            {product?.reviews.length !== 0 && <Heading title="Product Review" />}
            <div className="text-sm mt-2">
                {product?.reviews && product?.reviews.map((review: any)=>{
                    return <div key={review.id} className="max-w-300px">
                        <div className="flex gap-2 items-center">
                            <Avatar src={review?.user.image}/>
                            <div className="font-semibold">{review?.user.name}</div>
                            <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                        </div>
                        <div className="font-semibold mt-2">{review.rating} Ratings</div>
                        <div>{review.comment}</div>
                        <hr className="mt-4 mb-4"></hr>
                    </div>
                })}
            </div>
        </div>
    );
}
 
export default ListRating;