import { Input } from "antd";
import ActiveVendor from "../../components/Vendor/ActiveVendor";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAllUserQuery } from "../../redux/features/user/userApi";

const Vendor = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
  const {data:alluser}=useAllUserQuery(searchTerm)
  console.log("all user",alluser?.data);
    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  return (
    <div>
      <div className="flex justify-between items-center pt-0  my-3">
        <div>
          <p className="text-[#35BEBD] font-title text-3xl font-bold">
            Active Vendor
          </p>
        </div>
        <div>
          <div className="relative w-full sm:w-[300px] ">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3   outline-none w-full rounded-full px-3"
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            <span className=" text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center  cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>

       <div className="grid grid-cols-4 gap-5 my-5">
  {alluser?.data?.length > 0 ? (
  alluser?.data?.filter(user => user?.profile?.role === "vendor")
  ?.map((vendor, idx) => <ActiveVendor key={idx} vendor={vendor} />)
  ) : (
    <p className="text-black">No Vendors found.</p>
  )}
</div>

    </div>
  );
};

export default Vendor;
