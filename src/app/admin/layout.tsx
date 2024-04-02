import AdminNavbar from "../components/admin/AdminNavbar";

export const metadata = {
    title: 'Shopnest admin',
    description: 'Shopnest admin page'
}

const AdminLayout = ({children}:{children: React.ReactNode}) => {
    return (  
        <div>
            <div><AdminNavbar/></div>
            {children}
        </div>
    );
}
 
export default AdminLayout;