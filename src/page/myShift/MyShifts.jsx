"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import LocationIco from "../../components/icon/LocationIco";
import CalenderIco from "../../components/icon/CalenderIco";
import image from "../../assets/header/image.png";
import { Link, useSearchParams } from "react-router-dom";
import DetailsIco from "../../components/icon/DetailsIco";
import { useGetMyShiftQuery } from "../redux/api/shiftApi";
import NoData from "../../components/NoData";
import { PageLoader } from "../../components/Loading";

const tabs = ["Requested", "Active", "Upcoming", "Completed", "Rejected", "Cancelled"]; // 🔥 added 2 new tabs: Rejected, Cancelled




const ShiftCard = ({ item }) => {
  const statusStyle = {
    Active: "bg-green-500/20 text-green-400",
    Upcoming: "bg-[#822CE733] text-[#822CE7]",
    Completed: "bg-[#3D8BFF33] text-[#3D8BFF]",
    Requested: "bg-yellow-500/20 text-yellow-300",
    Rejected: "bg-red-500/20 text-red-400",
    Cancelled: "bg-gray-500/20 text-gray-400",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-gradient-to-br mb-3 from-[#1a0f2e] to-[#140a24] rounded-2xl p-3 border border-[#2A2448] shadow-lg">
      
      {/* Top */}
      <div className="flex items-center justify-between">
        <img
          className="w-[60px] h-[60px] object-cover rounded-2xl"
          src={item.logo} 
          alt=""
        />

        <span
          className={`text-xs px-3 py-1 rounded-full ${statusStyle[item.status]}`}
        >
          • {item.status}
        </span>
      </div>

      {/* Title */}
      <div className="mt-2">
        <h3 className="text-white text-lg font-semibold">
          {item.title} {/* ✅ venue name */}
        </h3>

        <div className="flex items-center text-gray-400 text-[14px] gap-1">
          <LocationIco />
          {item.address} {/* ✅ venue address */}
        </div>
      </div>

      {/* Date + Time */}
      <div className="flex items-center justify-between mt-1 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <CalenderIco />
          {formatDate(item.start)}
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          {formatTime(item.start)} — {formatTime(item.end)}
        </div>
      </div>

      <hr className="border border-[#2A2448] my-4" />

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Shift Rate</p>
          <h2 className="text-white text-xl italic font-bold">
            ${item.price}
          </h2>
        </div>

        <Link to={`/dashboard/shifts/details/${item.id}`}>
          <button className="bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-white px-5 flex items-center gap-3 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
            View Details <DetailsIco />
          </button>
        </Link>
      </div>
    </div>
  );
};

const MyShifts = () => {
  const [searchParams] = useSearchParams();
  const urlStatus = searchParams.get("status");

  const [activeTab, setActiveTab] = useState("Active");

  useEffect(() => {
    if (urlStatus) {
      setActiveTab(urlStatus);
    }
  }, [urlStatus]);

  const { data, isLoading } = useGetMyShiftQuery({
    status: activeTab,
  });

  const formattedData =
    data?.data?.result?.map((item) => ({
      id: item._id,
      title: item.venue?.name,
      status: item.status,
      price: item.shiftRate,
      address: item.venue?.address,
      start: item.startDateTime,
      end: item.endDateTime,
      logo: item.venue?.logo,
    })) || [];

  return (
    <div className="p-3">
      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      {isLoading ? (
        <PageLoader></PageLoader>
      ) : formattedData.length > 0 ? (
        formattedData.map((item) => (
          <ShiftCard key={item.id} item={item} />
        ))
      ) : (
        <NoData></NoData>
      )}
    </div>
  );
};

export default MyShifts;
