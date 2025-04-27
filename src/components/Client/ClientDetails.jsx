import React from "react";
import { useParams } from "react-router-dom";
import clientImg from "../../assets/client-image.png";
import Swal from "sweetalert2";
// Assuming this is your client data
const clients = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", country: "USA" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    country: "Canada",
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    country: "UK",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    country: "Australia",
  },
  {
    id: 5,
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    country: "Germany",
  },
  {
    id: 6,
    name: "David Wilson",
    email: "david.wilson@example.com",
    country: "France",
  },
  {
    id: 7,
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    country: "South Korea",
  },
  {
    id: 8,
    name: "Daniel Martinez",
    email: "daniel.martinez@example.com",
    country: "Mexico",
  },
  {
    id: 9,
    name: "Sophia Taylor",
    email: "sophia.taylor@example.com",
    country: "Italy",
  },
  {
    id: 10,
    name: "James Harris",
    email: "james.harris@example.com",
    country: "Spain",
  },
];

const ClientDetails = () => {
  const { id } = useParams();

  const client = clients.find((client) => client.id === parseInt(id));

  // Check if the client is found
  if (!client) {
    return <p>Client not found</p>;
  }
const handleAccept=()=>{

    Swal.fire({
        title: "Are you sure?",
        text: "Rohan islam has been successfully added.",
       
       
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
        text: "Rohan islam request has been successfully rejected.",
       
       
        confirmButtonColor: "#DD1A1D",
     
        confirmButtonText: "Rejected"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Rejected!",
            text: "Rohan islam request has been successfully rejected",
            icon: "success"
          });
        }
      });
}
  return (
    <div className="max-w-4xl mx-auto p-6 border border-blue-200 rounded-lg bg-white">

    <div className="flex justify-between gap-8">
      {/* Left side - Client details */}
      <div>
    <h1 className="text-2xl font-medium text-gray-600 mb-6">Client Details Overview</h1>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Client Details</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-500">Client name</p>
            <p className="text-gray-700">Guitar Ross biyate</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-500">E-mail</p>
            <p className="text-gray-700">gal.54@gmail.com</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-500">Phone Number</p>
            <p className="text-gray-700">345453211</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-gray-500">Location</p>
            <p className="text-gray-700">France</p>
          </div>
        </div>
      </div>

      {/* Right side - Profile picture and additional info */}
      <div className="flex flex-col items-center">
     
       
   <div className="border-2 border-dashed p-4 rounded-2xl">
   <div className=" rounded-full bg-yellow-400">
            <img
              src={clientImg}
              alt="Client profile"
            
              className="object-cover w-[125px]"
            />
          </div>
   </div>
      

    

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full max-w-xs mt-10">
        <p className="text-gray-700">Guitar Ross biyate</p>
        <p className="text-gray-500 text-sm">Client</p>
          <p className="text-gray-500">Age</p>
          <p className="text-gray-700">30</p>

          <p className="text-gray-500">Joined</p>
          <p className="text-gray-700">(MM/DD/YYYY)</p>
        </div>
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex gap-4 mt-12 lg:mt-24">
      <button onClick={()=>handleAccept()} className="px-6 py-3 bg-teal-400 text-white rounded-xl hover:bg-teal-500 transition-colors w-36 ">
        Accept
      </button>
      <button onClick={()=>handleReject()} className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors w-36 ">
        Rejected
      </button>
    </div>


  </div>
  );
};

export default ClientDetails;
