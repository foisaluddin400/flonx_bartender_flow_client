"use client";

import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetMyShiftQuery } from "../../page/redux/api/shiftApi";
import LocationIco from "../icon/LocationIco";
import CalenderIco from "../icon/CalenderIco";
import DetailsIco from "../icon/DetailsIco";

const Card = ({ item }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-gradient-to-br from-[#1a0f2e] to-[#140a24] rounded-2xl p-4 border border-[#2A2448] shadow-lg mb-5">
      <div className="flex justify-between">
        <img
          className="w-[60px] h-[60px] rounded-2xl"
          src={item.logo}
          alt=""
        />
        <div>
          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">
          {item.status}
        </span>
        </div>
      </div>

      <h3 className="text-white mt-2">{item.title}</h3>
      <div className="flex text-gray-400 text-sm gap-1">
        <LocationIco /> {item.address}
      </div>

      <div className="flex justify-between text-gray-400 text-sm mt-1">
        <div className="flex gap-1">
          <CalenderIco /> {formatDate(item.start)}
        </div>
        <div className="flex gap-1">
          <Clock size={14} />
          {formatTime(item.start)} — {formatTime(item.end)}
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <h2 className="text-white font-bold">${item.price}</h2>

        <Link to={`/dashboard/shifts/details/${item.id}`}>
          <button className="text-sm flex items-center gap-2 text-white bg-purple-500 px-3 py-1 rounded-full">
            Details <DetailsIco />
          </button>
        </Link>
      </div>
    </div>
  );
};

const Section = ({ title, status }) => {
  const { data, isLoading } = useGetMyShiftQuery({ status });

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
    <div className="mt-8">
      <div className="flex justify-between mb-3">
        <h2 className="text-white italic">{title}</h2>

        {/* 🔥 View All with status */}
        <Link to={`/dashboard/shifts?status=${status}`}>
          <span className="text-blue-400 cursor-pointer">View All</span>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : formattedData.length > 0 ? (
        formattedData.slice(0, 4).map((item) => (
          <Card key={item.id} item={item} />
        ))
      ) : (
        <p className="text-gray-500">No data</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-3">
      <Section title="Active Shifts" status="Active" />
      <Section title="Upcoming Shifts" status="Upcoming" />
      <Section title="Shift Requests" status="Requested" />
      <Section title="Rejected Shifts" status="Rejected" />
      <Section title="Cancelled Shifts" status="Cancelled" />
      <Section title="Completed Shifts" status="Completed" />
    </div>
  );
};

export default Dashboard;