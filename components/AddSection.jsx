import React, { useEffect } from 'react';

const AddSection = ({ width, height, client, slot }) => {
  useEffect(() => {
    if (window) {
      // Only load AdSense script once
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className={`w-[${width}] h-[${height}] bg-gray-200 border rounded-md`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AddSection;
