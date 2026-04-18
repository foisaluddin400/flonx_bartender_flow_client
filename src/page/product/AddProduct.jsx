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

const AddProduct = () => {
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
      <Navigate title="Add Product" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold pb-1">Add New Product</h1>
          <p className="text-[#C9C6D6]">
            Enter product details to display on your Venue menu.
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
                    <div style={{ marginTop: 8, color: "white" }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            {/* Product Name */}
           <div className="grid grid-cols-2 gap-4">
             <Form.Item
              label="Product Name"
              name="name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input
                className="custom-input"
                placeholder="Enter product name"
              />
            </Form.Item>

            {/* Product Slogan */}
            <Form.Item
              label="Product Slogan"
              name="slogan"
              rules={[
                { required: true, message: "Please enter product slogan" },
              ]}
            >
              <Input
                className="custom-input"
                placeholder="Enter product slogan"
              />
            </Form.Item>

            {/* Product Category */}
            <Form.Item
              label="Product Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                className="custom-select"
                placeholder="Select category"
                dropdownClassName="custom-select-dropdown"
                suffixIcon={<></>} // Optional: Remove default icon if you want a custom one
              >
                <Option value="beverage">Beverage</Option>
                <Option value="snack">Snack</Option>
                <Option value="main-course">Main Course</Option>
                <Option value="dessert">Dessert</Option>
              </Select>
            </Form.Item>

            {/* Product Price */}
            <Form.Item
              label="Product Price ($)"
              name="price"
              rules={[
                { required: true, message: "Please enter product price" },
              ]}
            >
              <InputNumber
                className="custom-input w-full"
                min={0}
                placeholder="Enter product price"
              />
            </Form.Item>

           </div>
            {/* Availability */}
            <Form.Item
              label="Availability"
              name="availability"
              rules={[
                { required: true, message: "Please select availability" },
              ]}
            >
              <Select
                className="custom-select"
                placeholder="Select availability"
                dropdownClassName="custom-select-dropdown"
                suffixIcon={<></>} // Optional: Remove default icon if you want a custom one
              >
                <Option value="available">Available</Option>
                <Option value="not-available">Not Available</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                Add Product
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
