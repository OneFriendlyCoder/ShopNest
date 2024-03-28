import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/utils/dummydata";
import ListRating from "./ListRating";
interface IParams{
    productId?: string;                                                 //optional productId
}

const Product = ({params}:{params:IParams}) => {                        //from this we can access the dynamic ids of params
    const product = products.find((item)=>item.id === params.productId);
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