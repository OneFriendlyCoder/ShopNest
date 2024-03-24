import Container from "../Container";
import Link from "next/link";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({subsets: ['latin'], weight:['400']})

const Navbar = () => {
    return ( 
        <div className="sticky top-0 w-full bg-gray-700 text-white z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href="/" className={`${merriweather.className} font-bold text-4xl`}>ShopNest</Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <div>Cart Count</div>
                            <div>User Menu</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
 
export default Navbar;