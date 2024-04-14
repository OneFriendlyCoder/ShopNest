import { IconType } from "react-icons";

interface AdminNavItemsProps{
    selected? : boolean;
    icon: IconType;
    label: string;
}
const AdminNavItem: React.FC<AdminNavItemsProps> = ({selected, icon: Icon, label}) => {
    return (  
        <div className={`flex items-center justify-center text-center gap-1 p-2 hover:text-slate-400 transition cursor-pointer ${selected? ' text-yellow-500':'border-transparent text-slate-700'}`}>
            <Icon size={20}/>
            <div className="font-medium text-sm text-center break-normal">{label}</div>
        </div>
    );
}
 
export default AdminNavItem;