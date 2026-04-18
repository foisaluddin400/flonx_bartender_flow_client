import React, { useState } from "react";
import { Upload, Form, Select, Input, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUpdateBartenderProfileMutation } from "../page/redux/api/userApi";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const CompleteProfile = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
const navigate = useNavigate();
  const [completeProfile, { isLoading }] =
    useUpdateBartenderProfileMutation();

  // Upload
  const onChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(
      `<img src="${src}" style="width:100%" />`
    );
  };

  // ✅ Submit
  const handleSubmit = async (values) => {
    if (!fileList.length) {
      message.error("Please upload profile image.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("profile_image", fileList[0].originFileObj);

      const data = {
        experience: values.experience,
        skills: values.skills, 
        bio: values.bio,
      };

      formData.append("data", JSON.stringify(data));

      const res = await completeProfile({data:formData}).unwrap();

      message.success(res?.message || "Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Submission failed!");
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 bg-[#0F0B1A]">
      <div className="w-full max-w-lg p-8 border border-[#2A2448] rounded-lg bg-[#822CE71A]">
        
        <h2 className="text-2xl font-semibold text-white mb-2 italic">
          Complete Your Bartender Profile
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Help venue owners understand your experience before sending shift requests.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="custom-form"
        >
          {/* Upload */}
          <Form.Item label="Profile Image" required>
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
                    Upload Image
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Experience */}
          <Form.Item
            label="Years of Experience"
            name="experience"
            rules={[{ required: true, message: "Enter experience" }]}
          >
            <Input
              type="number"
              placeholder="e.g. 2"
              className="custom-input"
            />
          </Form.Item>

          {/* ✅ Multiple Skills */}
          <Form.Item
  label="Primary Bar Skills"
  name="skills"
  rules={[{ required: true, message: "Add at least one skill" }]}
>
  <Select
    mode="tags"   // ✅ key part
    placeholder="Type and press enter to add skill"
    className="custom-select"
    tokenSeparators={[","]} 
  />
</Form.Item>

          {/* Bio */}
          <Form.Item
            label="Short Bio"
            name="bio"
            rules={[{ required: true, message: "Enter bio" }]}
          >
            <TextArea
              rows={4}
              placeholder="Write about yourself..."
              className="custom-input"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-full text-white flex justify-center items-center gap-2 ${
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
                "Submit"
              )}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CompleteProfile;