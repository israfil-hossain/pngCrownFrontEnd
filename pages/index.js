import { Inter } from "next/font/google";
import ImageSlider from "@/components/ImageSlider";
import Categories from "@/components/CategorySection";
import ImageCards from "@/components/ImageCards";

import { useQuery } from "react-query";
import { API } from "@/config/axiosConfig";

import ImageCardList from "@/components/common/ImageCardList";
import { useInfiniteQuery } from "react-query";
import ProgressBar from "@/components/common/ProgressBar";
const inter = Inter({ subsets: ["latin"] });
import InfiniteScroll from "react-infinite-scroll-component";
import { Progress } from "@/components/common/Progress";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const fetchPage = async ({ pageParam = 1 }) => {
    const { data } = await API.get( `/image?page=${pageParam}&limit=10&sortBy=createdAt&sortOrder=desc`);
    return data;
  };
  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   isLoading,
  //   isError,
  //   status,
  // } = useInfiniteQuery(
  //   "images",
  //   async ({ pageParam = 1 }) => {
  //     return API.get(
  //       `/image?page=${pageParam}&limit=10&sortBy=createdAt&sortOrder=desc`
  //     ).then((res) => res.data.filter((item) => item.status === "active"));
  //   },
  //   {
  //     getNextPageParam: (lastPage, pages) => {
  //       if (lastPage?.info?.next) {
  //         return pages.length + 1;
  //       }
  //     },
  //     initialData: { pages: [] },
  //     pageSize: 5,
  //   }
  // );
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["images", page], fetchPage, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages?.length + 1 : undefined,
    refetchOnWindowFocus: false,
  });


  const handleContextMenu = (event) => {
    event.preventDefault();
  };
 

  // console.log("Image data is ", data);
  return (
    <>
      <div className="overflow-hidden"  onContextMenu={handleContextMenu}>
        <ImageSlider />

        <Categories />

        <div className="w-full text-center container px-4 justify-center lg:my-16 sm:my-4 md:my-6 sm:mt-5 xs:mt-5">
          <span className="lg:text-4xl sm:text-md xl:text-4xl xs:text-md text-gray-700 font-bold ">
            Transparent background png images for designers
          </span>
        </div>
        <div className="h-8"></div>

        <InfiniteScroll
          dataLength={data?.pages?.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<ProgressBar />}
        >
          {isLoading ? (
            <ProgressBar />
          ) : isError ? (
            <div className="text-center">
              <p>Something went wrong, please try again later.</p>
            </div>
          ) : (
            
              <div className="overflow-hidden px-5 mx-auto ">
                {isLoading ? <ProgressBar /> : <ImageCardList images={data?.pages?.flatMap((page) => page)} />}
                
              </div>
           
          )}
        </InfiniteScroll>

        {/* <div className="grid  gap-4  px-4 container lg:hidden ">
          {data?.pages?.flatMap((page) =>
            page.map((item) => (
              <ImageCards
                image={item?.imageUrl}
                key={item?._id}
                name={item?.imageName}
                tags={item?.tags}
                id={item?._id}
              />
            ))
          )}
        </div> */}
        {/* </>
       } */}
      </div>
      <div className="h-20 mt-10 "></div>
    </>
  );
}
