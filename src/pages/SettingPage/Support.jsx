import { Input, Table, Tag } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useGetAllSupportQuery } from "../../redux/features/others/othersApi";

const Support = () => {
  const [activeTab, setActiveTab] = useState("all");
const {data:getAllSupport}=useGetAllSupportQuery(undefined)
  // const data = [
  //   {
  //     key: "1",
  //     name: "Mr.Smith",
  //     userType: "Client",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //     hasNotification: true,
  //     notificationCount: "1140 x 66",
  //   },
  //   {
  //     key: "2",
  //     name: "Mr.Smith",
  //     userType: "Client",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //   },
  //   {
  //     key: "3",
  //     name: "Mr.Smith",
  //     userType: "Client",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //   },
  //   {
  //     key: "4",
  //     name: "Mr.Smith",
  //     userType: "Vendor",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //   },
  //   {
  //     key: "5",
  //     name: "Mr.Smith",
  //     userType: "Client",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //   },
  //   {
  //     key: "6",
  //     name: "Mr.Smith",
  //     userType: "Vendor",
  //     email: "mrsmith14@gmail.com",
  //     description: "A new support request has been submitted by a Client",
  //     time: "10:00 AM, Today",
  //   },
  // ];
console.log("get all support-->",getAllSupport?.data?.data);
  const columns = [
    {
      title: "",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{record?.user?.fullName}</span>
          <Tag
            color="transparent"
            bordered
            style={{
              borderColor: record?.user?.role === "Client" ? "#35BEBD" : "orange", // Outline color based on userType
              color: record?.user?.role === "Client" ? "#35BEBD" : "orange", // Text color based on userType
            }}
            className="text-xs px-2 py-0 rounded"
          >
            {record?.user?.role}
          </Tag>
        </div>
      ),
      width: "15%",
    },
    {
      title: "",
      key: "content",
      render: (_, record) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#35BEBD] font-medium">{record?.user?.email}</span>
          </div>
          <div className="text-gray-500 text-sm">{record?.latestSubject}</div>
        </div>
      ),
      width: "65%",
    },
    {
      title: "",
      dataIndex: "time",
      key: "time",
      align: "right",
      width: "20%",
      render: (time) => <span className="text-gray-500">-----------</span>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center pt-0 mb-3">
        {/* Tabs */}
        <div className="flex justify-start items-center gap-5 text-md md:text-xl font-semibold mb-3">
          <p
            onClick={() => setActiveTab("all")}
            className={`cursor-pointer pb-1 ${
              activeTab === "all"
                ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
                : "text-[#575757] font-title"
            }`}
          >
            All
          </p>
          <p
            onClick={() => setActiveTab("vendor")}
            className={`cursor-pointer pb-1 ${
              activeTab === "vendor"
                ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
                : "text-[#575757] font-title"
            }`}
          >
            Vendor
          </p>

          <p
            onClick={() => setActiveTab("client")}
            className={`cursor-pointer pb-1 ${
              activeTab === "client"
                ? "text-[#00C0B5] border-b-4 border-[#00C0B5] font-title"
                : "text-[#575757] font-title"
            }`}
          >
            Client
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Search anything here..."
            className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
          />
          <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>

      {/* Table with Pagination */}
      <div className=" mx-auto">
        <Table
          dataSource={getAllSupport?.data?.data}
          columns={columns}
          pagination={{ pageSize: 5  }} // Pagination handled directly in the Table component
          scroll={{ x: "max-content" }}
          rowClassName={(record) => 
            record.userType === "Client" ? "bg-[#EBFFFF]" : "bg-[#EBFFFF]"
          } // Apply conditional row background color
          className="border border-blue-100 rounded-md overflow-hidden"
        />
      </div>
    </div>
  );
};

export default Support;
