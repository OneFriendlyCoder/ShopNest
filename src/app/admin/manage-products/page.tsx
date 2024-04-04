import ManageProductsClient from "./ManageProductsClient";
import Container from "@/app/components/Container";
import getProducts from "../../../../actions/getProducts";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/app/components/NullData";
const ManageProducts = async () => {

    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Access Denied"/>
    }

    return (  <div>
        <Container>
            <ManageProductsClient products={products}/>
        </Container>
    </div>);
}
export default ManageProducts;