import { useState, useEffect } from 'react'
import Header from "../Header";
import Footer from "../Footer";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import UpArrow from "../common/UpArrow";

const CommonLayout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      <Header />
      <div className="mb-10 ">{children}</div>
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Link href="https://www.pinterest.es/png_crown/">
          <div className=" animate-bounce rounded-full hover:shadow-lg hover:bg-indigo-100  bg-gray-50 px-4 py-4 mb-4 cursor-pointer">
            <BsPinterest className="text-red-500 w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10" />
          </div>
        </Link>
        <Link href="https://www.instagram.com/pngcrown/">
          <div className="animate-bounce hover:shadow-lg hover:bg-indigo-100  rounded-full bg-gray-50 py-5 px-2 flex justify-center cursor-pointer">
            {/* <BsInstagram className="text-white w-9 h-9" /> */}
            <Image src="/instagram.png" alt="" width={32} height={32} />
          </div>
        </Link>
        {isVisible ? 
        <div className="rounded-full  justify-center flex  px-4 py-3 cursor-pointer mt-12">
        {/* <BsInstagram className="text-white w-9 h-9" /> */}
        {/* <Image src="/up-arrow.png" alt="" width={30} height={30} /> */}
        <div
          className={`fixed bottom-6 right-6 p-2 rounded-full ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onClick={scrollToTop}
        >
          <div className="bg-gray-50 animate-spin hover:animate-none hover:shadow-lg hover:outline-dotted rounded-full flex px-2 py-2 mt-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <Image src="/up-arrow.png" alt="" width={30} height={30} />
          </div>
        </div>
      </div> : ""}
        
      </div>

      <Footer />
    </>
  );
};

export default CommonLayout;
