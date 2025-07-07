import { BsArrowRight } from "react-icons/bs";
import vendor from "../../assets/Ellipse 204.png";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ActiveVendor = ({vendor}) => {
 console.log("vendor====>",vendor);
const handleAccept=()=>{

    Swal.fire({
        title: "Are you sure?",
        text: `${vendor?.profile?.id?.name} has been successfully added.`,
       
       
        confirmButtonColor: "#35BEBD",
        
        confirmButtonText: "Request Accepted"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Accepted",
            text: "Request Accepted",
            icon: "success"
          });
        }
      });
}
const handleReject=()=>{
    Swal.fire({
        title: "Are you sure?",
        text:`${vendor?.profile?.id?.name} has been successfully blocked.`,
       
       
        confirmButtonColor: "#DD1A1D",
     
        confirmButtonText: "Blocked"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Blocked!",
            text:`${vendor?.profile?.id?.name} has been successfully blocked.`,
            icon: "Error"
          });
        }
      });
}
  return (
    <div className="max-w-sm rounded-xl border border-gray-200 bg-white shadow-sm font-title">
      <div className="p-5">
        {/* Header with Avatar and Title */}
        <div className="flex items-start space-x-3 mb-2">
          <div className="h-12 w-12 rounded-xl bg-[#FFDAE3] flex items-center justify-center overflow-hidden">
            <img
              src={vendor?.profile?.id?.image}
              alt="Vendor Avatar"
              className="w-[70%] object-cover"
            />
          </div>
          <div className="text-start">
            <h3 className="text-base font-medium text-[#3A3541] font-title">
          {vendor?.profile?.id?.name}
            </h3>
            <span className="inline-block text-xs text-[#89868D] rounded-sm">
               {vendor?.profile?.role}
            </span>
            <p className="text-sm text-[#89868D] mb-2">Location:{vendor?.profile?.id?.address}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#89868D] mb-4">
          {vendor?.profile?.id?.description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Action Buttons */}
      <div className="flex justify-between p-3 gap-2">
        {/* <Link to={"/accept"} className=""> */}
          <button onClick={()=>handleAccept()}
            className="px-4 py-1.5 border border-teal-500 text-teal-500 text-sm font-medium rounded-md hover:bg-teal-50"
           
          >
            Accept
          </button>
        {/* </Link> */}
        {/* <Link to={"/rejected"} className=""> */}
          <button onClick={()=>handleReject()}
            className="px-4 py-1.5 border border-red-400 text-red-400 text-sm font-medium rounded-md hover:bg-red-50"
           
          >
          Blocked
          </button>
        {/* </Link> */}

        <Link to={`/ownerDetails/${vendor?._id}`}>
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
