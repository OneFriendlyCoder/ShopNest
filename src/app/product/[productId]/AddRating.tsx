"use client"

import { Review, Product, Order } from "@prisma/client"
import { SafeUser } from "../../../../types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {FieldValues, useForm} from "react-hook-form"
import { SubmitHandler } from "react-hook-form";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
interface AddRatingProps{
    product: Product & {
        reviews: Review[];
    };
    user:(SafeUser) & {
        orders: Order[]
    } | null;
}


const AddRating:React.FC<AddRatingProps> = ({product, user}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0,
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
    }

    return (  
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Rate this product"/>
            <Rating onChange={(event, newValue) => {
                setCustomValue('rating', newValue);
            }}/>
            <Input id="comment" label="Comment" disabled={isLoading} register={register} errors={errors} required/>
            <Button label={isLoading ? 'Loading' : 'Rate Product'} onClick={handleSubmit(onSubmit)}/>
        </div>
    );
}
 
export default AddRating;