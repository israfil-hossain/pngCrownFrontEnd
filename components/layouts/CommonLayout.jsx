import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import UpArrow from "../common/UpArrow";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mb-10 ">{children}</div>
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Link href="https://www.pinterest.es/png_crown/">
          <div className=" animate-bounce rounded-full hover:shadow-lg hover:bg-indigo-100  bg-gray-50 px-4 py-4 mb-4 cursor-pointer">
            <BsPinterest className="text-red-500 w-12 h-12 " />
          </div>
        </Link>
        <Link href="https://www.instagram.com/pngcrown/">
          <div className="animate-bounce hover:shadow-lg hover:bg-indigo-100  rounded-full bg-gray-50 py-5 px-2 flex justify-center cursor-pointer">
            {/* <BsInstagram className="text-white w-9 h-9" /> */}
            <Image src="/instagram.png" alt="" width={36} height={36} />
          </div>
        </Link>
        <div className="rounded-full  justify-center flex  px-4 py-3 cursor-pointer mt-10">
            {/* <BsInstagram className="text-white w-9 h-9" /> */}
            {/* <Image src="/up-arrow.png" alt="" width={30} height={30} /> */}
            <UpArrow />
          </div>
      </div>

      <Footer />
    </>
  );
};

export default CommonLayout;
