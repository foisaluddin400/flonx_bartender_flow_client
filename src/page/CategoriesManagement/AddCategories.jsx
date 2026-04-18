import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
// import { useAddCategoryMutation } from "../redux/api/categoryApi";
// import { useAddCategoryMutation } from "../redux/api/productManageApi";
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
const AddCategories = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  // const [addcategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    // setLoading(true);

    // try {
    //   const formData = new FormData();

    //   fileList.forEach((file) => {
    //     formData.append("image", file.originFileObj);
    //   });
    //   formData.append("name", values.name);

    //   const res = await addcategory(formData);
    //   console.log(res);
    //   message.success(res.data.message);
    //   setLoading(false);
    //   setOpenAddModal(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.error(error);
    //   message.error(message?.data?.error);
    //   setOpenAddModal(false);
    // } finally {
    //   setLoading(false);
    //   setOpenAddModal(false);
    // }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="bg-[#0F0B1A] mx-[-25px] mt-[-20px]  mb-[-45px] rounded-lg p-4 border border-[#2A2448]">
        <div>
          <div className="font-bold text-center text-white">+ Add Category</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            {/* Category Name */}
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input placeholder="Enter title" className="custom-input" />
            </Form.Item>

            {/* Upload */}

            {/* Submit */}
            <Form.Item>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg"
              >
                {loading ? <Spin size="small" /> : "Add Category"}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCategories;
