// import { useState } from 'react'
// import { useQuery } from 'react-query'

// import Slider from 'react-slick'
// import Link from 'next/link'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import { API } from '@/config/axiosConfig'

// function ImageSlider() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   const { data, isLoading, isError } = useQuery(
//     "images",
//     async () => {
//       const response = await API.get("/slider");
//       return response.data.filter((item) => item.status === "active");
//     },
//     {
//       cacheTime: 1000 * 60 * 5,
//     }
//   );

//   function handleImageClick(index) {
//     setCurrentImageIndex(index)
//   }

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   if (isError) {
//     return <div>Error fetching images</div>
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     afterChange: (index) => setCurrentImageIndex(index)
//   }

//   return (
//     <Slider {...settings}>
//       {data?.map((image, index) => (
//         <div key={index}>
//           <Link href={image?.link} onClick={() => handleImageClick(index)}>
//             <img src={image?.imageUrl} alt={image?.imageUrl} />
//           </Link>
//         </div>
//       ))}
//     </Slider>
//   )
// }

// export default ImageSlider
