"use client"

import { FieldValue } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useState, useEffect } from "react";
import { FieldValues,useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../../types";

interface RegisterPageProps{
    currentUser: SafeUser | null;
}


const RegisterForm:React.FC<RegisterPageProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {name:"", email: "",password:""}});
    const router = useRouter();

    useEffect(()=>{                 
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    },[])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data).then(()=>{
            toast.success('Account created')
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback)=>{
                if(callback?.ok){
                    router.push('/cart');
                    router.refresh();
                    toast.success("Logged In")
                }
                if(callback?.error){
                    toast.error(callback.error);
                }
            })
        }).catch(()=>{toast.error("Something went wrong")}).finally(() => {setIsLoading(false)});
    }
    if(currentUser){
        return (<p className="text-gray-500">Already Logged In. Redirecting...</p>)
    }
    return (  
        <>
            <Heading title="SignUp"/>
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={()=>{signIn('google')}}/>
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <Button label={isLoading ? 'Loading' : 'SignUp'} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm text-white">Already have an account?
                <Link className="underline" href="/login"> Login</Link>
            </p>
        </>
    );
}
 
export default RegisterForm;