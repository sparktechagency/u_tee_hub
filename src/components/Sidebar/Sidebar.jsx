import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import {
  IoBagAddOutline,
  IoCloseSharp,
  IoLogInOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { GoQuestion } from "react-icons/go";
 
import { LuSquareMenu } from "react-icons/lu";
import { useState } from "react"; // Import useState
import logo from "../../assets/Logo.png"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log("current path===>",currentPath);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Track the dropdown state
const user = useAppSelector(selectCurrentUser);
console.log("user",user);
const dispatch = useDispatch()
  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  // Check if any settings submenu is active
  const isSettingsActive = currentPath.startsWith("/setting");

  // Handle toggling of the settings dropdown
  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
const handleLogout=()=>{
dispatch(logout())
}
  return (
    <div
      className={`fixed lg:static px-3 bg-white text-[#0D0D0D] w-[70%] sm:w-[70%] md:w-[15%] lg:w-[15%]  overflow-y-auto py-5 md:py-0 z-50 transition-transform ${
        isOpen ? "translate-x-0 top-0 left-0 " : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-[#0D0D0D] focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>
  <div>
    
  </div>
      {/* Sidebar Menu */}
        <div className="flex justify-center items-center mt-0">
        <img src={logo} className="w-32 "/>
        </div>
      <ul className="-mt-2 pl-5 text-[10px]">
        {/* Dashboard Page */}
        <Link to="/">
          <li
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/") ? "bg-[#00c0b5] text-white px-3 py-3 rounded-xl" : ""
            }`}
          >
            <FaHome className="w-5 h-5" />
            <p className="text-lg font-semibold">Dashboard</p>
          </li>
        </Link>

        {/* User Page */}
        <Link to="/client">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/client") ? "bg-[#00c0b5] text-white px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">Client</p>
          </li>
        </Link>
        
        {/* Vendor */}
        <Link to="/vendor">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/vendor") ? "bg-[#00c0b5] text-white px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">Vendor</p>
          </li>
        </Link>

        {/* Order */}
        <Link to="/order">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/order") ? "bg-[#00c0b5] text-white px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <LuSquareMenu className="w-5 h-5" />
            <p className="text-lg font-semibold">Order</p>
          </li>
        </Link>

        {/* Make Vendor */}
        <Link to="/makeVendor">
          <li
            className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
              isActive("/makeVendor") ? "bg-[#00c0b5] text-white px-3 py-3 rounded-2xl" : ""
            }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">Make Admin</p>
          </li>
        </Link>

        {/* Settings */}
        <button
          onClick={toggleSettingsDropdown} // Toggle the dropdown
          className={`flex justify-between items-center gap-2 mt-5 cursor-pointer py-2 whitespace-nowrap transition-all duration-300 ease-in-out ${
            isSettingsActive ? "bg-[#00c0b5] text-white pl-3 pr-5 py-3 rounded-2xl" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center gap-2">
            <IoMdSettings className="w-5 h-5" />
            <p className="text-lg font-semibold">Settings</p>
          </div>
          <SlArrowDown className="w-5 h-5 text-right ml-5" />
        </button>

        {/* Settings Submenu */}
        {isSettingsOpen && (
          <ul className="text-right ml-9 py-3 ">
            <Link to="/setting/aboutUs">
              <li
                className={`py-[5px] flex items-center gap-2 transition-all duration-300 ease-in-out mb-3 ${
                  isActive("/setting/aboutUs") ? "text-[#00c0b5]" : ""
                }`}
              >
                <IoMdInformationCircleOutline className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">About Us</p>
              </li>
            </Link>

            <Link to="/setting/privacy">
              <li
                className={`py-2 flex items-center gap-2 transition-all duration-300 ease-in-out mb-3 ${
                  isActive("/setting/privacy") ? "text-[#00c0b5]" : ""
                }`}
              >
                <MdOutlinePrivacyTip className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Privacy Policy</p>
              </li>
            </Link>

            <Link to="/setting/policy">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out mb-3 ${
                  isActive("/setting/policy") ? "text-[#00c0b5]" : ""
                }`}
              >
                <FaRegBookmark className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Terms and Policy</p>
              </li>
            </Link>

            <Link to="/setting/faq">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out mb-3 ${
                  isActive("/setting/faq") ? "text-[#00c0b5]" : ""
                }`}
              >
                <GoQuestion className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">FAQ</p>
              </li>
            </Link>
            <Link to="/setting/support">
              <li
                className={`pb-2 flex items-center gap-2 transition-all duration-300 ease-in-out  ${
                  isActive("/setting/support") ? "text-[#00c0b5]" : ""
                }`}
              >
                <GoQuestion className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Support</p>
              </li>
            </Link>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-5  w-[90%] px-5">
  {
    user? (
            <button onClick={()=>handleLogout()}
        className="flex items-center gap-2 w-full px-0 py-3 border-2 border-[#00c0b5] text-[#00c0b5] hover:bg-[#00c0b5] hover:text-white rounded-xl duration-200 justify-center"
      >
         <IoLogInOutline className="w-7 h-7 font-bold text-2xl" />
        <span className="text-lg text-title font-bold">Logout</span>
      </button>
 

    ):(
        <Link to="/sign-in">

    <button
      className="flex items-center gap-2 w-full px-0 py-3 border-2 border-[#00c0b5] text-[#00c0b5] hover:bg-[#00c0b5] hover:text-white rounded-xl duration-200 justify-center"
    >
    
      <span className="text-lg text-title font-bold">Login</span>
    </button>
  </Link>
    )
  }
</div>

    </div>
  );
};

export default Sidebar;
