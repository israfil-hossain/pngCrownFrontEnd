import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { API } from "@/config/axiosConfig";
import Image from "next/image";
import ProgressBar from "@/components/common/ProgressBar";
import AddSection from "@/components/AddSection";
import { FiDownload } from "react-icons/fi";
import { TbDimensions } from "react-icons/tb";
import { AiOutlineFile, AiOutlineFileImage } from "react-icons/ai";
import Modal from "@/components/common/CommonModal";
import { AuthContext } from "../../context/AuthContext";
import Recaptcha from "@/components/common/Recaptcha";
import axios from "axios";
import { s3 } from "@/config/aws-config";
import getConfig from "next/config";
import { Progress } from "@/components/common/Progress";

const useFetchData = () => {
  const [singleData, setSingleData] = useState();
  const [ispLoading, setIspLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (id) => {
    setIspLoading(true);
    try {
      const res = await API.get(`/image/${id}`);
      setSingleData(res.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch data");
    } finally {
      setIspLoading(false);
    }
  }, []);

  return { singleData, ispLoading, error, fetchData };
};

const DownloadPhotos = () => {
  const { isAuth } = useContext(AuthContext);

  const router = useRouter();
  const { id } = router.query;
  const { singleData, ispLoading, error, fetchData } = useFetchData();

  const [tags, setTags] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const MAX_DOWNLOADS = 10;
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { publicRuntimeConfig } = getConfig();
  const { AWS_BUCKET_NAME } = publicRuntimeConfig;

  const handleVerify = (token) => {
    setTimeout(() => {
      setIsVerified(true);
    }, 4000);
  };

  const [isRobot, setIsRobot] = useState(true);
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  function onChange(value) {
    // If the user is verified, enable the download button
    if (value) {
      setIsRobot(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  const handleSignIn = () => {
    // Redirect the user to the login page
    // window.location.href = "/login";
    router.push("/login");
  };
  const handleCancel = () => {
    setShowSignInModal(false);
  };

  const downloadImage = async (imageName, imageUrl) => {
    const downloadCount = parseInt(
      localStorage.getItem("downloadCount") || "0"
    );
    if (!isAuth && downloadCount >= MAX_DOWNLOADS) {
      setShowSignInModal(true);
      return;
    }
    setIsLoading(true);

    try {
      // Extract the S3 object key from the image URL
      const urlParts = imageUrl.split("/");
      const key = urlParts[urlParts.length - 1];

      // Download the image from S3
      const response = await s3
        .getObject({
          Bucket: AWS_BUCKET_NAME,
          Key: key,
        })
        .promise();

      // Create a temporary <a> tag with download attribute
      const url = URL.createObjectURL(new Blob([response.Body]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${imageName}.png`;

      // Programmatically click the <a> tag to start the download
      link.click();

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);

      // Increment the download count and store it in localStorage
      localStorage.setItem("downloadCount", downloadCount + 1);

      // Call the image download API using Axios
      const downloadResponse = await axios.get(`/image/download/${imageName}`);
      console.log("Image download tracked successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading image:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {ispLoading ? (
        <ProgressBar />
      ) : (
        <div className="px-8 min-h-screen" onContextMenu={handleContextMenu}>
          {/* For Mobile Devices  */}
          <div className="flex flex-col my-5 justify-center items-center  lg:hidden">
            <Recaptcha onVerify={handleVerify} />

            <button
              className="w-56 cursor-pointer justify-around rounded-full bg-green-500 py-2 px-5 flex flex-row font-semibold text-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isVerified ? false : true}
              onClick={() =>
                downloadImage(singleData?.imageName, singleData?.imageUrl)
              }
            >
              {isLoading ? (
                <Progress />
              ) : (
                <FiDownload className="mt-1 font-bold text-xl text-white" />
              )}{" "}
              {"Free Download"}
            </button>
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

            <Image
              src={singleData?.imageUrl}
              alt=""
              width={550}
              height={300}
              className="relative px-8"
            />
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

                  {
                    <Image
                      src={singleData?.imageUrl}
                      alt=""
                      width={300}
                      height={200}
                      className="relative"
                    />
                  }
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
                <Recaptcha onVerify={handleVerify} />

                <button
                  className="w-56 cursor-pointer justify-around rounded-full bg-green-500 py-2 px-5 flex flex-row font-semibold text-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isVerified ? false : true}
                  onClick={() =>
                    downloadImage(singleData?.imageName, singleData?.imageUrl)
                  }
                >
                  {isLoading ? (
                    <Progress />
                  ) : (
                    <FiDownload className="mt-1 font-bold text-xl text-white" />
                  )}{" "}
                  {"Free Download"}
                </button>
              </div>
              <div className="bg-gray-50 rounded-md border w-96 h-40 mt-5 ">
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
          <div className="hidden lg:flex py-2 mx-auto justify-center items-center">
            <AddSection width={"1200px"} height={"200px"} slot={"9661024485"} />
          </div>
          <div className="lg:hidden  py-2">
            <AddSection width={"250px"} height={"200px"} slot={"1779143964"} />
          </div>

          <Modal isOpen={showSignInModal} onClose={handleCancel}>
            <div className="text-center">
              <p className="mb-2 py-5">
                Please sign in to continue downloading.
              </p>
              <button
                onClick={handleSignIn}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2"
              >
                Sign In
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default DownloadPhotos;
