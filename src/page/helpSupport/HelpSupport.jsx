import React from "react";
import { Navigate } from "../../Navigate";
import { Button, Form, Input, message } from "antd";

const HelpSupport = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    message.success("Your message has been sent!");
    form.resetFields();
  };

  return (
    <div className="p-3 ">
          <div className="flex items-center py-4 ">
                   <Navigate></Navigate>
                   <h1 className="text-[16px] italic font-montserrat text-white">Help & Support </h1>
                 </div>

      {/* Venue Details */}
      <div className="border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className=" font-semibold pb-1 italic text-[18px]">Contact Support</h1>
          <p className="text-[#C9C6D6] italic">Send us your questions or concerns, and our team will get back to you.</p>
        </div>

        <div className="p-4">
          {/* Ant Design Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
           className="custom-form"
          >
            <Form.Item
              label="Contact Topic"
              name="topic"
              rules={[{ required: true, message: "Please enter a topic" }]}
            >
              <Input className="custom-input" placeholder="Enter the topic" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea className="custom-input" rows={8} placeholder="Type your message here..." />
            </Form.Item>

            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                Send Message
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;