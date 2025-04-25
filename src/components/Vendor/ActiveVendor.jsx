import { BsArrowRight } from "react-icons/bs";
import vendor from "../../assets/Ellipse 204.png";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ActiveVendor = () => {

  const handleAction = (action) => {
    Swal.fire({
      showConfirmButton: false,
      width: 400,
      html: `
        <div style="max-width: 24rem; background: white; border-radius: 0.75rem; padding: 1.5rem; text-align: left; font-family: sans-serif;">
          <h2 style="font-size: 1.125rem; font-weight: 600; color: black; margin-bottom: 0.5rem;">Dear Shuvo</h2>
          <p style="color: #4B5563; margin-bottom: 0.25rem;">
            Welcome to U Tee Hub. You now have access to your account.
          </p>
          <p style="color: #4B5563; margin-bottom: 1rem;">
            Please log in using your registered credentials.
          </p>
          <p style="color: #9CA3AF; margin-bottom: 1.5rem;">Admin Team</p>
          <button id="confirm-btn" style="
            background-color: #2dd4bf;
            color: white;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
          ">
            Confirm
          </button>
        </div>
      `,
      // Handle button click directly with preConfirm
      preConfirm: () => {
        // This is the action that happens when the confirm button is clicked
        Swal.close();  // Close the SweetAlert modal
      }
    });
  };
  const handleReject=(action)=>{
    Swal.fire({
      showConfirmButton: false,
      width: 400,
      html: `
        <div style="max-width: 24rem; background: white; border-radius: 0.75rem; padding: 1.5rem; text-align: left; font-family: sans-serif;">
          <h2 style="font-size: 1.125rem; font-weight: 600; color: black; margin-bottom: 0.5rem;">Dear Shuvo</h2>
          <p style="color: #4B5563; margin-bottom: 0.25rem;">
          We regret to inform you that your request to join U Tee Hub has not been approved after review.
          </p>
          <p style="color: #4B5563; margin-bottom: 1rem;margin-top:20px">
           If you believe this was a mistake or need further assistance, feel free to contact our support team
          </p>
       
          <button id="confirm-btn" style="
            background-color: #DD1A1D;
            color: white;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
          ">
            Confirm
          </button>
        </div>
      `,
      // Handle button click directly with preConfirm
      preConfirm: () => {
        // This is the action that happens when the confirm button is clicked
        Swal.close();  // Close the SweetAlert modal
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
              src={vendor}
              alt="Vendor Avatar"
              className="w-[70%] object-cover"
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
        {/* <Link to={"/accept"}> */}
        <button
          className="px-4 py-1.5 border border-teal-500 text-teal-500 text-sm font-medium rounded-md hover:bg-teal-50"
          onClick={() => handleAction("accept")}
        >
          Accept
        </button>
        {/* </Link> */}

        {/* <Link to={"/rejected"}> */}
        <button
          className="px-4 py-1.5 border border-red-400 text-red-400 text-sm font-medium rounded-md hover:bg-red-50"
          onClick={() => handleReject("reject")}
        >
          Reject
        </button>
        {/* </Link> */}

        <Link to="/ownerDetails">
        <button
          className="px-4 py-1.5 border border-teal-500 text-teal-500 text-sm font-medium rounded-md hover:bg-teal-50 flex items-center gap-1"
         
        >
          View
          <BsArrowRight size={16} />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ActiveVendor;
