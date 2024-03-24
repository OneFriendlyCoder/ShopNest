import { MdFacebook } from "react-icons/md";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return ( 
        <footer className="bg-gray-700 text-white text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h1 className="text-2xl font-bold mb-2">Shop Categories</h1>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktop</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h1 className="text-2xl font-bold mb-2">Customer Service</h1>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Shipping Policy</Link>
                        <Link href="#">Returns & Exchanges</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>
                    <FooterList>
                        <h1 className="text-2xl font-bold mb-2">Follow us</h1>
                        <div className="flex gap-2">
                            <Link href="#"><MdFacebook size={24}/></Link>
                            <Link href="#"><AiFillTwitterCircle size={24}/></Link>
                            <Link href="#"><AiFillInstagram size={24}/></Link>
                            <Link href="#"><AiFillYoutube size={24}/></Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
            
        </footer>
    );
}

export default Footer