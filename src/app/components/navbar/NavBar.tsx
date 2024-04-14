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
                        <div className="hidden md:flex md:flex-rows md:gap-5">
                            <FaInstagram size={23} className="hover:text-yellow-500"/>
                            <FaFacebook size={23} className="hover:text-yellow-500"/>
                            <BsTwitterX size={23} className="hover:text-yellow-500"/>
                        </div>
                        <div className="flex flex-rows">
                            <div className="w-[50px] h-[50px] md:w-[110px] md:h-[110px]">
                                <Image src="/logo.png" alt="ShopNest" width={100} height={100}/>
                            </div>
                            <Link href="/" className={`${merriweather.className} text-2xl hidden md:block mt-[20px] md:text-4xl md:mt-[32px]`}>ShopNest</Link>
                        </div>
                        <div className="flex items-center gap-2 md:gap-5">
                            <SearchBar />
                            <div className="hidden md:block"><CartCount/></div>
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