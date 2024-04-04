import Container from "../Container";
import Link from "next/link";
import { Merriweather } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./Menu";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
const merriweather = Merriweather({subsets: ['latin'], weight:['400']})

const Navbar = async () => {

    const currentUser = await getCurrentUser();

    return ( 
        <div className="sticky top-0 w-full bg-gray-700 text-white z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href="/" className={`${merriweather.className} font-bold text-4xl`}>ShopNest</Link>
                        <div className="hidden md:block"><SearchBar /></div>
                        <div className="flex items-center gap-8 md:gap-12">
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