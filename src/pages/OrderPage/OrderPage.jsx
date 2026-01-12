import { Input, Select } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import OrderTable from "../../components/Order/OrderTable";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";

const OrderPage = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(undefined);
  const [deliveryOption, setDeliveryOption] = useState(undefined);
    const [page, setPage] = useState(1);
  console.log("SearchText---->", searchText);
  console.log("Status---->", status);
  console.log("DeliveryType---->", deliveryOption);

  // Build query params - only include defined values
  const queryParams = {
    page,
    limit: 10,
    ...(searchText && { search: searchText }),
    ...(status && { status }),
    ...(deliveryOption && {deliveryOption }),
  };

  const { data: getAllOrder } = useGetAllOrdersQuery(
    Object.keys(queryParams).length > 0 ? queryParams : undefined
  );

  console.log("all order --------->", getAllOrder?.data?.data);
const meta = getAllOrder?.data?.meta
  // Status options based on backend enum
  const statusOptions = [
    { value: "offered", label: "Offered" },
    { value: "rejected", label: "Rejected" },
    { value: "accepted", label: "Accepted" },
    { value: "delivery-requested", label: "Delivery Requested" },
    { value: "delivery-confirmed", label: "Delivery Confirmed" },
    { value: "revision", label: "Revision" },
  ];

  // Delivery type options based on backend enum
  const deliveryTypeOptions = [
    { value: "pickup", label: "Pickup" },
    { value: "courier", label: "Courier" },
    { value: "pickupAndCourier", label: "Pickup & Courier" },
  ];
 const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pt-0 mb-3 gap-3">
        {/* Filter Dropdowns */}
        <div className="flex justify-start items-center gap-4">
          {/* Status Filter */}
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={statusOptions}
            placeholder="Select Status"
            className="w-[180px]"
            allowClear
            style={{ height: "42px" }}
          />

          {/* Delivery Type Filter */}
          <Select
            value={deliveryOption}
            onChange={(value) => setDeliveryOption(value)}
            options={deliveryTypeOptions}
            placeholder="Select Delivery Type"
            className="w-[200px]"
            allowClear
            style={{ height: "42px" }}
          />
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
      <OrderTable order={getAllOrder?.data?.data} handlePageChange={handlePageChange} meta={meta} page={page} />
    </div>
  );
};

export default OrderPage;