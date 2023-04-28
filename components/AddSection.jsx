import React, { useEffect } from 'react';

const AddSection = ({ width, height, slot }) => {
  useEffect(() => {
    // Load AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.head.appendChild(script);
  
    return () => {
      // Remove AdSense script when component unmounts
      document.head.removeChild(script);
    };
  }, []);
  
  useEffect(() => {
    // Initialize ads only after AdSense script has loaded
    const timer = setTimeout(() => {
      if (window?.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    }, 2000);
  
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className={`w-[${width}] h-[${height}] bg-gray-200 border rounded-md`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={"ca-pub-7562191749444029"}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AddSection;
