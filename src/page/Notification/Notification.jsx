import React from "react";
import { Clock, Trash2, Bell } from "lucide-react";
import { Navigate } from "../../Navigate";
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useUpdateSeenMutation,
} from "../redux/api/shiftApi";
import { message } from "antd";

const Notification = () => {
  const { data: notificationData, isLoading } =
    useGetMyNotificationQuery();
console.log(notificationData)
  const [seenNotification, { isLoading: seenLoading }] =
    useUpdateSeenMutation();

  const [deleteNotification] =
    useDeleteNotificationMutation();

  const notifications =
    notificationData?.data?.result || [];

  const unreadCount =
    notificationData?.data?.meta?.unreadCount || 0;

  const handleReadAll = async () => {
    try {
      await seenNotification().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteNotification(id).unwrap();
      message.success(res?.message || "Notification deleted!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete notification.");
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Navigate />
          <h1 className="text-[16px] font-montserrat italic text-white">
            Notifications
          </h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleReadAll}
            disabled={seenLoading}
            className="px-3 py-2 text-xs rounded-full bg-[#822CE7] hover:bg-[#6d20d0] text-white transition"
          >
            {seenLoading ? "Loading..." : "Mark All Read"}
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="mb-4 flex items-center justify-between bg-[#1D1733] border border-[#2A2448] rounded-xl p-4">
        <div>
          <h3 className="text-white font-semibold">
            Total Notifications
          </h3>
          <p className="text-gray-400 text-sm">
            {notifications.length} notifications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Bell className="text-[#BB82FF]" />
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount} unread
          </span>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`border rounded-xl p-4 transition-all duration-200 hover:shadow-lg
              ${
                item.isRead
                  ? "border-[#2A2448] bg-[#1D1733]"
                  : "border-[#822CE7] bg-[#24123f]"
              }`}
            >
              <div className="flex justify-between gap-3">
                <div className="flex-1">
                  {/* Top Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#822CE7]/20 text-[#BB82FF]">
                      {item.type.replaceAll("_", " ")}
                    </span>

                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg">
                    {item.title}
                  </h3>

                  {/* Message */}
                  <p className="text-gray-300 mt-1">
                    {item.message}
                  </p>

                  {/* Order Info */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item?.data?.entityId && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                        ID: {item.data.entityId.slice(-6)}
                      </span>
                    )}

                    {item?.data?.meta?.orderCode && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                        Order #{item.data.meta.orderCode}
                      </span>
                    )}

                    {item?.data?.meta?.status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                        {item.data.meta.status}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                    <Clock size={14} />
                    {formatDate(item.createdAt)}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-400 transition"
                  title="Delete Notification"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <Bell
              size={60}
              className="mx-auto text-gray-600 mb-3"
            />
            <h3 className="text-white text-lg font-semibold">
              No Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              You don't have any notifications yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;