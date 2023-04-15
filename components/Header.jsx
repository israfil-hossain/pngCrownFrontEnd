import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { FiSearch, FiUser } from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const Popover = () => {
 

  const { logout,} = useContext(AuthContext);
  return (
    <div className="absolute z-10 -ml-24 mt-28 px-6 py-3 bg-white border border-gray-200 rounded-md shadow-lg">
      <div className="py-2 border cursor-pointer px-4 rounded-md hover:bg-indigo-50 shadow-sm"
      onClick={logout}>Logout</div>
    </div>
  );
};
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [searchType, setSearchType] = useState("tags");
  
  const [showSearch, setShowSearch] = useState(false);
  const { isAuth, currentUser } = useContext(AuthContext);

  const [userClick, setUserAnchorEl] = useState(null);

  const handleUserClick = (event) => {
    setUserAnchorEl(!userClick);
  };
  const handleClose = () => {
    setUserAnchorEl(null);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 50) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        searchQuery
      )}&searchType=${encodeURIComponent(searchType)}`
    );
  };

  // Add event listener to track window scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <header
      className={`${
        showSearch
          ? "fixed top-0 left-0 right-0 flex justify-between items-center bg-gray-800 shadow-lg px-5 py-2 h-16 transition-all duration-500 ease-in z-50"
          : ""
      } flex justify-between items-center bg-gray-800 shadow-lg px-5 py-3 h-16 z-10`}
    >
      <div className="flex items-center lg:space-x-4 sm:space-x-2 py-4 ">
        <Link href="/">
          <Image width={35} height={16} src="/pngcrown.png" alt="App Logo" />
        </Link>

        <div className="rounded-md flex-row hidden lg:flex">
          <Link href="/">
            <Image
              width={50}
              height={15}
              src="/logo2.png"
              alt="App Logo"
              className="w-48 h-8 p-1 items-center shadow-sm object-fit"
            />
          </Link>
        </div>
      </div>
      {showSearch ? (
        <div className="relative rounded-md shadow-sm w-1/2">
          <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-5 w-full rounded-md leading-3 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />

          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            {/* <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
          >
            Search
          </button> */}
            <FiSearch className="w-6 h-6" />
          </div>
          </form>
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center">
        {isAuth ? (
          <div>
            <div
              className="w-8 h-8 bg-gray-50 flex p-2 rounded-full mr-3 focus:bg-gray-400 hover:bg-gray-500"
              onClick={handleUserClick}
            >
              {" "}
              <FiUser />
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Link href="/login">
              <span className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-5 py-2 mr-4">
                Sign In
              </span>
            </Link>
            <Link href="/signup">
              <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md px-5 py-2  hidden lg:flex">
                Sign Up
              </span>
            </Link>
          </div>
        )}
      {
        userClick ? <Popover /> : null 
      }

      </div>
    </header>
  );
};

export default Header;
