import { FaBoxOpen,FaClipboardList,FaSignOutAlt,FaStore,FaUser } from "react-icons/fa";
import {Link} from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const navigate=useNavigate();
    const handleLogout= ()=>{
        navigate("/");
    };
    return <div className="p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
            <Link to= "/admin" className="text-xl sm:text-2xl font-medium">
            SuvarnaRup
            </Link>
        </div>
        <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-1 sm:space-y-2">
            <NavLink to= "/admin/users" className= {({isActive})=> isActive? "bg-gray-700 text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3": "text-gray-300 hover:bg-gray-700 hover:text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3 transition-colors"}>
            <FaUser className="text-sm sm:text-base"/>
            <span className="text-sm sm:text-base">Users</span>
            </NavLink>
        </nav>


            <NavLink to= "/admin/products" className= {({isActive})=> isActive? "bg-gray-700 text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3": "text-gray-300 hover:bg-gray-700 hover:text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3 transition-colors"}>
            <FaBoxOpen className="text-sm sm:text-base"/>
            <span className="text-sm sm:text-base">Products</span>
            </NavLink>


           <NavLink to= "/admin/orders" className= {({isActive})=> isActive? "bg-gray-700 text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3": "text-gray-300 hover:bg-gray-700 hover:text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3 transition-colors"}>
            <FaClipboardList className="text-sm sm:text-base"/>
            <span className="text-sm sm:text-base">Orders</span>
            </NavLink>


            <NavLink to= "/admin/users" className= {({isActive})=> isActive? "bg-gray-700 text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3": "text-gray-300 hover:bg-gray-700 hover:text-white py-3 sm:py-4 px-3 sm:px-4 rounded flex items-center space-x-2 sm:space-x-3 transition-colors"}>
            <FaStore className="text-sm sm:text-base"/>
            <span className="text-sm sm:text-base">Shop</span>
            </NavLink>       
            
   

            <div className="mt-4 sm:mt-6" >
                <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded flex items-center justify-center space-x-2 sm:space-x-3 transition-colors">
                  <FaSignOutAlt className="text-sm sm:text-base"/>
                  <span className="text-sm sm:text-base">
                    Logout</span>  </button></div>    
    </div>
};

export default AdminSidebar;