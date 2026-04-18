"use client";

import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PaymentIcon from "../../components/icon/PaymentIcon";
import ShopDetailsIco from "../../components/icon/ShopDetailsIco";
import { Navigate } from "../../Navigate";
import {
  useGetSingleShiftQuery,
  useUpdateShiftRequestMutation,
} from "../redux/api/shiftApi";
import { message, Spin } from "antd";

const Box = ({ title, value }) => (
  <div className="mt-2 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
    <h1 className="text-[#C9C6D6] text-sm mb-2">{title}</h1>
    <p className="text-white text-[14px]">{value}</p>
  </div>
);

const ShiftDetails = () => {
  const { id } = useParams();

  const [actionType, setActionType] = useState(null);

  const [updateAcceptRejectShift, { isLoading: isUpdating }] =
    useUpdateShiftRequestMutation();

  const { data, isLoading, isError } = useGetSingleShiftQuery({ id });

  if (isLoading) return <p className="text-white p-4">Loading...</p>;
  if (isError) return <p className="text-red-500 p-4">Error loading data</p>;

  const shift = data?.data;

  // 🔥 handle accept/reject
  const handleShiftAction = async (isAccept) => {
    setActionType(isAccept ? "accept" : "reject");

    try {
      const res = await updateAcceptRejectShift({
        id,
        data: { isAccept },
      }).unwrap();
      message.success(res?.message || "Action successful");
    } catch (err) {
      message.error(err?.data?.message || "Action failed");
      console.log(err);
    } finally {
      setActionType(null);
    }
  };

  return (
    <div className="px-4 pt-6 pb-28 text-white">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Navigate />
          <h1 className="text-[16px] italic font-montserrat">
            Shift Details
          </h1>
        </div>

        <Link to={`/dashboard/shifts/venueDetails/${shift?.venue?._id}`}>
          <button className="border flex gap-2 border-[#822CE7] text-[#822CE7] px-4 py-2 rounded-full text-sm">
            <ShopDetailsIco />
            Venue Details
          </button>
        </Link>
      </div>

      {/* Image + Title */}
      <div className="py-5">
        <img
          className="w-[90px] h-[90px] object-cover rounded-2xl"
          src={shift?.venue?.logo}
          alt="Logo"
        />
        <h2 className="mt-3 text-[20px] italic font-semibold">
          {shift?.venue?.name}
        </h2>
      </div>

      {/* Info */}
      <Box title="Location" value={shift?.venue?.address} />

      <Box
        title="Date"
        value={`${new Date(shift?.startDateTime).toDateString()} - ${new Date(
          shift?.endDateTime
        ).toDateString()}`}
      />

      <Box
        title="Time"
        value={`${new Date(shift?.startDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} — ${new Date(shift?.endDateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`}
      />

      <Box title="Contact Number" value={shift?.venue?.phone} />
      <Box title="Shift Status" value={shift?.status} />

      {/* Payment Info */}
      <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
        <h1 className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
          <PaymentIcon />
          Payment Info
        </h1>

        <div className="flex justify-between items-center">
          <p className="text-gray-400 text-sm">Shift Rate</p>
          <p className="text-white font-semibold">
            $ {shift?.shiftRate}
          </p>
        </div>
      </div>

      {/* 🔥 CONDITIONAL BUTTONS */}
      {shift?.status === "Requested" && (
        <div className="py-4 bg-[#0b0618] flex gap-3 bottom-0 left-0">
          
          {/* Reject */}
          <button
            onClick={() => handleShiftAction(false)}
            disabled={isUpdating}
            className="w-full py-3 rounded-full text-white flex justify-center items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500"
          >
            {isUpdating && actionType === "reject" ? (
              <>
                <Spin size="small" />
                <span>Processing...</span>
              </>
            ) : (
              "Decline Shift"
            )}
          </button>

          {/* Accept */}
          <button
            onClick={() => handleShiftAction(true)}
            disabled={isUpdating}
            className="w-full py-3 rounded-full text-white flex justify-center items-center gap-2 bg-gradient-to-br from-[#822CE7] to-[#BB82FF]"
          >
            {isUpdating && actionType === "accept" ? (
              <>
                <Spin size="small" />
                <span>Accepting...</span>
              </>
            ) : (
              "Accept Shift"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftDetails;