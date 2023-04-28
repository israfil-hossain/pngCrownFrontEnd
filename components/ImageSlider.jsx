/* eslint-disable react-hooks/rules-of-hooks */
import Slider from "react-slick";
import { useQuery } from "react-query";
import { API } from "@/config/axiosConfig";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import ImageSliding from "./layouts/ImageSliding";
import { useRouter } from "next/router";

const ImageSlider = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState("tags");
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/slider");
    console.log("Image Data ==>", res.data);
    setData(res.data);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // handleSearch
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        searchQuery
      )}&searchType=${encodeURIComponent(searchType)}`
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Slider Setting style .....
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (isError) {
  //   return <p>Error fetching images</p>;
  // }

  return (
    <div className="h-3/5 px-2 mb-10 overflow-hidden opactiy-200 bg-gray-400 bg-opacity-95 ">
      <Slider {...settings}>
        {data?.map((item) => (
          <div key={item?._id} className="h-96 w-full">
            {item?.link ? (
              <Link href={item?.link}>
                <div>
                  <Image
                    src={item?.imageUrl}
                    alt={"Image Slider"}
                    width={1000}
                    height={500}
                    layout="responsive"
                    priority
                  />
                </div>
              </Link>
            ) : (
              <Image
                src={item?.imageUrl}
                alt={"Image Slider"}
                width={1000}
                height={500}
                layout="responsive"
                priority
              />
            )}
          </div>
        ))}
      </Slider>
      <div className="absolute top-56 hidden lg:flex  w-full flex-col items-center text-center justify-center mx-auto mb-5">
        <div className="text-gray-50 text-3xl  font-[800] sm:px-5 flex font-sans">
          High-quality PNG images are available for free
        </div>
        <div className="text-white mt-2 sm:px-5 font-sans">
          Over 2.7 million+ high quality stock images, videos and music shared
          by our talented community
        </div>
      </div>
      <div className="absolute top-28 lg:hidden overflow-hidden flex w-full flex-col items-center text-center justify-center mx-auto mb-5">
        <div className="text-gray-50 text-md  font-[900] px-5 flex font-sans">
          High-quality PNG images are available for free
        </div>
        <div className="text-white mt-1 sm:px-5 font-sans">
          Over 2.7 million+ high quality stock images, videos and music shared
          by our talented community
        </div>
      </div>
      {showSearch ? (
        ""
      ) : (
        <>
          <div className="absolute top-80 mt-8 overflow-hidden lg:flex hidden w-full flex-col items-center text-center justify-center mx-auto">
            <div className="relative rounded-md shadow-sm w-1/2">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-4 pl-5 w-full rounded-md leading-3 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="absolute hover:cursor-pointer inset-y-0 right-0 px-3 flex items-center hover:bg-indigo-700 hover:rounded-r-md hover:text-white"
                >
                  <FiSearch className="w-6 h-6 hover:text-gray-50 " />
                </button>
              </form>
            </div>
          </div>
          <div className="absolute  top-56 overflow-hidden  lg:hidden flex w-[100%]  items-center text-center justify-center ">
            <div className="relative rounded-md shadow-sm ">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-4 px-24 pl-5 rounded-md leading-2 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="absolute hover:cursor-pointer inset-y-0 right-0 px-3 flex items-center hover:bg-indigo-700 hover:rounded-r-md hover:text-white"
                >
                  <FiSearch className="w-6 h-6 hover:text-gray-50 " />
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
