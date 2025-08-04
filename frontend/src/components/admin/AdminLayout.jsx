import {useState} from "react";
import {FaBars} from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout =() => {
      const [isSidebarOpen ,setIsSidebarOpen] = useState(false);

const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
};   
return (
   <div className="min-h-screen flex flex-col lg:flex-row relative">
    {/*Mobile Toggle Button */}
    <div className="flex lg:hidden p-3 sm:p-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <FaBars size={20} className="sm:w-6 sm:h-6"/>   
        </button>
        <h1 className="ml-3 sm:ml-4 text-lg sm:text-xl font-medium">Admin Dashboard</h1>
    </div>
    {/*Overlay for mobile sidebar*/}
    {isSidebarOpen &&(
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
        onClick={toggleSidebar}
        ></div>
    )}
    {/*sidebar */}
    <div
  className={`bg-gray-900 w-64 min-h-screen text-white absolute lg:relative transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 lg:translate-x-0 lg:static lg:block z-20`}
>


        {/*Sidebar*/}
        <AdminSidebar/>
    </div>    
        {/*Main Content */}
        <div className="flex-grow p-4 sm:p-6 overflow-auto">
            <Outlet/>
        </div>
</div>
   );
};
export default AdminLayout;    