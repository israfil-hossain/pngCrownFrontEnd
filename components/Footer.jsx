import Image from "next/image";
import Link from "next/link";
import { BsPinterest } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 overflow-hidden ">
      <div className="container mx-auto py-4 text-gray-400">
        <div className="flex flex-wrap justify-center">
          <div className="px-4 py-2">
            <Link href="https://www.pinterest.es/png_crown/">
              <div className="  rounded-full hover:shadow-lg hover:bg-indigo-100  bg-gray-50 px-4 py-4 mb-4 cursor-pointer">
                <BsPinterest className="text-red-500 w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10" />
              </div>
            </Link>
          </div>
          <div className="">
            <Link href="https://www.instagram.com/pngcrown/">
              <div className=" hover:shadow-lg hover:bg-indigo-100 mt-2 ml-5 rounded-full bg-gray-50 py-5 px-5 flex justify-center cursor-pointer">
                {/* <BsInstagram className="text-white w-9 h-9" /> */}
                <Image src="/instagram.png" alt="" width={32} height={32} />
              </div>
            </Link>
          </div>
          
        </div>
        <div className="text-center">
          <p>&copy; 2023 PngCrown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
