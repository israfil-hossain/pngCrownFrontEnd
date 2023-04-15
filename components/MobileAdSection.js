import React from 'react'

const MobileAdSection = () => {
  return (
    <div className="container w-full h-32 bg-red-500 py-2 rounded-md ">
    <script
      data-ad-client="YOUR_AD_CLIENT_ID"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script>
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
  )
}

export default MobileAdSection;