"use client"
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev)=> !prev);
    }, [])
    return (  
    <>
        <div className="relative z-30">
            <div onClick={toggleOpen} className="p-2 border-[1px] border-red-400 flex flex-row gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 bg-white">
                <Avatar />
                <AiFillCaretDown />
            </div>
            {isOpen && (
                <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                    <div>
                        <Link href="/orders">
                            <MenuItems onClick={toggleOpen}>Your Orders</MenuItems>
                        </Link>
                        <Link href="/admin">
                            <MenuItems onClick={toggleOpen}>Admin Dashboard</MenuItems>
                        </Link>
                        <MenuItems onClick={()=>{toggleOpen(); signOut();}}>Signout</MenuItems>
                    </div>
                    <div>{/* display these links dynamically based on whether the user is login or not */}
                        <Link href="/login">
                            <MenuItems onClick={toggleOpen}>Login</MenuItems>
                        </Link>
                        <Link href="/register">
                            <MenuItems onClick={toggleOpen}>SignUp</MenuItems>
                        </Link>
                    </div> 
                </div> 
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </>
    );
}
 
export default UserMenu;