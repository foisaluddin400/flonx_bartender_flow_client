import { Form, Input, message, Modal, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
// import { useUpdateCategoryMutation } from "../redux/api/categoryApi";
import { imageUrl } from "../redux/api/baseApi";

const EditCategories = ({ editModal, setEditModal, selectedCategory }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [updateCategory] = useUpdateCategoryMutation();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // ✅ Whenever modal opens, fill default data again
  useEffect(() => {
    if (editModal && selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory?.name,
      });

      setFileList([
        {
          uid: "-1",
          name: "category-image.png",
          status: "done",
          url: `${imageUrl}${selectedCategory?.imageUrl}`,
        },
      ]);
    }
  }, [editModal, selectedCategory, form]);

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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    // setLoading(true);
    // try {
    //   const formData = new FormData();
    //   if (fileList.length && fileList[0].originFileObj) {
    //     formData.append("image", fileList[0].originFileObj);
    //   }
    //   formData.append("name", values.name);

    //   const res = await updateCategory({ formData, id: selectedCategory?._id });
    //   message.success(res?.data?.message || "Updated successfully");
    //   setEditModal(false);
    // } catch (error) {
    //   console.error(error);
    //   message.error(error?.data?.message || "Update failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
     <Modal
      centered
     open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
     
    >
      <div className="bg-[#0F0B1A] mx-[-25px] mt-[-20px]  mb-[-45px] rounded-lg p-4 border border-[#2A2448]">
        <div>
          <div className="font-bold text-center text-white">+ Edit Category</div>

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
    <Input
      placeholder="Enter title"
      className="custom-input"
    />
  </Form.Item>

  {/* Upload */}


  {/* Submit */}
  <Form.Item>
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg"
    >
      {loading ? <Spin size="small" /> : "Edit Category"}
    </button>
  </Form.Item>

</Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategories;
