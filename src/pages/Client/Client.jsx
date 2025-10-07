import { Input, Pagination } from "antd";
import { useState } from "react";
import ClientCard from "../../components/Client/ClientCard";
import { IoSearch } from "react-icons/io5";
import { useAllUserQuery } from "../../redux/features/user/userApi";

const Client = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
    const [page, setPage] = useState(1);
const {data:alluser}=useAllUserQuery({searchTerm,page})
console.log("all user",alluser?.data);
  const meta = alluser?.meta;
  const limit = meta?.limit;
  const totalItems = meta?.total;
  

  const onPageChange = (page) => {
    setPage(page);
  };
  const clients = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", country: "USA" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", country: "Canada" },
    { id: 3, name: "Emily Johnson", email: "emily.johnson@example.com", country: "UK" },
    { id: 4, name: "Michael Brown", email: "michael.brown@example.com", country: "Australia" },
    { id: 5, name: "Sarah Davis", email: "sarah.davis@example.com", country: "Germany" },
    { id: 6, name: "David Wilson", email: "david.wilson@example.com", country: "France" },
    { id: 7, name: "Jessica Lee", email: "jessica.lee@example.com", country: "South Korea" },
    { id: 8, name: "Daniel Martinez", email: "daniel.martinez@example.com", country: "Mexico" },
    { id: 9, name: "Sophia Taylor", email: "sophia.taylor@example.com", country: "Italy" },
    { id: 10, name: "James Harris", email: "james.harris@example.com", country: "Spain" },
  ];
  

  // Function to handle the change in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Update the searchTerm state
  };

  // Filter the clients based on the search term (name, email, or country)
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm) ||
    client.country.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center pt-0 my-3">
        <div>
          <p className="text-[#35BEBD] font-title text-3xl font-bold">
            Active Clients
          </p>
        </div>
        <div>
          <div className="relative w-full sm:w-[300px]">
            <Input
              type="text"
              placeholder="Search anything here..."
              className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
              value={searchTerm} // Bind the searchTerm state to the input value
              onChange={handleSearchChange} // Handle input change
            />
            <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
        </div>
      </div>
 <div className="grid grid-cols-4 gap-5 my-5">
  {alluser?.data?.length > 0 ? (
  alluser?.data?.filter(user => user?.profile?.role === "client")
  ?.map((client, idx) => <ClientCard key={idx} client={client} />)
  ) : (
    <p className="text-black">No clients found.</p>
  )}
</div>
  {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            current={page}
            pageSize={limit}
            total={totalItems}
            onChange={onPageChange}
            showSizeChanger={false}
            className="flex justify-center"
            pageSizeOptions={[limit?.toString()]}
          />
        </div>
    </div>
  );
};

export default Client;
