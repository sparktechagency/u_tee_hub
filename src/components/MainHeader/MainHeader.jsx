
import { Link, useNavigate } from "react-router-dom";

import { IoIosNotificationsOutline } from "react-icons/io";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useSingleAdminQuery, useSingleUserQuery } from "../../redux/features/user/userApi";
const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
const user = useAppSelector(selectCurrentUser)
const {data:singleAdmin}=useSingleAdminQuery(user?.id)
const admin = singleAdmin?.data
// console.log("single user---->",singleAdmin);
  return (
    <div className="relative ">
      <header className=" bg-white shadow-sm">
        <div className="flex justify-end items-center px-5 md:px-10 h-[80px]">
          {/* <div onClick={() => navigate("/")}>
       
            <h1 className="text-3xl text-white font-bold">DASHBOARD</h1>
          </div> */}
          <div className="flex gap-5 items-center">
            <div>
        {/* <Link to={"/notification"}> 
           <IoIosNotificationsOutline className="text-[#35BEBD] text-3xl "/>
           </Link> */}
            </div>
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-default bg-[#00c0b5] px-5 py-2 rounded-2xl"
            >
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
                alt="User Avatar"
              />
             <div>
             <h3 className="hidden md:block text-white text-lg font-semibold">
          {admin?.fullName}
              </h3>
              <p>{admin?.role}</p>
             </div>
   
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
