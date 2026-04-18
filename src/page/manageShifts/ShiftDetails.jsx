import React from "react";
import { Navigate } from "../../Navigate";
import { FiEye, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code"; // optional if you want dynamic QR

const ShiftDetails = () => {
  const venue = {
    name: "Midnight Lounge",
    owner: "Daniel Roberts",
    email: "daniel@midnightlounge.com",
    contact: "+1 (512) 555-0199",
    location: "Austin, Texas, USA",
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Shifts" />
      <div className="flex items-center gap-4">
        <img
          src={"https://i.pravatar.cc/150?img=1"}
          alt="Venue Logo"
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>
      {/* Venue Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl  space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1>About Shift </h1>
        </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Venue Name</p>
            <p>{venue.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Owner Name</p>
            <p>{venue.owner}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p>{venue.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Contact Number</p>
            <p>{venue.contact}</p>
          </div>
         <div>
            <p className="text-gray-400">Availability</p>
            <button className="bg-[#22C55E33] px-2 mt-1 text-[#22C55E] rounded-full ">In Stock</button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-6 border border-[#2A2448] rounded-xl ">
        <div className="border-b border-[#2A2448] text-white p-3">
          <h1>Bartender Info </h1>
        </div>
        <div className="p-3 flex items-center text-white justify-between">
          <div className="">
            <img
              className="w-[70px] rounded-lg"
              src="https://i.pravatar.cc/150?img=1"
              alt="Bartender"
            />
          </div>
          <div>foisalrk2@gmail.com</div>
          <div>+1 (512) 555-0199</div>
          <div>⭐4.4 (112)</div>

          <div className="flex gap-2">
            <button className="bg-[#2A2448] p-3 rounded-lg hover:bg-[#3A2B5C]">
              <FiEye className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>





<div className="mt-6 border border-[#2A2448] rounded-xl ">
        <div className="border-b border-[#2A2448] text-white p-3">
          <h1>Shifting Info </h1>
        </div>
       <h1 className="text-white py-2 text-center ">Your shift request has not been accepted yet. You will be notified once it is confirmed.</h1>
      </div>






      {/* Update Details Button */}
      <div className="mt-6">
       <button className="bg-gradient-to-tr w-[185px] from-[#DC3545] to-[#FE4C5D] text-white shadow-md px-3 py-2 rounded-full">
          Dicline Request
        </button>
      </div>
    </div>
  );
};

export default ShiftDetails;
