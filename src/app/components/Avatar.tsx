import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
interface AvatarProps{
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    if(src){
        return (  
            <div>
                {src && (
                    <Image src={src} alt="Avatar" className="rounded-full" height="30" width="30"/>
                )}
            </div>
        );    
    }
    else {return <FaUserCircle size={24}/>}

}
 
export default Avatar;