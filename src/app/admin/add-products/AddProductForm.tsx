"use client"
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/Heading";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import { categories } from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue, watch, reset,formState:{errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            images: [],
            brand: "",
            inStock: false,
        },
    });
    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {            //this will update the category in the form value above
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    return (  
    <>
        <Heading title="Add a Product" center/>
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="price" label="Price" disabled={isLoading} register={register} errors={errors} type="number" required/>
        <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required/>
        <TextArea id="description" label="Description" disabled={isLoading} register={register} errors={errors} required/>
        <CustomCheckBox id="inStock" register={register} label="This product is in Stock"/>
        <div className="w-full font-medium">
           <div className="mb-2 font-semibold">Select a Category</div>
           <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => {
                    if(item.label === 'All'){return null}
                    return <div key={item.label} className="col-span">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon}/>
                    </div>
                })}
           </div> 
        </div>
    </>
    );
}
 
export default AddProductForm;