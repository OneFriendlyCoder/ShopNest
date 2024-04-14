import getProducts from "../../../actions/getProducts";
import Summary from "./Summary";
import getOrders from "../../../actions/getOrders";
import getUsers from "../../../actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "../../../actions/getGraphData";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import NullData from "../components/NullData";
const Admin = async () => {
    const currentUser = await getCurrentUser();
    const products = await getProducts({category: null});
    const orders = await getOrders();
    const users = await getUsers();
    const graphData = await getGraphData();
    if(currentUser?.role === 'ADMIN'){
        return (  
            <div className="p-8">
                <Container>
                    <Summary products={products} users={users} orders={orders}/>
                    <div className="mt-[30px] mx-auto max-w-[1150px]">
                        <BarGraph data={graphData}/>
                    </div>
                </Container>    
            </div>);        
    }else{
        return(
           <NullData title="Access Denied :("/>
        )
    }
}
 
export default Admin;