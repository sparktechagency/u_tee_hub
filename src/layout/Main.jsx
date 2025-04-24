import { useState } from "react";

import MainHeader from "../components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    //     <div className="flex flex-col z-50">
    //  <div className="">
    //  <MainHeader toggleSidebar={toggleSidebar} />
    //  </div>
    //       <div className="flex w-full">
    //         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    //         <main className="p-5 bg-white h-[100vh] w-full md:w-[85%] lg:w-[85%]">
    //           <Outlet />
    //         </main>
    //       </div>
    //     </div>

    <div className="flex h-screen text-white">
      {/* Sidebar  */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto  px-8 pt-3 bg-[#F4F5F9]">
                  
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Main;
