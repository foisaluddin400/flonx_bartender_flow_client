import React from "react";
import { ShoppingBag, DollarSign, Package } from "lucide-react";
import HigherIco from "../icon/HigherIco";
import LowerIco from "../icon/LowerIco";
import ProductIco from "../icon/ProductIco";
import EarningIco from "../icon/EarningIco";

const Activity = () => {
  return (
    <div className="border border-[#2A2448] rounded-xl  mt-6">
      
      {/* Header */}
      <div className="flex border-b px-3 py-2 border-[#2A2448] justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-300">
          Showing activities for Today
        </h2>

        <select className="bg-[#1a1238] text-gray-300 px-4 py-2 rounded-lg border border-[#2A2448] outline-none">
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
        </select>
      </div>

      <div className="flex px-5 py-4 justify-between items-center">
        
        {/* Left Stats */}
        <div className="space-y-6">

          {/* Orders */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-purple-400 text-lg font-semibold">113</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <EarningIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total Earnings</p>
              <p className="text-purple-400 text-lg font-semibold">$ 1176</p>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm">Trending Items</p>
              <p className="text-purple-400 text-lg font-semibold">Mojito</p>
            </div>
          </div>

        </div>

        {/* Right Stats */}
        <div className="text-right space-y-10">

          <div className="text-green-400 flex items-center
            gap-1 text-sm font-medium">
            <HigherIco></HigherIco> 5% <span className="text-gray-400 ml-2">Higher Than Yesterday</span>
          </div>

          <div className="text-red-400 flex items-center
            gap-1 text-sm font-medium">
            <LowerIco></LowerIco> 5% <span className="text-gray-400 ml-2">Lower Than Yesterday</span>
          </div>

          <div className="text-purple-400 text-sm">
            16 <span className="text-gray-400">- Time Ordered</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Activity;