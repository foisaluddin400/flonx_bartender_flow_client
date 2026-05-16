import React, { useState } from "react";
import { Modal, Input, message } from "antd";

import ProfileIcon from "../../components/icon/ProfileIcon";
import SettingIco from "../../components/icon/SettingIco";
import LogoutIco from "../../components/icon/LogoutIco";
import ArrayRightIco from "../../components/icon/ArrayRightIco";
import { Navigate } from "../../Navigate";
import { Link, useNavigate } from "react-router-dom";
import LockIco from "../../components/icon/LockIco";
import DeleteIco from "../../components/icon/DeleteIco";
import { useDeleteAccountMutation } from "../redux/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";


const AccountSetting = () => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // open password popup
  const handleOpenDeleteModal = () => {
    setIsPasswordModalOpen(true);
  };

  // final delete submit
  const handleDeleteAccount = async () => {
  if (!password) {
    return message.error("Please enter your password");
  }

  Modal.confirm({
    title: "Are you sure?",
    content:
      "Your account will be permanently deleted. This action cannot be undone.",
    okText: "Yes, Delete",
    cancelText: "Cancel",
    centered: true,

    async onOk() {
      try {
        const res = await deleteAccount({
          password: password,
        }).unwrap();

        message.success(
          res?.message || "Account deleted successfully"
        );

        dispatch(logout());

        navigate("/login");

      } catch (err) {
        console.error(err);

        message.error(
          err?.data?.message || "Failed to delete account"
        );
      }
    },
  });
};
  return (
    <div className="px-3">
      <div>
        <div className="flex items-center py-4">
          <Navigate />
          <h1 className="text-[16px] italic text-white font-montserrat">
            Account Setting
          </h1>
        </div>

        {/* Change Password */}
        <Link to={"/dashboard/change_password"}>
          <div className="flex items-center my-2 justify-between bg-[#1A0E2E] rounded-2xl p-3 shadow-lg border border-[#2A2448]">
            <div className="flex items-center gap-3">
              <div className="bg-[#822CE71A] p-2 rounded-lg">
                <LockIco />
              </div>

              <span className="text-white text-sm font-medium">
                Change Password
              </span>
            </div>

            <span>
              <ArrayRightIco />
            </span>
          </div>
        </Link>

        {/* Delete Account */}
        <button
          onClick={handleOpenDeleteModal}
          className="w-full flex items-center gap-3 bg-[#EF44441A] rounded-2xl p-3 shadow-lg border border-[#EF44441A]"
        >
          <div className="bg-[#FFFFFF0D] p-2 rounded-lg">
            <DeleteIco />
          </div>

          <span className="text-[#EF4444] text-sm font-medium">
            Delete Account
          </span>
        </button>

        {/* Password Modal */}
        <Modal
          open={isPasswordModalOpen}
          onCancel={() => {
            setIsPasswordModalOpen(false);
            setPassword("");
          }}
          footer={null}
          centered
          
        >
        <div className="bg-[#161126] -m-5 -ml-6 -mr-6 p-4">
            <h2 className="text-xl text-white font-semibold mb-4">
            Confirm Password
          </h2>

          <p className="text-white mb-3">
            Please enter your password to continue.
          </p>

          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
          />

          <button
            onClick={handleDeleteAccount}
            disabled={isLoading}
            className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
          >
            {isLoading ? "Deleting..." : "Submit"}
          </button>
        </div>
        </Modal>
      </div>
    </div>
  );
};

export default AccountSetting;