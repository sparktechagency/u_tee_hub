import { SiTarget } from "react-icons/si";
import image from "../../assets/storeLogo.png";
import { IoStar } from "react-icons/io5";
import DetailsGraph from "../../components/Vendor/DetailsGraph";
import DetailsCard from "../../components/Vendor/DetailsCard";
import { useParams } from "react-router-dom";
import { useSingleUserQuery } from "../../redux/features/user/userApi";

const OwnerDetails = ({
  name = "Miudiek tee Store",
  logo = "/placeholder.svg?height=80&width=80",
  joinedDate = "Jan 12, 2025",
  email = "john@email.com",
  about = "John Miudiek is an experienced designer and entrepreneur who joined U Tee Hub in 2024. His brand 'Miudiek Tees' is currently one of the most popular stores on the platform. With over 50 uploaded products and more than 4,000 successful orders, John maintains an impressive 97% fulfillment rate and a ★ 4.8 customer rating, making him one of our most reliable partners.",
  storeName = "Miudiek Tees",
  phone = "017XXXXXXXX",
  rating = 4.8,
  status = "Active",
}) => {
  const {id}=useParams()
  const {data:singleUser}=useSingleUserQuery(id)
  console.log("single user",singleUser?.data);
  console.log("vendor id-->",id);
  return (
    <div className="w-full  ">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Section */}
        <div className="p-6  border-gray-100 md:w-72">
          <div className="flex gap-3 items-start">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 mb-3 flex items-center justify-center bg-white">
              <img
                src={image || "/placeholder.svg"}
                alt={`${name} Logo`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="text-start">
              <h2 className="text-lg font-medium text-gray-800 ">{name}</h2>
              <span className="text-teal-500 text-sm font-medium">Vendor</span>
              <p className="text-gray-600 text-sm ">Joined: {joinedDate}</p>
              <p className="text-gray-600 text-sm">Email: {email}</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-gray-800 font-medium mb-1">Store: {storeName}</p>
            <p className="text-gray-600 text-sm mb-1">Phone: {phone}</p>
            <div className="flex items-center mb-1">
              <span className="text-[#FF8009] text-sm mr-1">Rating:</span>
              <IoStar
                size={16}
                fill="#FF8009"
                stroke="#FF8009"
                className="mr-1"
              />
              <span className="text-[#FF8009] font-medium text-sm">
                {rating}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm mr-1">Status:</span>
              <span
                className={`${
                  status === "Active"
                    ? "text-teal-500"
                    : status === "Inactive"
                    ? "text-red-500"
                    : "text-yellow-500"
                } text-sm`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{about}</p>
        </div>
      </div>

      <div className="mt-5">
        <DetailsGraph />
        <DetailsCard />
      </div>
    </div>
  );
};

export default OwnerDetails;
