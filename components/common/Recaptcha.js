import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Progress } from "./Progress";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const Recaptcha = ({ onVerify }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleVerify = async () => {
    setIsLoading(true);

    try {
      const token = await window.grecaptcha.execute(SITE_KEY, {
        action: "verify",
      });

      // Wait for 4-6 seconds before setting the verification status to true
      setTimeout(() => {
        setIsVerified(true);
        setIsLoading(false);
      }, 4000);
      // Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000)
      onVerify(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <script
          async
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        ></script>
      </Head>
      
      <div
        className="relative mb-2 flex w-72 py-2 items-center justify-between gap-2 h-[80px] px-4 bg-gray-50 border border-gray-400 rounded-md text-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <div className="items-center justify-center">
          {isVerified ? (
            <svg
              className="h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.156 5.78a.75.75 0 011.06 1.06l-9.469 9.47a.75.75 0 01-1.06 0l-5.03-5.03a.75.75 0 111.06-1.06l4.22 4.22 8.408-8.408z"
                clipRule="evenodd"
              />
            </svg>
          ) : isLoading ? (
            <Progress />
          ) : (
            <input
              type="checkbox"
              className="appearance-none h-5 w-5 border border-gray-400 rounded-sm checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isVerified ? true : false}
              onClick={handleVerify}
            />
          )}
        </div>
        <p className="text-lg font-normal text-gray-700">{"I'm not a robot "}</p>

        <div className="flex flex-col">
          <div className="flex items-center justify-center r bg-white ml-5 mt-2  h-8 w-8">
            <Image width={50} height={50} src="/google.svg" alt="" />
          </div>
          <span className="text-[13px] text-gray-600">reCAPTCHA</span>
          <span className="text-[9px] text-gray-500">{"Privacy-Terms"}</span>
        </div>
      </div>
    </>
  );
};

export default Recaptcha;
