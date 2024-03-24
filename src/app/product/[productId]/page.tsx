import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";

interface IParams{
    productId?: string;                                                 //optional productId
}

const Product = ({params}:{params:IParams}) => {                        //from this we can access the dynamic ids of params
    
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
            </Container>
        </div>
    );
}
 
export default Product;