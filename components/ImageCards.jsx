/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import { BsHeart } from "react-icons/bs";
import { useRouter } from "next/router";
import { Box, ImageList } from "@mui/material";

const ImageCards = ({ image, name, tags, id }) => {
  const router = useRouter();
  const handleClick = () => {
    window.open(`/photos/${id}`, '_blank');
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  
  console.log("Tags", tags);
  const getRandomHeight = () => {
    const minHeight = 250; // minimum height in pixels
    const maxHeight = 400; // maximum height in pixels
    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  };
  return (
    <div
      className="relative cursor-pointer my-2 group rounded-sm overflow-hidden shadow-md hover:shadow-lg border h-[400px]"
      // style={{ height: `${getRandomHeight()}px` }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/backgroundImage.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative  top-0 left-0 bg-gray-300 bg-opacity-16 p-4 w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-gray-900 font-medium">{name}</p>
      </div>
      <Image
        src={image}
        alt="Card Image"
        width={1000}
        height={500}
        className="transition-opacity absolute justify-center items-center flex object-contain duration-300 group-hover:opacity-85 "
      />

      <div className="absolute bottom-0 left-0 bg-gray-300 bg-opacity-16 p-4 w-full h-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tags &&
          tags[0].split(",").map((tag) => (
            <span
              key={tag}
              className="text-small bg-slate-300 rounded-md mr-1 px-2 py-1 "
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default ImageCards;
