import { BsArrowRight } from "react-icons/bs";
import vendor from "../../assets/Ellipse 204.png"
import { Link } from "react-router-dom";

const ActiveVendor = () => {
    return (
        <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-sm font-title">
        <div className="p-5">
          {/* Header with Avatar and Title */}
          <div className="flex items-start space-x-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-[#FFDAE3] flex items-center justify-center overflow-hidden">
              <img 
                src={vendor} 
                alt="Vendor Avatar" 
                className=" w-[70%] object-cover"
              />
            </div>
            <div className="text-start">
              <h3 className="text-base font-medium text-[#3A3541] font-title">U Tee Hub</h3>
              <span className="inline-block text-xs text-[#89868D] rounded-sm">
                Vendor
              </span>
              <p className="text-sm text-[#89868D] mb-2">Location: USA</p>
            </div>
          </div>
         
        
          
          {/* Description */}
          <p className="text-sm text-[#89868D] mb-4">
            Constantly growing. We're constantly making mistakes from which we learn
          </p>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gray-200"></div>
        
        {/* Action Buttons */}
        <div className="flex justify-between p-3 gap-2">
        <Link to={"/accept"}>
        <button className="px-4 py-1.5 border border-teal-500 text-teal-500 text-sm font-medium rounded-md hover:bg-teal-50">
            Accept
          </button>
        </Link>
       <Link to={"/rejected"}>
       <button className="px-4 py-1.5 border border-red-400 text-red-400 text-sm font-medium rounded-md hover:bg-red-50">
            Rejected
          </button></Link>
        <Link to="/ownerDetails">
        <button className="px-4 py-1.5 border border-teal-500 text-teal-500 text-sm font-medium rounded-md hover:bg-teal-50 flex items-center gap-1">
            View
            <BsArrowRight size={16} />
          </button>
        </Link>
        </div>
      </div>
    );
};

export default ActiveVendor;