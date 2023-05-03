import Image from "next/image";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// The number of columns change by resizing the window
const ImageGalary = ({images}) => {
    // console.log("Image Data is : ",images);
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 6, 900: 6 }}>
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
