import React from "react";
import { Navigate } from "../../Navigate";
import { Form, InputNumber, DatePicker, TimePicker, message } from "antd";

const AddManageShift = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Shift Data:", values);
    message.success("Shift request sent successfully!");
    form.resetFields();
  };

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Add Manage Shift" />

      <div className="mt-6 border text-white border-[#2A2448] rounded-xl space-y-3">
        <div className="border-b border-[#2A2448] p-3">
          <h1 className="text-xl font-semibold pb-1">Send Shift Request</h1>
          <p className="text-[#C9C6D6]">
            Invite this bartender to work your upcoming shift.
          </p>
        </div>

        <div className="p-4">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="custom-form"
          >
            <div className="grid grid-cols-2 gap-4">
              
              {/* Shift Date */}
              <Form.Item
                label="Shift Date"
                name="date"
                rules={[{ required: true, message: "Please select shift date" }]}
              >
                <DatePicker
                  className="custom-input w-full"
                  placeholder="Select date"
                />
              </Form.Item>

              {/* Shift Rate */}
              <Form.Item
                label="Enter Shift Rate ($)"
                name="rate"
                rules={[{ required: true, message: "Please enter shift rate" }]}
              >
                <InputNumber
                  className="custom-input w-full"
                  min={0}
                  placeholder="Enter shift rate"
                />
              </Form.Item>

              {/* Start Time */}
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[{ required: true, message: "Please select start time" }]}
              >
                <TimePicker
                  className="custom-input w-full"
                  format="HH:mm"
                />
              </Form.Item>

              {/* End Time */}
              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <TimePicker
                  className="custom-input w-full"
                  format="HH:mm"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <button
                type="submit"
                className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full"
              >
                Send Request
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddManageShift;