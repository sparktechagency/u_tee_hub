import { useState } from "react";

import MainHeader from "../components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col z-50">
 <div className="">
 <MainHeader toggleSidebar={toggleSidebar} />
 </div>
      <div className="flex w-full">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-5 bg-white h-[100vh] w-full md:w-[85%] lg:w-[85%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
