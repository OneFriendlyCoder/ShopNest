import Container from "../Container";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./Menu";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const merriweather = Merriweather({subsets: ['latin'], weight:['400']})

const Navbar = async () => {

    const currentUser = await getCurrentUser();

    return ( 
        <div className="sticky top-0 w-full bg-black text-white z-30 shadow-sm">
            <div className="py-[15px] md:py-[30px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <div className="flex flex-rows gap-5">
                            <FaInstagram size={23} className="hover:text-yellow-500"/>
                            <FaFacebook size={23} className="hover:text-yellow-500"/>
                            <BsTwitterX size={23} className="hover:text-yellow-500"/>
                        </div>
                        <div className="flex flex-rows">
                            <Image src="/logo.png" alt="ShopNest" width={100} height={100}/>
                            <Link href="/" className={`${merriweather.className} text-4xl mt-[32px]`}>ShopNest</Link>
                        </div>
                        <div className="flex items-center gap-8 md:gap-5">
                            <SearchBar />
                            <CartCount/>
                            <UserMenu currentUser={currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    );
}
 
export default Navbar;