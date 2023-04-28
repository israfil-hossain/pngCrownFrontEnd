/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Box, ImageList, ImageListItem } from "@mui/material";

const ImageCard = ({ image }) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  const router = useRouter();
  // const handleClick = () => {
  //   router.push(`/photos/${image?._id}`);
  // };
  const handleClick = () => {
    window.open(`/photos/${image?._id}`, '_blank');
  }
  return (
    <motion.div
      onContextMenu={handleContextMenu}
      className=" border overflow-hidden rounded-md shadow-md transition-shadow duration-400 transform hover:shadow-2xl hover:shadow-gray-500 hover:cursor-pointer"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative">
       
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `url('/backgroundImage.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

         <div className="bg-gray-500 relative flex items-center justify-center  mt-0 ">
          <h2 className="text-white text-md font-bold">{image?.imageName}</h2>
        </div>

        <img
          className="relative inset-0 mt-10 w-full h-auto"
          src={`${image?.imageUrl}?w=248&fit=crop&auto=format`}
          srcSet={`${image.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={image.imageName}
          loading="lazy"
        />
        <div className="relative bg-gray-100 flex items-center justify-center py-2 mt-3">
          {image?.tags[0].split(",").map((tag) => (
            <span
              key={tag}
              className="text-small bg-purple-100 rounded-md mr-1 px-2 py-1 "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ImageCardList = ({ images }) => {
  return (
    <ImageList variant="masonry" cols={4} gap={16}>
      {images?.map((image) => (
        <ImageListItem key={image._id}>
          <div className="relative">
            <ImageCard image={image} />
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageCardList;
