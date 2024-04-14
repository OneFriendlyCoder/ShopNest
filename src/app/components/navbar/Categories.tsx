"use client"

import Container from "../Container";
import { categories } from "@/utils/Categories";
import Category from "./Category";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage) return null;
    return (  
        <div className="bg-[#171717]">
            <Container>
                <div className="pt-4 pb-[30px] flex flex-row items-center justify-between">
                    {categories.map((item) => {
                        return (
                            <Category key={item.label} label={item.label} icon={item.icon} selected={category === item.label || (category === null && item.label === 'All') }/>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};
 
export default Categories;
