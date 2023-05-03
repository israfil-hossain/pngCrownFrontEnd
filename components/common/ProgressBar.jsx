import Image from "next/image";
import React from "react";

const ProgressBar = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    {/* <div className="relative">
      <div className="border-4 border-gray-200 dark:border-gray-700 w-16 h-16 rounded-full"></div>
      <div className="border-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg className="animate-bounce h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22a10 10 0 100-20 10 10 0 000 20z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14L12 20L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div> */}
    <Image src={"/loader.gif"} alt="loader" width={300} height={300}/>
  </div>
  );
};

export default ProgressBar;
