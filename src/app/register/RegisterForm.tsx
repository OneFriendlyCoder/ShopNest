"use client"

import { FieldValue } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { useState } from "react";
import { FieldValues,useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({});
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }
    
    return (  
        <>
            <Heading title="SignUp"/>
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <Button label={isLoading ? 'Loading' : 'SignUp'} onClick={handleSubmit(onSubmit)}/>
        </>
    );
}
 
export default RegisterForm;