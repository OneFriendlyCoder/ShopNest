"use client"
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import Link from "next/link";
import MenuItems from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "../../../../types";


interface UserMenuProps{
    currentUser: SafeUser | null ;
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = currentUser?.role === "ADMIN";
    const toggleOpen = useCallback(() => {
        setIsOpen((prev)=> !prev);
    }, [])
    return (  
    <>
        <div className="relative z-30">
            <div onClick={toggleOpen} className="p-2 flex flex-row gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 hover:text-slate-300">
                <Avatar src={currentUser?.image}/>
            </div>

            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                    {currentUser ?<div>
                        <Link href="/orders">
                            <MenuItems onClick={toggleOpen}>Your Orders</MenuItems>
                        </Link>
                        {
                            isAdmin && (
                                <Link href="/admin">
                                <MenuItems onClick={toggleOpen}>Admin Dashboard</MenuItems>
                            </Link>
                            )
                        }
                    <hr/>
                        <MenuItems onClick={()=>{toggleOpen(); signOut();}}>Signout</MenuItems>
                    </div> :                     
                    <div>
                        <Link href="/login">
                            <MenuItems onClick={toggleOpen}>Login</MenuItems>
                        </Link>
                        <Link href="/register">
                            <MenuItems onClick={toggleOpen}>SignUp</MenuItems>
                        </Link>
                    </div>}
 
                </div> 
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </>
    );
}
 
export default UserMenu;