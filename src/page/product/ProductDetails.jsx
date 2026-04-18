import React from "react";
import { Navigate } from "../../Navigate";
import { FiEye, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code"; // optional if you want dynamic QR
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const venue = {
    name: "Midnight Lounge",
    owner: "Daniel Roberts",
    email: "daniel@midnightlounge.com",
    contact: "+1 (512) 555-0199",
    location: "Austin, Texas, USA",
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Product" />
  <div className="flex items-center gap-4">
          <img
            src={'https://i.pravatar.cc/150?img=1'}
            alt="Venue Logo"
            className="w-20 h-20 object-cover rounded-lg"
          />
          
        </div>
      {/* Venue Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl  space-y-3">
      <div className="border-b border-[#2A2448] p-3">
        <h1>Product Details </h1>
      </div>

        <div className="grid p-3 grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Product Name</p>
            <p>{venue.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Category Name</p>
            <p>{venue.owner}</p>
          </div>
          <div>
            <p className="text-gray-400">Availability</p>
            <button className="bg-[#22C55E33] px-2 mt-1 text-[#22C55E] rounded-full ">In Stock</button>
          </div>
          <div>
            <p className="text-gray-400">Slogan</p>
            <p>{venue.contact}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">Price</p>
            <p>$34.99</p>
          </div>
        </div>
      </div>



      {/* Update Details Button */}
      <div className="mt-6">
        <Link to="/dashboard/productManagement/edit/1">
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full">
            Edit Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;