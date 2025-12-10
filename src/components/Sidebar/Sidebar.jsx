import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import {
  IoCloseSharp,
  IoLogInOutline,
} from "react-icons/io5";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { GoQuestion } from "react-icons/go";
import { LuSquareMenu } from "react-icons/lu";
import { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";
import { useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      toggleSidebar && isOpen && toggleSidebar();
    }
  }, [currentPath]);

  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  // Check if any settings submenu is active
  const isSettingsActive = currentPath.startsWith("/setting");

  // Handle toggling of the settings dropdown
  const toggleSettingsDropdown = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Menu items configuration
  const menuItems = [
    { path: "/", icon: FaHome, label: "Dashboard" },
    { path: "/client", icon: FaRegUser, label: "Client" },
    { path: "/vendor", icon: FaRegUser, label: "Vendor" },
    { path: "/order", icon: LuSquareMenu, label: "Custom Order" },
    { path: "/generalOrder", icon: LuSquareMenu, label: "General Order" },
    { path: "/makeVendor", icon: FaRegUser, label: "Make Admin" },
  ];

  // Settings submenu items
  const settingsItems = [
    { path: "/setting/aboutUs", icon: IoMdInformationCircleOutline, label: "About Us" },
    { path: "/setting/privacy", icon: MdOutlinePrivacyTip, label: "Privacy Policy" },
    { path: "/setting/policy", icon: FaRegBookmark, label: "Terms and Policy" },
    { path: "/setting/faq", icon: GoQuestion, label: "FAQ" },
    { path: "/setting/support", icon: GoQuestion, label: "Support" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static 
          top-0 left-0 
          h-screen lg:h-auto
          bg-white text-[#0D0D0D] 
          shadow-xl lg:shadow-none
          z-50 
          transition-all duration-300 ease-in-out
          overflow-y-auto
          
          /* Width for different screens */
          w-[280px] sm:w-[300px] md:w-[280px] lg:w-[250px] xl:w-[280px] 2xl:w-[300px]
          
          /* Transform for mobile menu */
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          
          /* Padding */
          px-3 sm:px-4 py-4 sm:py-5 lg:py-3
        `}
      >
        {/* Close Button (Mobile/Tablet Only) */}
        <button
          onClick={toggleSidebar}
          className="
            absolute top-3 right-3 
            lg:hidden 
            text-white bg-[#0D0D0D] hover:bg-[#00c0b5]
            focus:outline-none 
            p-2 sm:p-2.5 
            rounded-full
            transition-colors duration-200
          "
        >
          <IoCloseSharp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center items-center mb-4 sm:mb-6 lg:mb-4">
          <img 
            src={logo} 
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-28 xl:w-32 2xl:w-36" 
          />
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-2 sm:space-y-3 px-2 sm:px-3 lg:px-2">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <li
                className={`
                  flex items-center gap-2 sm:gap-3 
                  cursor-pointer 
                  transition-all duration-300 ease-in-out
                  rounded-xl sm:rounded-2xl
                  py-2.5 sm:py-3 px-3 sm:px-4
                  hover:bg-gray-100
                  ${isActive(item.path) 
                    ? "bg-[#00c0b5] text-white hover:bg-[#00a89e]" 
                    : ""
                  }
                `}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold truncate">
                  {item.label}
                </p>
              </li>
            </Link>
          ))}

          {/* Settings Dropdown */}
          <li>
            <button
              onClick={toggleSettingsDropdown}
              className={`
                flex justify-between items-center 
                w-full
                gap-2 sm:gap-3 
                cursor-pointer 
                py-2.5 sm:py-3 px-3 sm:px-4
                whitespace-nowrap 
                transition-all duration-300 ease-in-out
                rounded-xl sm:rounded-2xl
                hover:bg-gray-100
                ${isSettingsActive 
                  ? "bg-[#00c0b5] text-white hover:bg-[#00a89e]" 
                  : ""
                }
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <IoMdSettings className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <p className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold">
                  Settings
                </p>
              </div>
              {isSettingsOpen ? (
                <SlArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <SlArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </button>

            {/* Settings Submenu */}
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isSettingsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <ul className="ml-4 sm:ml-6 mt-2 space-y-1 sm:space-y-2 border-l-2 border-gray-200 pl-3 sm:pl-4">
                {settingsItems.map((item) => (
                  <Link to={item.path} key={item.path}>
                    <li
                      className={`
                        flex items-center gap-2 
                        py-2 px-2 sm:px-3
                        rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:bg-gray-100
                        ${isActive(item.path) 
                          ? "text-[#00c0b5] bg-[#00c0b5]/10" 
                          : ""
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm lg:text-xs xl:text-sm font-semibold truncate">
                        {item.label}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </li>
        </ul>

        {/* Logout/Login Button */}
        <div className="mt-8 sm:mt-10 px-2 sm:px-3 lg:px-2 pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="
                flex items-center justify-center gap-2 
                w-full 
                px-4 py-2.5 sm:py-3 
                border-2 border-[#00c0b5] 
                text-[#00c0b5] 
                hover:bg-[#00c0b5] hover:text-white 
                rounded-xl 
                transition-all duration-200
                group
              "
            >
              <IoLogInOutline className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-300" />
              <span className="text-sm sm:text-base lg:text-sm xl:text-base font-bold">
                Logout
              </span>
            </button>
          ) : (
            <Link to="/sign-in" className="block">
              <button
                className="
                  flex items-center justify-center gap-2 
                  w-full 
                  px-4 py-2.5 sm:py-3 
                  border-2 border-[#00c0b5] 
                  text-[#00c0b5] 
                  hover:bg-[#00c0b5] hover:text-white 
                  rounded-xl 
                  transition-all duration-200
                "
              >
                <IoLogInOutline className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base lg:text-sm xl:text-base font-bold">
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;