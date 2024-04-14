"use client"

import Container from "../Container";
import { categories } from "@/utils/Categories";
import Category from "./Category";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import BackDrop from "./BackDrop";


const Categories = () => {
    const [toggle, setToggle] = useState(false);
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage) return null;
    return (  
        <div className="bg-[#171717]">
            <Container>
                <div className="md:hidden ">
                    <button onClick={() => {setToggle((value) => !value)}} className="mt-[20px] mx-auto"><GiHamburgerMenu color="red"/></button>
                    {toggle && (
                        <div className="absolute rounded-md shadow-md w-[170px] bg-transparent overflow-hidden text-sm flex flex-col cursor-pointer">
                        {categories.map((item) => {
                            return (
                                <Category key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === 'All') }/>                            
                            );
                        })}
                        </div>
                    )}
                </div>
                <div className="hidden md:block">
                    <div className="pt-4 pb-[30px] items-center justify-between flex flex-rows">
                        {categories.map((item) => {
                            return (
                                <Category key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === 'All') }/>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </div>
    );
};
 
export default Categories;
