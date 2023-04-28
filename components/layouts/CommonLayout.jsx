import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import Link from "next/link";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mb-10 ">{children}</div>
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Link href="https://www.pinterest.es/png_crown/">
          <div className="rounded-full bg-gray-700 px-3 py-3 mb-4 cursor-pointer">
            <BsPinterest className="text-white w-12 h-12 " />
          </div>
        </Link>
        <Link href="https://www.instagram.com/your_instagram_username">
          <div className="rounded-full bg-gray-700 py-4 flex justify-center cursor-pointer">
            <BsInstagram className="text-white w-9 h-9" />
          </div>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default CommonLayout;
