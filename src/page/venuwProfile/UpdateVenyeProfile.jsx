"use client";

import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Navigate } from "../../Navigate";
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "../redux/api/userApi";

const UpdateVenyeProfile = () => {
  const { data: profileData, isLoading: profileLoading } =
    useGetProfileQuery();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [fileList, setFileList] = useState([]);

  const profile = profileData?.data;

  // 🔥 set form data after API load
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile?.name,
        email: profile?.email,
        phone: profile?.phone,
        experience: profile?.experience,
        skills: profile?.skills,
        bio: profile?.bio,
      });
    }
  }, [profile, form]);

  // 🔥 preload image
  useEffect(() => {
    if (profile?.profile_image) {
      setFileList([
        {
          uid: "-1",
          name: "profile.png",
          status: "done",
          url: profile.profile_image,
        },
      ]);
    }
  }, [profile]);

  // Upload handler
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    window.open(src);
  };

  // 🔥 Submit
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // image optional
      if (fileList.length && fileList[0].originFileObj) {
        formData.append("profile_image", fileList[0].originFileObj);
      }

      const data = {
        name: values.name,
        phone: values.phone,
        experience: values.experience,
        skills: values.skills || [],
        bio: values.bio,
      };

      formData.append("data", JSON.stringify(data));

      await updateProfile({ data: formData }).unwrap();

      message.success("Profile updated successfully!");
      
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Update failed!");
    }
  };

  if (profileLoading) {
    return <p className="text-white p-3">Loading...</p>;
  }

  return (
    <div className="px-3 pb-5">

      {/* Header */}
      <div className="flex items-center py-4">
        <Navigate />
        <h1 className="text-[16px] italic text-white">
          Update Profile
        </h1>
      </div>

      {/* FORM */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="custom-form"
      >

        {/* Upload */}
        <Form.Item label="Profile Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8, color: "white" }}>
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Name */}
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input className="custom-input"/>
        </Form.Item>

        {/* Email */}
        <Form.Item name="email" label="Email">
          <Input disabled className="custom-input" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true }]}
        >
          <Input className="custom-input" />
        </Form.Item>

        {/* Experience */}
        <Form.Item name="experience" label="Experience (years)">
          <Input type="number" className="custom-input" />
        </Form.Item>

        {/* Skills */}
        <Form.Item name="skills" label="Skills">
          <Select
            mode="tags"
            placeholder="Type and press enter"
            tokenSeparators={[","]}
            className="custom-select"
          />
        </Form.Item>

        {/* Bio */}
        <Form.Item name="bio" label="Bio">
          <Input.TextArea rows={4} className="custom-input" />
        </Form.Item>

        {/* Submit */}
        <button
          htmlType="submit"
          disabled={isLoading}
          className={`px-4 py-3 rounded-full text-white flex justify-center items-center gap-2 ${
            isLoading
              ? "bg-[#b879ff]"
              : "bg-[#822CE7] hover:bg-[#4a0e8f]"
          }`}
        >
          {isLoading ? (
            <>
              <Spin size="small" />
              <span>Submitting...</span>
            </>
          ) : (
            "Update Profile"
          )}
        </button>

        
      </Form>

      {/* Note */}
      <div className="flex gap-2 mt-4 text-xs text-gray-400">
        <span className="text-red-400">!</span>
        Email cannot be changed
      </div>
    </div>
  );
};

export default UpdateVenyeProfile;