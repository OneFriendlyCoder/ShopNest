interface MenuItemProps{
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItems: React.FC<MenuItemProps> = ({children, onClick}) => {
    return (  
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition text-slate-800">
            {children}
        </div>
    );
}
 
export default MenuItems;