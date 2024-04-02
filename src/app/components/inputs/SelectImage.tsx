"use client"

import { ImageType } from "@/app/admin/add-products/AddProductForm"
import {useDropzone} from "react-dropzone"

interface SelectImageProps{
    item?: ImageType,
    handleFileChange: (value: File) => void
}

const SelectImage: React.FC<SelectImageProps> = ({item, handleFileChange}) => {
    const onDrop = useCallback(() => {

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (
        <div>
            
        </div>
    )
}

export default SelectImage;