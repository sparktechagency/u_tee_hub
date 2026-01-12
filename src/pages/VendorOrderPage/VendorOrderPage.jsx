import { Input, Select } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import OrderTable from "../../components/Order/OrderTable";
import { useGetAllGeneralOrdersQuery } from "../../redux/features/order/orderApi";
import GeneralOrderTable from "./GeneralOrderTable";


const VendorOrderPage = () => {
      const [page, setPage] = useState(1);
  const [status, setStatus] = useState(undefined);
   const [searchText, setSearchText] = useState("");
   console.log("SearchText---->",searchText);
  // Build query params - only include defined values
  const queryParams = {
    page,
    limit: 10,
    ...(searchText && { search: searchText }),
    ...(status && { status }),

  };

  const { data: getAllOrder } = useGetAllGeneralOrdersQuery(
    Object.keys(queryParams).length > 0 ? queryParams : undefined
  );
console.log('all orer --------->',getAllOrder?.data?.data)
  // Status options based on backend enum
  const statusOptions = [
    { value: "pending", label: "pending" },
    { value: "process", label: "process" },
    { value: "delivered", label: "delivered" },

    { value: "cancelled", label: "cancelled" },
  ];




    const meta = getAllOrder?.data?.meta
     const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center pt-0 mb-3 gap-3">
        {/* Filter Dropdowns */}
        <div className="flex justify-start items-center gap-4 text-black">
          {/* Status Filter */}
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={statusOptions}
            placeholder="Select Status"
            className="w-[180px]"
            allowClear
            style={{ height: "42px",color: "black" }}
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
    <GeneralOrderTable order={getAllOrder?.data?.data} handlePageChange={handlePageChange} meta={meta} page={page} />
  </div>
  );
};

export default VendorOrderPage;
