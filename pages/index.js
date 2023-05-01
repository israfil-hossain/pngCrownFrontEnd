/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import ImageSlider from "@/components/ImageSlider";
import Categories from "@/components/CategorySection";
import ImageCards from "@/components/ImageCards";

import AddSection from "@/components/AddSection";
import { useQuery } from "react-query";
import { API } from "@/config/axiosConfig";
import MobileAdSection from "@/components/MobileAdSection";
import { Box, ImageList, ImageListItem } from "@mui/material";
import ImageCardList from "@/components/common/ImageCardList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, isLoading, isError } = useQuery(
    "images",
    async () => {
      const response = await API.get("/image");
      return response.data.filter((item) => item.status === "active"); // Filter data by status
    },
    {
      cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    }
  );
  // console.log("Image data is ", data);
  return (
    <>
      
      <div className="">
        <ImageSlider />

        <Categories />

        <div className="w-full text-center container px-4 justify-center lg:my-16 sm:my-4 md:my-6">
          <span className="lg:text-4xl sm:text-md xl:text-4xl xs:text-md text-gray-700 font-bold ">
            Transparent background png images for designers
          </span>
        </div>
        <div className="h-8"></div>

        <div className=" flex-row hidden lg:flex">
          {/* <div className="flex flex-col w-[200px] px-1 bg-gray-50">
            <AddSection height={"400px"} width={"200px"} />
            <hr className="my-2" />
            <AddSection height={"400px"} width={"200px"} />
          </div> */}
          <div className="hidden lg:block flex-col px-5">
            <ImageCardList images={data} />
            
          </div>
          
        </div>
        {/* <div className="mb-8   lg:hidden ">
          <MobileAdSection />
        </div> */}
        <div className="grid  gap-4  px-4 container lg:hidden ">
          {data?.map((item) => (
            <ImageCards
              image={item?.imageUrl}
              key={item?._id}
              name={item?.imageName}
              tags={item?.tags}
              id={item?._id}
            />
          ))}
        </div>
      </div>
      <div className="h-20 mt-10 "></div>
    </>
  );
}

// /* eslint-disable react-hooks/rules-of-hooks */
// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import ImageSlider from "@/components/ImageSlider";
// import Categories from "@/components/CategorySection";
// import ImageCards from "@/components/ImageCards";
// import AddSection from "@/components/AddSection";
// import { useQuery } from "react-query";
// import { API } from "@/config/axiosConfig";
// import MobileAdSection from "@/components/MobileAdSection";

// import { List } from "react-virtualized";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const { data, isLoading, isError } = useQuery(
//     "images",
//     async () => {
//       const response = await API.get("/image");
//       return response.data.filter((item) => item.status === "active"); // Filter data by status
//     },
//     {
//       cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
//     }
//   );
//   console.log("Image data is ", data);

//   const rowRenderer = ({ index, key, style }) => {
//     const item = data[index];
//     return (
//       <div key={key} style={style}>
//         <div className="grid gap-4 lg:grid-cols-4 xl:grid-cols-4 container mt-5">
//           <ImageCards
//             image={item?.imageUrl}
//             key={item?._id}
//             name={item?.imageName}
//             tags={item?.tags}
//             id={item?._id}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Head>
//         <title>Transparent background png images for designers</title>
//         <meta name="description" content="Get transparent background png images for your design projects." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/pngcrown.png" />
//       </Head>
//       <div className="">
//         <ImageSlider />
//         <Categories />
//         <div className="w-full text-center  justify-center  mx-auto py-4">
//           <h1 className="text-4xl text-gray-700 font-bold">Transparent background png images for designers</h1>
//         </div>
//         <div className="h-8"></div>
//         <div className="flex flex-row lg:hidden">
//           <AddSection />
//           <div className="flex flex-col px-3">
//             {data?.map((item) => (
//               <ImageCards
//                 image={item?.imageUrl}
//                 key={item?._id}
//                 name={item?.imageName}
//                 tags={item?.tags}
//                 id={item?._id}
//               />
//             ))}
//           </div>
//           <AddSection />
//         </div>
//         <div className="mb-8 lg:flex">
//           <MobileAdSection />
//         </div>
//         <div className="grid gap-4 lg:grid-cols-4 xl:grid-cols-4 container lg:flex hidden">
//           <List
//             width={1000}
//             height={500}
//             rowHeight={400}
//             rowRenderer={rowRenderer}
//             rowCount={data?.length || 0}
//           />
//         </div>
//       </div>
//       <div className="h-20 mt-10"></div>
//     </>
//   );
// }
