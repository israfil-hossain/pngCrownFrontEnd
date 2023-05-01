import Image from "next/image";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// const images = [
//   "https://res.cloudinary.com/dpc1nydxn/image/upload/v1681012740/kuzglant9zyxhnmq3upc.png",
//   "https://res.cloudinary.com/dpc1nydxn/image/upload/v1681012769/spa2a7npdxdkzm6j9cne.png",
//   "https://res.cloudinary.com/dpc1nydxn/image/upload/v1681359392/jqyh7repcmbjxavru0yd.png",
// ];
// The number of columns change by resizing the window
const ImageGalary = ({images}) => {
    // console.log("Image Data is : ",images);
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>
        {images?.map((image, i) => (
          <Image
            key={i}
            src={image?.imageUrl}
            style={{ width: "100%", display: "block" }}
            alt=""
            width={400}
            height={100}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ImageGalary;
