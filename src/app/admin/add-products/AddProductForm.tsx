"use client"
import Input from "@/app/components/inputs/input";
import Heading from "@/app/components/Heading";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import { categories } from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import { Colors } from "@/utils/Colors";
import SelectColor from "@/app/components/inputs/SelectColor";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import firebaseapp from "../../../../libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";



export type ImageType = {
    color: string, 
    colorCode: string,
    image: File | null
}

export type UploadedImageType = {
    color: string, 
    colorCode: string,
    image: string,                      //will be getting the url from the firebase storage
}

const AddProductForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>([]);
    const [isProductCreated, setIsProductCreated] = useState(false);
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

    useEffect(()=>{
        setCustomValue('images', images);   
    },[images])

    useEffect(()=>{
        if(isProductCreated)
        {
            reset();
            setImages(null)
            setIsProductCreated(false);
        }
    }, [isProductCreated])

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {            //this will update the category in the form value above
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]; 
            }
            return [...prev, value]
        });
    }, []);
    
    const removeImageFromState = useCallback((value: ImageType) =>{
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item: any) => item.color !== value.color)
                return filteredImages; 
            }
            return prev
        })
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        //upload images to firebase
        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = [];
        if(!data.category){
            setIsLoading(false);
            return toast.error("Category is not selected");
        }

        if(!data.images || data.images.length === 0){
            setIsLoading(false);
            return toast.error("No images");
        }

        const handleImageUploads = async () => {                        //uploading images to firebase
            toast('Creating Product, please wait...');
            try {
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storage = getStorage(firebaseapp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on('state_changed', 
                            (snapshot) => {
                              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                              console.log('Upload is ' + progress + '% done');
                              switch (snapshot.state) {
                                case 'paused':
                                  console.log('Upload is paused');
                                  break;
                                case 'running':
                                  console.log('Upload is running');
                                  break;
                              }
                            },
                            (error) => {
                                console.log('Error uploading image' + error);
                                reject(error)
                            },
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                uploadedImages.push({
                                    ...item,
                                    image: downloadURL,
                                })
                                console.log('File available at', downloadURL);
                                resolve();
                                }).catch((error) => {
                                    console.log('Error getting the downloadable URL', error);
                                    reject(error);
                                });
                              }
                            );
                        })
                    }
                }
            } catch (error) {
                setIsLoading(false);
                console.log('Error handling image uploads', error);
                toast.error("Error handling image uploads");
            }
        }

        await handleImageUploads();
        const productData = {...data, images: uploadedImages};
        

        //storing the product data in MongoDB
        axios.post('/api/product', productData).then(() => {
            toast.success("Product was created");
            setIsProductCreated(true);
            router.refresh();
        }).catch(err => {
            toast.error("Something went wrong")
        }).finally(() => {
            setIsLoading(false);
        })
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
           <div className="mb-2 font-semibold text-gray-400">Select a Category</div>
           <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto text-white">
                {categories.map((item) => {
                    if(item.label === 'All'){return null}
                    return <div key={item.label} className="col-span">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon}/>
                    </div>
                })}
           </div> 
           <div className="w-full flex flex-col flex-wrap gap-1 mt-4">
                <div className="font-bold text-gray-400">
                    Select color and upload their images
                </div>
                <div className="text-sm text-gray-400 m-[20px]">
                    You must upload an image for each of the color selected otherwise the color selection will be ignored
                </div>
                <div className="grid grid-cols-2 gap-3 text-gray-400">
                    {Colors.map((item, index) => {
                        return (
                            <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={false} />
                        )
                    })}
                </div>
           </div>
        </div>
        <Button label={isLoading ? 'Loading...' : 'Add Product...'} onClick={handleSubmit(onSubmit)}/>
    </>
    );
}
 
export default AddProductForm;