import React from "react";
import { Star, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "../../Navigate";
import { useGetProfileQuery } from "../redux/api/userApi";
import { PageLoader } from "../../components/Loading";
import NoData from "../../components/NoData";

const MyProfile = () => {
  const { data: profileData, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <PageLoader></PageLoader>;
  }

  if (isError) {
    return <NoData></NoData>;
  }

  const profile = profileData?.data;

  return (
    <div className="px-3 pb-5">
      
      {/* Header */}
      <div className="flex items-center py-4">
        <Navigate />
        <h1 className="text-[16px] font-montserrat italic text-white">
          My Profile
        </h1>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        {profile?.profile_image ? (
          <img
            src={profile.profile_image}
            alt="profile"
            className="w-20 h-20 rounded-2xl object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-[#822CE71A] flex items-center justify-center text-purple-400 text-xl font-semibold shadow-lg">
            {profile?.name?.slice(0, 2) || "NA"}
          </div>
        )}
      </div>

      {/* Card Container */}
      <div className="space-y-4">

        {/* Name */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Name</p>
          <p className="text-white text-sm italic">
            {profile?.name || "N/A"}
          </p>
        </div>

        {/* Email */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Email</p>
          <p className="text-white text-sm italic">
            {profile?.email || "N/A"}
          </p>
        </div>

        {/* Phone */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Contact Phone</p>
          <p className="text-white text-sm italic">
            {profile?.phone || "N/A"}
          </p>
        </div>

        {/* Experience */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Experience</p>
          <p className="text-white text-sm italic">
            {profile?.experience ? `${profile.experience} Years` : "N/A"}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-2">Primary Bar Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.length > 0 ? (
              profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-[#822CE71A] text-[#822CE7]"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs">No skills added</span>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Short Bio</p>
          <p className="text-white text-sm italic leading-relaxed">
            {profile?.bio || "No bio available"}
          </p>
        </div>

        {/* Rating (static for now) */}
        <div className="bg-[#822CE71A] border border-[#2A2448] rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">Overall Rating</p>
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>4.4 (112)</span>
          </div>
        </div>

        {/* Button */}
        <Link to={"/dashboard/UpdateProfile"}>
          <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-400 py-3 rounded-full text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition">
            <Pencil className="w-4 h-4" />
            Update Profile
          </button>
        </Link>

      </div>
    </div>
  );
};

export default MyProfile;