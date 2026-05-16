import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import { useChangePasswordMutation } from "../redux/api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { message } from "antd";

const PassWordChange = () => {
    const [updatePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useDispatch();
const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password match check
    if (formValues.newPassword !== formValues.confirmPassword) {
      return message.error("Passwords do not match");
    }

    try {
      const data = {
        oldPassword: formValues.oldPassword,
        newPassword: formValues.newPassword,
        confirmNewPassword: formValues.confirmPassword,
      };

      const res = await updatePassword(data).unwrap();

      message.success(res?.message || "Password updated successfully");

      // reset form
      setFormValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      dispatch(logout());

      navigate('/login')

    } catch (err) {
      console.error(err);

      message.error(
        err?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <div className="flex items-center py-4 ">
               <Navigate></Navigate>
               <h1 className="text-[16px] italic text-white font-montserrat">Account Setting </h1>
             </div>
      <div className="">
     
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Old Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formValues.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formValues.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 text-[#C9C6D6]">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#822CE7] placeholder-white/70"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassWordChange;