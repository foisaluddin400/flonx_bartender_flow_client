import React, { useState } from "react";
import { Input, Pagination, Table } from "antd";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import EyeIco from "../../components/icon/EyeIco";
import { Link } from "react-router-dom";

const ManageShifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy Shift Data
  const dummyShifts = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    no: index + 1,
    name: `Bartender ${index + 1}`,
    email: `bartender${index + 1}@mail.com`,
    requestedOn: "12 Jun 2026",
    shiftDate: "15 Jun 2026",
    status: index % 2 === 0 ? "Approved" : "Pending",
    image: `https://i.pravatar.cc/150?img=${index + 10}`,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Bartender",
      key: "bartender",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt="bartender"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Requested On",
      dataIndex: "requestedOn",
      key: "requestedOn",
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            record.status === "Approved"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end">
          <Link to={`/dashboard/ManageShifts/details/${record.key}`}>
            <button className="w-[36px] h-[36px] text-lg bg-[#22C55E1A] flex justify-center items-center text-[#22C55E] rounded cursor-pointer">
            <EyeIco />
          </button>
          </Link>
        </div>
      ),
    },
  ];

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedShifts = dummyShifts.slice(start, end);

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      {/* Top Section */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Manage Shifts"} />

        <div className="flex  items-center">
          <Input placeholder="Search bartender..." className="custom-input" />

          <div className="flex gap-2">
            <div className=" px-3 border-[#2A2448] justify-between items-center">
              <select className="bg-[#1a1238] text-gray-300 px-4 py-2 rounded-lg border border-[#2A2448] outline-none">
                <option>Pending Request</option>
                <option>Ongoing</option>
                <option>Upcomming</option>
                <option>Completed</option>
              </select>
            </div>

            <Link to="/dashboard/ManageShifts/find_bartender">
            <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-3">
              <AddIco /> Find Bartender
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={paginatedShifts}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={dummyShifts.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ManageShifts;
