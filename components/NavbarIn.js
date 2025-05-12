import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import SearchContents from "./Searchcontents";
const NetflixNavbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const searchInputRef = useRef(null);
  const [SearchResults, SetSearchResults] = useState([]);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
    if (!searchActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
    if(searchActive === true)
    {
      setSearchTerm("");
      SetSearchResults([]);
      setSearchActive(false);
    }
    else{
      setSearchActive(true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    e.preventDefault();
    const newTerm = e.target.value;
    // SetSearchReq(newTerm);
    fetch("/api/search", {
      method: "POST", // use POST when sending a body
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: newTerm }), // sending the query in the body
    })
      .then((res) => res.json())
      .then((res) => SetSearchResults(res));
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-3 flex items-center justify-between ${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      {/* Left side - Logo and navigation links */}
      <div className="flex items-center space-x-8">
        {/* Netflix Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-red-600 font-bold text-2xl md:text-3xl">
            NETFLIX
          </span>
        </Link>
        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/auth"
            className="text-white hover:text-gray-300 text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            href="/auth/shows"
            className="text-white/80 hover:text-white text-sm transition"
          >
            TV Shows
          </Link>
          <Link
            href="/auth/movies"
            className="text-white/80 hover:text-white text-sm transition"
          >
            Movies
          </Link>
          <Link
            href="/auth/myList"
            className="text-white/80 hover:text-white text-sm transition"
          >
            My List
          </Link>
        </div>

        {/* Mobile Navigation Dropdown - Visible only on mobile */}
        <div className="md:hidden flex items-center">
          <span className="text-white/80 text-sm mr-1">Browse</span>
          <ChevronDown size={16} className="text-white/80" />
        </div>
      </div>

      {/* Right side - Search, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <div
            className={`flex items-center transition-all duration-300 ${
              searchActive ? "bg-black border border-white/30 px-2" : ""
            }`}
          >
            <button onClick={handleSearchClick} className="p-1">
              <Search size={20} className="text-white" />
            </button>

            {searchActive && (
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Titles, people, genres"
                className="bg-transparent text-white text-sm px-2 py-1 w-48 outline-none"
              />
            )}
            {
            SearchResults &&
            <SearchContents item={SearchResults}/> 
          }
          </div>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-1 group"
          >
            <Image
              src="/UserPic.jpg"
              height={40}
              width={40}
              className="rounded-full w-8 h-8 object-cover"
              alt="User profile picture"
            />
            <ChevronDown
              size={16}
              className={`text-white transition-transform duration-300 ${
                showProfileDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfileDropdown && <ProfileDropdown />}
        </div>
      </div>
    </nav>
  );
};

export default NetflixNavbar;
