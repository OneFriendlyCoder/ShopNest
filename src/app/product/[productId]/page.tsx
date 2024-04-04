import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/utils/dummydata";
import ListRating from "./ListRating";
import getProductById from "../../../../actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
interface IParams{
    productId?: string;                                                 //optional productId
}

const Product = async ({params}:{params:IParams}) => {                        //from this we can access the dynamic ids of params
    const product = await getProductById(params);
    const user = await getCurrentUser();
    if(!product) {return <NullData title="Given Product does not exist"/>}
    return (  
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col mt:20 gap-4">
                    <AddRating product={product} user={user} />
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
    );
}
 
export default Product;