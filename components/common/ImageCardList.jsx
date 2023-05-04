/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Box, ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

const ImageCard = ({ image }) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  const router = useRouter();
  // const handleClick = () => {
  //   router.push(`/photos/${image?._id}`);
  // };
  const handleClick = () => {
    window.open(`/photos/${image?._id}`, '_blank', 'noopener,noreferrer');
  }
  

  
  
  return (
   
    <motion.div
      onContextMenu={handleContextMenu}
      className=" border w-full rounded-md shadow-md transition-shadow duration-400 transform hover:shadow-xl hover:shadow-gray-500 hover:cursor-pointer"
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
    >
      <div className="relative">
       
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: `url('/backgroundImage.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
        <Image
          className="relative inset-0 mt-10 w-full h-auto"
          src={`${image?.imageUrl}?248&fit=crop&auto=format`}
          srcSet={`${image.imageUrl}?248&fit=crop&auto=format&dpr=2 2x`}
          alt={image?.imageName}
          loading="lazy"
          width={200} 
          height={200}
        />
        <div className="relative bg-white text-gray-800 font-sans  text-[13px] flex items-center justify-center py-2 px-2 mt-3">
          {/* {image?.tags[0]?.split(",").map((tag) => (
            <span
              key={tag}
              className="text-small bg-purple-100 rounded-md mr-1 px-2 py-1 "
            >
              {tag}
            </span>
          ))} */}
          <h5 className=" ">{image?.imageName.slice(0,65)+" .."}</h5>
        </div>
      </div>
    </motion.div>
   
  );
};

const ImageCardList = ({ images }) => {
  const matchesMd = useMediaQuery("(max-width:960px)");
  const matchesSm = useMediaQuery("(max-width:600px)");

  const cols = matchesSm ? 3 : matchesMd ? 4 : 7;
  return (
   
      <ImageList variant="masonry" cols={cols} gap={12} >
      {images?.map((image) => (
        <ImageListItem key={image?._id}>
          <Box className="relative" sx={{width:"100%", overflowX:"hidden"}}>
            <ImageCard image={image} />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  
  );
};
// const ImageCardList = ({ images }) => {
//   return (
//     <Box sx={{ width: "100%" }}>
//       <ImageList rowHeight={300} cols={3}>
//         {images?.slice(0, 20).map((image) => (
//           <ImageListItem key={image._id}>
//             <img
//               src={image.imageUrl}
//               alt={image.imageName}
//               loading="lazy"
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </ImageListItem>
//         ))}
//       </ImageList>
//     </Box>
//   );
// };


export default ImageCardList;
