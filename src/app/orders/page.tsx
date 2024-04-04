import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import getOrdersByUserId from "../../../actions/getOrdersByUserId";
import COrdersClient from "./COrdersClient";

const COrders = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return <NullData title="Access Denied"/>
    }
    const corders = await getOrdersByUserId(currentUser.id);
    if(!corders){
        return <NullData title="No Orders..."/>
    }
    return (  <div>
        <Container>
            <COrdersClient orders={corders}/>
        </Container>
    </div>);
}
export default COrders;