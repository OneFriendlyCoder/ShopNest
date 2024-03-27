import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";
import ListRating from "./ListingRating";
interface IParams{
    productId?: string;                                                 //optional productId
}

const Product = ({params}:{params:IParams}) => {                        //from this we can access the dynamic ids of params
    
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col mt:20 gap-4">
                    <div>Add Rating</div>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
    );
}
 
export default Product;