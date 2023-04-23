/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import { BsHeart } from "react-icons/bs";
import {useRouter} from 'next/router'; 
import { Box, ImageList } from "@mui/material";

const ImageCards = ({ image, name, tags,id }) => {
  const router = useRouter();
  const handleClick = ()=>{
    router.push(`/photos/${id}`); 
  }
  console.log("Tags", tags);
  const getRandomHeight = () => {
    const minHeight = 250; // minimum height in pixels
    const maxHeight = 400; // maximum height in pixels
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  };
  return (
    <div
      className="relative my-2 group rounded-sm overflow-hidden shadow-md hover:shadow-lg border"
      style={{ height: `${getRandomHeight()}px` }}
      onClick={handleClick}
    >
      <Image
        src={image}
        alt="Card Image"
        width={300}
        height={300}
        objectFit="cover"
        layout="responsive"
        className="transition-opacity duration-300 group-hover:opacity-85 group-hover:bg-gray-200"
      />
      <div className="absolute bg-gray-200 w-full top-0 left-0 p-4 mt-1  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="">{name}</p>
      </div>

      <div className="absolute bottom-0 left-0 bg-gray-300 bg-opacity-30 p-4 w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tags &&
          tags[0].split(",").map((tag) => (
            <span key={tag} className="text-small bg-slate-300 rounded-md mr-1 px-2 py-1 ">
              {tag}
            </span>
          ))}
      </div>
    </div>
   
  );
};

export default ImageCards;
