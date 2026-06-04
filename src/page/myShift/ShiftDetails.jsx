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
import { PageLoader } from "../../components/Loading";
import NoData from "../../components/NoData";
import { Star } from "lucide-react";

const Box = ({ title, value }) => (
  <div className="mt-2 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
    <h1 className="text-[#C9C6D6] text-sm mb-2">{title}</h1>
    <p className="text-white text-[14px]">{value}</p>
  </div>
);

const ShiftDetails = () => {
  const { id } = useParams();
  console.log(id)

  const [actionType, setActionType] = useState(null);

  const [updateAcceptRejectShift, { isLoading: isUpdating }] =
    useUpdateShiftRequestMutation();

  const { data, isLoading, isError } = useGetSingleShiftQuery({ id });
  console.log(data);
  if (isLoading) return <PageLoader></PageLoader>;
  if (isError) return <NoData></NoData>;

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
          <h1 className="text-[16px] italic font-montserrat">Shift Details</h1>
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
          shift?.endDateTime,
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
          <p className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
            Shift Rate
          </p>
          <p className="text-white font-semibold">{shift?.shiftRate}$ Hourly</p>
        </div>
      </div>

      <div className="bg-[#822CE71A] border mt-3 border-[#2A2448] rounded-xl p-4">
        <p className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
          Overall Rating
        </p>
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <Star className="w-4 h-4 fill-yellow-400" />
          <span>{shift?.avgRating}</span>
        </div>
      </div>

      <div className="bg-[#822CE71A] border mt-3 border-[#2A2448] rounded-xl p-4">
        <p className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
          Tip info
        </p>
        <div className="flex justify-between">
          <div className=" text-white text-sm">
            <p className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
              Number of Tips
            </p>
            <span>{shift?.totalTipCount}</span>
          </div>
          <div>
            <p className="text-[#C9C6D6] text-sm mb-3 flex items-center gap-2">
              Total Tips
            </p>
            <span>{shift?.totalTipAmount}$</span>
          </div>
        </div>
      </div>

      <div className="bg-[#1A0E2E] p-5 rounded-2xl text-center mt-4">
        <h1 className="text-lg font-semibold">
          Your shift starts in {new Date(shift?.startDateTime).toLocaleString()}{" "}
          - {new Date(shift?.endDateTime).toLocaleString()}
        </h1>

        <h1 className="text-gray-400 text-sm mt-2">
          You will be able to start managing orders once the shift begins.
        </h1>
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
