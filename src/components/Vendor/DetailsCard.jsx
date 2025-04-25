import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import icon from "../../assets/icon.png"
import icon2 from "../../assets/icon2.png"
import icon3 from "../../assets/icon3.png"
const DetailsCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4  gap-4 mt-6">
      
      {/* Total Order */}
      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-600">Total Order</div>
          <div className="bg-yellow-100 p-2 rounded-full">
          
       
            <img src={icon} alt="" />
          </div>
        </div>
        <div className="text-2xl font-bold text-black">10,293</div>
        <div className="flex items-center gap-1 text-sm ">
          <FaArrowTrendUp className="w-4 h-4 text-green-500" />
          <p className="text-gray-600"><span className="text-green-500">1.3% </span> Up from past week</p>
          
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-600">Total Sales</div>
          <div className="bg-green-100 p-2 rounded-full">
            
            <img src={icon2} alt="" />
          </div>
        </div>
        <div className="text-2xl font-bold text-black">$89,000</div>
          <div className="flex items-center gap-1 text-sm ">
          <FaArrowTrendDown  className="w-4 h-4 text-[#F93C65]" />
          <p className="text-gray-600"><span className="text-[#F93C65]">1.3% </span> Down from yesterday</p>
          
        </div>
      </div>

      {/* Order Completed */}
      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-600">Order Completed</div>
          <div className="bg-green-100 p-2 rounded-full">
          <img src={icon3} alt="" />
          </div>
        </div>
        <div className="text-2xl font-bold text-black">10,000</div>
        <div className="flex items-center gap-1 text-sm ">
          <FaArrowTrendDown  className="w-4 h-4 text-[#F93C65]" />
          <p className="text-gray-600"><span className="text-[#F93C65]">1.3% </span> Down from yesterday</p>
          
        </div>
      </div>

      {/* Cancel Order */}
      <div className="bg-white border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-600">Cancel Order</div>
          <div className="bg-green-100 p-2 rounded-full">
          <img src={icon3} alt="" className=""/>
          </div>
        </div>
        <div className="text-2xl font-bold text-black">12,000</div>
        <div className="flex items-center gap-1 text-sm ">
          <FaArrowTrendDown  className="w-4 h-4 text-[#F93C65]" />
          <p className="text-gray-600"><span className="text-[#F93C65]">1.3% </span> Down from yesterday</p>
          
        </div>
      </div>

    </div>
    );
};

export default DetailsCard;