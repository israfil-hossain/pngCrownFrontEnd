import ImageCards from "@/components/ImageCards";
import { API } from "@/config/axiosConfig";
import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { BiCameraOff } from "react-icons/bi";
import AddSection from "@/components/AddSection";
import ImageCardList from "@/components/common/ImageCardList";
import ProgressBar from "@/components/common/ProgressBar";

const Search = () => {
  const router = useRouter();
  const { searchQuery } = router.query;
  // console.log("Search Query ", searchQuery);
  const { data, isLoading, isError } = useQuery(
    "image",
    async () => {
      const response = await API.get("/image");
      return response.data.filter((item) => item.status === "active"); // Filter data by status
    },
  );
  console.log("Data is : ",data);

  const filteredData = data?.filter(
    (image) =>
      image.imageName.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      image.category.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery?.toLowerCase())
      )
  );

  if (isError) {
    return <p>Error fetching images</p>;
  }
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mt-10 flex flex-col h-auto min-h-screen" onClick={handleContextMenu}>
      {isLoading ? (
        <ProgressBar />
      ) : (
        <div>
          {filteredData.length > 0 ? (
            <>
              <div className=" px-5">
                {/* */}
                <ImageCardList images={filteredData} />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="border rounded-md px-16 py-12">
                <BiCameraOff className="w-40 h-16 text-red-400" />
                <span className="text-center items-center justify-center">
                  No Image found ...
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
