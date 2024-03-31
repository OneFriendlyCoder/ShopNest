"use client"

import { FieldValue } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useState, useEffect } from "react";
import { FieldValues,useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "../../../types";

interface LoginFormProps{
    currentUser: SafeUser | null;
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {email:"", password:""}});
    const router = useRouter();

    useEffect(()=>{                 
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    },[])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
       setIsLoading(true);
       signIn('credentials', {
        ...data,
        redirect: false
       }).then((callback)=>{
        setIsLoading(false);
        if(callback?.ok){
            router.push('/cart');
            router.refresh();
            toast.success("Logged In");
        }
        if(callback?.error){
            toast.error(callback.error);
        }
       }); 
    }
    if(currentUser){
        return (<p>Already Logged In. Redirecting...</p>)
    }
    return (  
        <>
            <Heading title="SignIn"/>
            <Button outline label="Continue with Google" icon={AiOutlineGoogle} onClick={()=>{}}/>
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <Button label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">Don't have an account?
                <Link className="underline" href="/register"> Sign Up</Link>
            </p>
        </>
    );
}
 
export default LoginForm;