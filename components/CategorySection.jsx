import { API } from "@/config/axiosConfig";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
const Categories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 10,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    "category",
    async () => {
      const response = await API.get("/category");
      return response.data.filter((item) => item.cat_status === "active"); // Filter data by status
    },
  );
  // console.log("Category",data);

  const handleSearch = (cat_name)=>{
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        cat_name
      )}`
    )

  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching images</p>;
  }
  // console.log("Data for Category : ", data);

  return (
    <>
    <div className="w-full lg:w-2/3 justify-center hidden lg:block text-center items-center mx-auto">
      <Slider {...settings}>
        {data?.map((item) => (
          <div
            className="px-0 "
            key={item._id}

          >
            <div className="   border-gray-200 py-1 rounded-md items-center text-center "
            onClick={()=>handleSearch(item?.cat_name)}>
              <h3 className="text-lg text-[#0D98C9] font-normal cursor-pointer hover:shadow-md"><u>{item?.cat_name}</u></h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <div className="w-full justify-center  text-center items-center mx-auto lg:hidden">
      <Slider {...settings2}>
        {data?.map((item) => (
          <div
            className="px-0 "
            key={item._id}

          >
            <div className="   border-gray-200 py-1 rounded-md items-center text-center "
            onClick={()=>handleSearch(item?.cat_name)}>
              <h3 className="text-lg text-[#0D98C9] font-normal "><u>{item?.cat_name}</u></h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
};

export default Categories;
