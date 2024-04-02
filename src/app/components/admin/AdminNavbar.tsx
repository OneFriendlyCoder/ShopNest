"use client"

import Container from "../Container";
import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
const AdminNavbar = () => {

    const pathname = usePathname();

    return (  
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href="/admin">
                        <AdminNavItem label="Summary" icon={MdDashboard} selected={pathname === '/admin'}/>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
 
export default AdminNavbar;