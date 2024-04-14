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
                    <Image src={src} alt="Avatar" className="rounded-full" height="40" width="40"/>
                )}
            </div>
        );    
    }
    else {return <FaUserCircle size={30}/>}

}
 
export default Avatar;