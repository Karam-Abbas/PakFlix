import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import SearchContents from "./Searchcontents";
import SearchContents from "./Searchcontents";
const Searchbar = (props) => {
    const [searchreq,SetSearchReq] = useState('')
    const router = useRouter()
    const [SearchResults,SetSearchResults] = useState([])
    const handleSearch = (e)=>{
        e.preventDefault()
        const newTerm = e.target.value;
        SetSearchReq(newTerm);
        fetch('/api/search', {
          method: 'POST', // use POST when sending a body
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: newTerm }) // sending the query in the body
        }).then(res=>res.json()).then((res)=>SetSearchResults(res))
      }
  return (
    <div>
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-xl z-50 text-black">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Movies TvShows ..."
            className="w-full pl-12 pr-4 py-3 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          {/* search contents in a drop down list */}
          {
            SearchResults &&
            <SearchContents item={SearchResults}/> 
          }
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
