'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push('/');
        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true });
        router.push(url);
        reset();
    }

    return (
        <div className="flex items-center">
            <input
                {...register('searchTerm')}
                autoComplete='off'
                type="text"
                placeholder='Explore'
                className="p-1 lg:p-2 w-[100px] md:w-[170px] border border-black rounded-full bg-[#242424] text-center focus:placeholder-transparent"
            />
            <button onClick={handleSubmit(onSubmit)} className="hover:text-yellow-500 w-[15px]  text-white p-2 rounded-r-md md:w-full md:h-full"><FaSearch size={18} /></button>
        </div>
    );
}

export default SearchBar;
