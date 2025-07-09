import { Input } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import OrderTable from "../../components/Order/OrderTable";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { CgLayoutGrid } from "react-icons/cg";

const OrderPage = () => {
  const {data:getAllOrder}=useGetAllOrdersQuery(undefined)
console.log('all orer --------->',getAllOrder?.data?.data)
  const [activeTab, setActiveTab] = useState("allOrder");
  // const order= [
  //   {
  //     "orderId": "5302002",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 2,
  //     "orderDate": "Jan 10, 2020",
  //     "price": "$253.82",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302003",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 1,
  //     "orderDate": "Sep 4, 2020",
  //     "price": "$556.24",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302004",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 3,
  //     "orderDate": "Aug 30, 2020",
  //     "price": "$115.26",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302005",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 3,
  //     "orderDate": "Aug 29, 2020",
  //     "price": "$675.51",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302006",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 4,
  //     "orderDate": "Dec 26, 2020",
  //     "price": "$910.71",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302007",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 2,
  //     "orderDate": "Apr 27, 2020",
  //     "price": "$897.90",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302008",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 1,
  //     "orderDate": "May 5, 2020",
  //     "price": "$563.43",
  //     "status": "Pending"
  //   },
  //   {
  //     "orderId": "5302009",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 4,
  //     "orderDate": "Oct 15, 2020",
  //     "price": "$883.96",
  //     "status": "Rejected"
  //   },
  //   {
  //     "orderId": "5302010",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 3,
  //     "orderDate": "Jul 12, 2020",
  //     "price": "$162.15",
  //     "status": "Pending"
  //   },
  //   {
  //     "orderId": "5302011",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 2,
  //     "orderDate": "Jun 28, 2020",
  //     "price": "$378.34",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302012",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 1,
  //     "orderDate": "Nov 5, 2020",
  //     "price": "$245.19",
  //     "status": "Pending"
  //   },
  //   {
  //     "orderId": "5302013",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 5,
  //     "orderDate": "Mar 14, 2020",
  //     "price": "$794.55",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302014",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 3,
  //     "orderDate": "Jan 30, 2020",
  //     "price": "$322.14",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302015",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 2,
  //     "orderDate": "Sep 9, 2020",
  //     "price": "$501.27",
  //     "status": "Rejected"
  //   },
  //   {
  //     "orderId": "5302016",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 1,
  //     "orderDate": "May 25, 2020",
  //     "price": "$137.69",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302017",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 4,
  //     "orderDate": "Dec 18, 2020",
  //     "price": "$862.92",
  //     "status": "Pending"
  //   },
  //   {
  //     "orderId": "5302018",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 2,
  //     "orderDate": "Aug 11, 2020",
  //     "price": "$472.20",
  //     "status": "Completed"
  //   },
  //   {
  //     "orderId": "5302019",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 3,
  //     "orderDate": "Feb 22, 2020",
  //     "price": "$689.18",
  //     "status": "Pending"
  //   },
  //   {
  //     "orderId": "5302020",
  //     "product": "Basket with handles",
  //     "category": "Grocery",
  //     "quantity": 1,
  //     "orderDate": "Jul 1, 2020",
  //     "price": "$230.78",
  //     "status": "Completed"
  //   }
  // ]
  // 🛠️ Filter the orders based on activeTab
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
