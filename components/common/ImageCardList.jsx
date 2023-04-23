/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import {useRouter} from 'next/router'; 
import { Box, ImageList, ImageListItem } from "@mui/material";

const ImageCard = ({ image }) => {
  const router = useRouter();
  const handleClick = ()=>{
    router.push(`/photos/${image?._id}`); 
  }
  return (
    <motion.div
      className=" border overflow-hidden rounded-md shadow-md transition-shadow duration-400 transform hover:shadow-2xl hover:shadow-gray-500 hover:cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="bg-gray-500 flex items-center justify-center">
        <h2 className="text-white text-md font-bold">{image?.imageName}</h2>
      </div>
      <img
        className="w-full h-auto"
        src={`${image?.imageUrl}?w=248&fit=crop&auto=format`}
        srcSet={`${image.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={image.imageName}
        loading="lazy"
      />
      <div className="bg-gray-100 flex items-center justify-center py-2 mt-3">
        {image?.tags[0].split(",").map((tag) => (
            <span
              key={tag}
              className="text-small bg-purple-100 rounded-md mr-1 px-2 py-1 "
            >
              {tag}
            </span>
          ))}
      </div>
    </motion.div>
  );
};

const ImageCardList = ({ images }) => {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {images?.map((image) => (
        <ImageListItem key={image._id}>
          <ImageCard image={image} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageCardList;
