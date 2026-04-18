import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Upload handle
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
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    console.log("Uploaded Files:", fileList);
    message.success("Product added successfully!");
    form.resetFields();
    setFileList([]);
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Profile" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold pb-1">Update Profile</h1>
          <p className="text-[#C9C6D6]">
        Review and update your details as needed.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            {/* Product Image */}
            <Form.Item label="Product Image">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple
                className="custom-upload"
              >
                {fileList.length < 5 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8, color: "white" }}>Upload Venue Image here</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            {/* Product Name */}
           <div className="grid grid-cols-2 gap-4">
             <Form.Item
              label="Profile Name"
              name="name"
              rules={[{ required: true, message: "Please enter profile name" }]}
            >
              <Input
                className="custom-input"
                placeholder="Enter profile name"
              />
            </Form.Item>

            {/* Product Slogan */}
         

           <Form.Item
              label="Venue Email"
              name="email"
              rules={[{ required: true, message: "Please enter venue email" }]}
            >
              <Input
                className="custom-input"
                placeholder="Enter venue email"
              />
            </Form.Item>

            {/* Product Slogan */}
            <Form.Item
              label="Contact Number"
              name="contact"
            
              rules={[
                { required: true, message: "Please enter contact number" },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="Enter contact number"
              />
            </Form.Item>
 <Form.Item
              label="Location"
              name="location"
            
              rules={[
                { required: true, message: "Please enter location" },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="Enter location"
              />
            </Form.Item>
          

           </div>
            
      

            <Form.Item>
              <button
                type="submit"
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                Update Details
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
