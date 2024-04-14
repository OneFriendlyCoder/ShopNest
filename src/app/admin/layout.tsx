import AdminNavbar from "../components/admin/AdminNavbar";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import NullData from "../components/NullData";
export const metadata = {
    title: 'Shopnest admin',
    description: 'Shopnest admin page'
}

const AdminLayout = async ({children}:{children: React.ReactNode}) => {
    const currentUser = await getCurrentUser();
    if(currentUser && currentUser?.role !== 'ADMIN'){
        return (
            <NullData title="Access Denied :(" />
        )
    }else{
        return (  
            <div>
                <div><AdminNavbar/></div>
                {children}
            </div>
        );
    }
}
 
export default AdminLayout;