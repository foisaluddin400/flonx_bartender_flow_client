import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
export const Navigate = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className='font-montserrat'>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            
          }}
        >
          <h1
            onClick={() => navigate(-1)}
            className="flex gap-3 cursor-pointer"
          >
            <button className="w-10 h-10  rounded-full border border-purple-400/30 flex items-center justify-center bg-white/5 backdrop-blur-md text-white">
              <FaArrowLeft />
            </button>
            <span className="text-lg text-white font-semibold">{title}</span>
          </h1>
          
        </div>
    </div>
  )
}
