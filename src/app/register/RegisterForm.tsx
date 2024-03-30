"use client"

import { FieldValue } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useState } from "react";
import { FieldValues,useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({defaultValues: {name:"", email: "",password:""}});
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }

    return (  
        <>
            <Heading title="SignUp"/>
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={()=>{}}/>
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <Button label={isLoading ? 'Loading' : 'SignUp'} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">Already have an account?
                <Link className="underline" href="/login"> Login</Link>
            </p>
        </>
    );
}
 
export default RegisterForm;