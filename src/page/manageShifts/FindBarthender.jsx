import React from "react";
import { Navigate } from "../../Navigate";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const bartenders = [1, 2, 3, 4];

const FindBarthender = () => {
  return (
    <div className="p-4 text-white">
      <Navigate title="Search Bartender" />

      {/* Search Bar */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Search by word"
          className="flex-1 bg-[#1D1733] border border-[#2A2448] rounded-full px-5 py-3 outline-none"
        />
        <button className="bg-gradient-to-r from-[#822CE7] to-[#BB82FF] px-6 py-3 rounded-full">
          Search
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {bartenders.map((item, index) => (
          <div
            key={index}
            className="bg-[#822CE71A] border border-[#2A2448] rounded-2xl p-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#2A2448] rounded-lg text-sm">
                RJ
              </div>
              <div>
                <p className="font-semibold italic">Roberts Junior</p>
                <p className="text-gray-400 text-sm">
                  robert@canaletto.com
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#2A2448] my-3"></div>

            {/* Info */}
            <div className="flex  justify-between text-sm">
              <div>
                <p className="text-gray-400">Experience</p>
                <p>2 Years</p>
              </div>

              <div>
                <p className="text-gray-400">Overall Rating</p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  4.4 (112)
                </p>
              </div>
            </div>
<div className="border-b border-[#2A2448] my-3"></div>
            {/* Button */}
            <Link to={'/dashboard/BartenderShifts/details/1'}>
            <button className="mt-4  bg-gradient-to-r from-[#822CE7] to-[#BB82FF] px-5 py-2 rounded-full text-sm">
              View Profile
            </button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindBarthender;