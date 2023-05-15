import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { API } from "@/config/axiosConfig";
import Image from "next/image";
import ProgressBar from "@/components/common/ProgressBar";
import AddSection from "@/components/AddSection";
import { FiDownload } from "react-icons/fi";
import { TbDimensions } from "react-icons/tb";
import { AiOutlineFile, AiOutlineFileImage } from "react-icons/ai";
import { useQuery } from "react-query";
import ImageCardList from "@/components/common/ImageCardList";

const useFetchData = () => {
  const [singleData, setSingleData] = useState(null);
  const [category, setCategory] = useState(null);
  const [ispLoading, setIspLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (id) => {
    setIspLoading(true);
    try {
      const res = await API.get(`/image/${id}`);
      setSingleData(res.data);
      setCategory(res.data?.category);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data");
    } finally {
      setIspLoading(false);
    }
  }, []);

  return { singleData, category, ispLoading, error, fetchData };
};
const SinglePhotos = () => {
  const router = useRouter();
  const { id } = router.query;

  const { singleData, category, ispLoading, error, fetchData } = useFetchData();

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  // console.log("Category name is :", category);

  const { data, isLoading, isError } = useQuery(
    ["images", category],
    async () => {
      const response = await API.get(`/image/category/${category}`);
      return response.data;
    }
  );

  const handleClick = () => {
    window.open(`/download/${id}`, "_blank", "noopener,noreferrer");
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="px-8 min-h-screen" onContextMenu={handleContextMenu}>
        {ispLoading ? (
          <ProgressBar />
        ) : (
          <>
            {/* For Mobile Devices  */}
            <div className="flex flex-col my-5 justify-center items-center  lg:hidden">
              <div
                className="w-88 cursor-pointer justify-around rounded-full bg-green-500 py-2 px-3 flex flex-row font-semibold  text-white"
                onClick={handleClick}
              >
                <FiDownload className="mt-1 lg:font-bold sm:font-medium lg:text-xl  sm:text-sm mx-2 text-white" />{" "}
                {"Click Here To Download"}
              </div>
            </div>
            <div className="relative pt-2 w-full flex justify-center  lg:hidden">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('/backgroundImage.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              {
                <Image
                  src={singleData?.imageUrl}
                  alt=""
                  width={550}
                  height={300}
                  className="relative px-8"
                />
              }
            </div>
            <div className="bg-white border  lg:hidden">
              <div className="bg-white  text-center text-gray-900 font-sans ">
                <span>{singleData?.imageName} </span>
              </div>
              <div className="h-5"></div>
              <div className="h-6 border-l-4 border-l-indigo-500 font-sans pl-5 bg-gray-100 ">
                PNG tags
              </div>
              <div className="bg-white shadow-md text-center text-gray-900 font-sans py-5 w-full">
                {singleData?.tags &&
                  singleData?.tags[0].split(",").map((tag) => (
                    <span
                      key={tag}
                      className="text-small bg-slate-100 rounded-md mr-1 px-3 my-2 py-1 inline-block max-w-full break-words"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* For Desktop Screen  */}

            <div className=" lg:flex-row justify-between hidden lg:flex">
              {/* Add Section  */}
              <div className="mt-8 w-96">
                <AddSection
                  width={"300px"}
                  height={"300px"}
                  slot={"3900635183"}
                />
              </div>
              {/* Image Section  */}
              <div className="mt-8 flex flex-col w-1/2 px-8">
                <div className=" bg-red-50 rounded-md">
                  <div className="relative px-5 py-5 flex justify-center">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('/backgroundImage.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    <Image
                      src={singleData?.imageUrl}
                      alt=""
                      width={300}
                      height={200}
                      className="relative"
                    />
                  </div>
                  <div className="bg-white border ">
                    <div className="bg-white  text-center text-gray-900 font-sans ">
                      <span>{singleData?.imageName} </span>
                    </div>
                    <div className="h-5"></div>
                    <div className="h-6 border-l-4 border-l-indigo-500 font-sans pl-5 bg-gray-100 ">
                      PNG tags
                    </div>
                    <div className="bg-white shadow-md text-center text-gray-900 font-sans py-5 w-full">
                      {singleData?.tags &&
                        singleData?.tags[0].split(",").map((tag) => (
                          <span
                            key={tag}
                            className="text-small bg-slate-100 rounded-md mr-1 px-3 my-2 py-1 inline-block max-w-full break-words"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Download Button and Right COlumn */}
              <div className=" flex-col w-96 hidden lg:flex">
                <hr />
                <div className="mt-8 mb-5">
                  <AddSection
                    height={"200px"}
                    width={"300px"}
                    slot={"5366556254"}
                  />
                </div>
                <hr className="mb-5 " />
                <div className="flex flex-col justify-center items-center ">
                  <div
                    className="w-92  cursor-pointer justify-between rounded-full bg-green-500 py-2 px-5 flex flex-row font-semibold text-xl text-white"
                    onClick={handleClick}
                  >
                    <FiDownload className="mt-1 font-bold text-xl mx-2 text-white" />
                    {"   "}
                    {"Click Here To Download"}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md border w-96 h-40 mt-5 ">
                  <div className="bg-gray-200 border-l-4 pl-2 border-l-indigo-500 ">
                    PNG info
                  </div>

                  <div className="flex flex-row justify-between px-4 mt-2">
                    <div className="flex space-x-2">
                      <AiOutlineFile className="mt-1" />
                      <span>FileSize</span>
                    </div>
                    <span>
                      {singleData?.size
                        ? (singleData.size / (1024 * 1024)).toFixed(2) + " MB"
                        : "N/A"}{" "}
                    </span>
                  </div>
                  <div className="flex flex-row justify-between px-4 mt-2">
                    <div className="flex space-x-2">
                      <AiOutlineFileImage className="mt-1" />
                      <span>Image Type</span>
                    </div>
                    <span>{singleData?.format}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* PNG Info -- Mobile ------------------- */}
            <div className="bg-gray-50  rounded-md border sm:w-full h-40 mt-5 lg:hidden">
              <div className="bg-gray-200 border-l-4 pl-2 border-l-indigo-500 ">
                PNG info
              </div>
              {/* <div className="flex flex-row justify-between px-4 mt-2">
              <div className="flex space-x-2">
                <TbDimensions className="mt-1" />
                <span>Dimensions</span>
              </div>
              <span>
                {singleData?.height}x{singleData?.width}
                {" px"}
              </span>
            </div> */}
              <div className="flex flex-row justify-between px-4 mt-2">
                <div className="flex space-x-2">
                  <AiOutlineFile className="mt-1" />
                  <span>FileSize</span>
                </div>
                <span>{"0 - 1 Mb "}</span>
              </div>
              <div className="flex flex-row justify-between px-4 mt-2">
                <div className="flex space-x-2">
                  <AiOutlineFileImage className="mt-1" />
                  <span>Image Type</span>
                </div>
                <span>{singleData?.format}</span>
              </div>
            </div>
            <div className="hidden lg:flex py-2 mx-auto justify-center items-center">
              <AddSection
                width={"1200px"}
                height={"200px"}
                slot={"9661024485"}
              />
            </div>
            <div className="lg:hidden  py-2 w-full">
              <AddSection
                width={"250px"}
                height={"200px"}
                slot={"1779143964"}
              />
            </div>
          </>
        )}

        <div className=" text-center text-xl font-sans font-semibold mt-6 mb-5">
          Related Png Images
        </div>
        {isLoading ? <ProgressBar /> : <ImageCardList images={data} />}
      </div>
    </>
  );
};

export default SinglePhotos;
