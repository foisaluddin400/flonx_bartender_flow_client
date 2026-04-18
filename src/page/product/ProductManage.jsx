import React, { useState } from "react";
import { Input, Pagination, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy Product Data
  const dummyProducts = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    no: index + 1,
    name: `Product ${index + 1}`,
    slogan: "Best drink in town",
    category: "Cocktail",
    price: `$${(10 + index).toFixed(2)}`,
    availability: index % 2 === 0 ? "Available" : "Out of Stock",
    image: `https://picsum.photos/200?random=${index + 1}`,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-md"
            alt="product"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Slogan",
      dataIndex: "slogan",
      key: "slogan",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Availability",
      key: "availability",
      render: (_, record) => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            record.availability === "Available"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {record.availability}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end gap-3 items-center">
          <Link to={`/dashboard/productManagement/details/${record.key}`}>
            <button className="w-[36px] h-[36px] text-lg bg-[#22C55E1A] flex justify-center items-center text-[#22C55E] rounded cursor-pointer">
              <LuEye />
            </button>
          </Link>

          <button className="w-[36px] h-[36px] text-lg bg-[#EF44441A] flex justify-center items-center text-[#EF4444] rounded cursor-pointer">
            <RiDeleteBin6Line />
          </button>
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
  const paginatedProducts = dummyProducts.slice(start, end);

  return (
    <div className="p-3 h-[87vh] overflow-auto">

      {/* Top Section */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Product Management"} />

        <div className="flex gap-4 items-center" >
          <Input
            placeholder="Search product..."
            
            className="custom-input" 
          />

          <div>
            <Link to="/dashboard/productManagement/add">
            <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-3">
            <AddIco /> Add New Product
          </button></Link>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={paginatedProducts}
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
          total={dummyProducts.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

    </div>
  );
};

export default ProductManage;