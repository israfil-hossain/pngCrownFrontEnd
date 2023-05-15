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
    const filteredData = res.data.filter(item => item.status === "active");
    setData(filteredData);
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


  return (
   <>
    <div className="  lg:h-[500px] xl:h-[600px] xs:h-[280px] sm:h-[300px] md:h-[350px] mb-10  opactiy-500 bg-gray-400 bg-opacity-600 w-full">
    <Slider {...settings}>
        {data?.map((item) => (
          <div key={item?._id} className="lg:h-[500px] xl:h-[600px] xs:h-[280px] sm:h-[300px] md:h-[350px]">
            {item?.link ? (
              <Link href={item?.link} target="_blank">
                <div className="w-full h-full">
                  <Image
                    src={item?.imageUrl}
                    alt={"Image Slider"}
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="w-full h-full "
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
      {/* For Web */}
      <div className="absolute lg:top-[400px] xl:top-[400px] xs:top-[180px] sm:top-[180px] md:top-[200px]   flex  w-full flex-col items-center text-center justify-center mx-auto mb-5">
        <div className="text-gray-50 lg:text-2xl xl:text-3xl md:text-lg sm:text-md xs:text-sm  font-[800] px-3 flex font-sans ">
          High-quality PNG images are available for free
        </div>
        <div className="text-white mt-2 w-full lg:text-xl xl:text-xl md:text-sm sm:text-sm xs:text-xs px-3 font-sans ">
          Over 2.7 million+ high quality stock images, videos and music shared
          by our talented community
        </div>
      </div>

      {showSearch ? (
        ""
      ) : (
        <>
          <div className="absolute lg:top-[495px] xl:top-[495px] xs:top-[250px] sm:top-[250px] md:top-[250px] mt-8 flex  w-full flex-col items-center text-center justify-center mx-auto">
            {/* For Desktop */}
            <div className="relative rounded-md shadow-sm xl:w-1/2 lg:w-1/2 md:w-80 xs:w-60 sm:w-80 ">
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
         
        </>
      )}
    </div>
  </>
  );
};

export default ImageSlider;
