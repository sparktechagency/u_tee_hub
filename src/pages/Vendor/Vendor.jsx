import { Input } from "antd";
import ActiveVendor from "../../components/Vendor/ActiveVendor";
import { IoSearch } from "react-icons/io5";


const Vendor = () => {
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
            />
            <span className=" text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center  cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
      <ActiveVendor/>
      <ActiveVendor/>
      <ActiveVendor/>
      <ActiveVendor/>
      <ActiveVendor/>
      <ActiveVendor/>
   
      </div>
        </div>
    );
};

export default Vendor;