"use client"

import { IconType } from "react-icons";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import queryString from 'query-string';



interface CategoryProps{
    label: string,
    icon: IconType,
    selected?: boolean,
}

const Category:React.FC<CategoryProps> = ({label, icon:Icon, selected}) => {
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        if(label === 'All'){router.push('/')}
        else{
            let currentQuery = {};
            if(params){
                currentQuery = queryString.parse(params.toString());
            }
            const updatedQuery:any = {
                ...currentQuery,
                category: label
            }
            const url = queryString.stringifyUrl({
                url: '/',
                query: updatedQuery
            },{
                skipNull: true
            })
            router.push(url);
        }
    },[label, params, router])
    return (  
        <div onClick={handleClick} className={`flex items-center justify-center text-center gap-1 p-2 hover:text-slate-300 transition cursor-pointer ${selected ? ' text-yellow-500' : 'border-transparent text-slate-700'}`}>
            <Icon size={20}/>
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
}
 
export default Category;