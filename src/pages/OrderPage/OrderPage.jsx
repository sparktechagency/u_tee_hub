import { Input } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import OrderTable from "../../components/Order/OrderTable";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { CgLayoutGrid } from "react-icons/cg";

const OrderPage = () => {
   const [searchText, setSearchText] = useState("");
   console.log("SearchText---->",searchText);
const { data: getAllOrder } = useGetAllOrdersQuery(
  searchText ? { search: searchText } : undefined
);
console.log('all orer --------->',getAllOrder?.data?.data)
  const [activeTab, setActiveTab] = useState("allOrder");

  const filteredOrders = activeTab === "allOrder"
    ?getAllOrder?.data?.data
    : getAllOrder?.data?.data.filter((item) => item.status.toLowerCase() === activeTab);
  return (
    <div>
    <div className="flex justify-between items-center pt-0 mb-3">
      {/* Tabs */}
      <div className="flex justify-start items-center gap-5 text-md md:text-xl font-semibold mb-3">
        <p
          onClick={() => setActiveTab("allOrder")}
          className={`cursor-pointer pb-1 ${
            activeTab === "allOrder"
              ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
              : "text-[#575757] font-title"
          }`}
        >
          All Order
        </p>
        <p
          onClick={() => setActiveTab("delivery-confirmed")}
          className={`cursor-pointer pb-1 ${
            activeTab === "delivery-confirmed"
              ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
              : "text-[#575757] font-title"
          }`}
        >
          Completed
        </p>
        <p
          onClick={() => setActiveTab("pending")}
          className={`cursor-pointer pb-1 ${
            activeTab === "pending"
              ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
              : "text-[#575757] font-title"
          }`}
        >
          Pending
        </p>
        <p
          onClick={() => setActiveTab("cancelled")}
          className={`cursor-pointer pb-1 ${
            activeTab === "cancelled"
              ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
              : "text-[#575757] font-title"
          }`}
        >
          Rejected
        </p>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-[300px]">
        <Input
          type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search anything here..."
          className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
        />
        <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
          <IoSearch className="text-[1.3rem]" />
        </span>
      </div>
    </div>

    {/* Table with filtered data */}
    <OrderTable order={filteredOrders} />
  </div>
  );
};

export default OrderPage;
