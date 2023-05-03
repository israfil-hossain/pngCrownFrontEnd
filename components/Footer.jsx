import Image from "next/image";
import Link from "next/link";
import { BsPinterest } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 overflow-hidden ">
      <div className="container mx-auto py-4 text-gray-400">
        
        <div className="text-center">
          <p>&copy; 2023 PngCrown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
