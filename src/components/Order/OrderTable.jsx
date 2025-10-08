import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { RiDeleteBin6Line} from "react-icons/ri";
import { Link } from "react-router-dom";


const OrderTable = ({order}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const [page, setPage] = useState(1);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };

      const columns = [   
        {
          title: "Order ID",
          dataIndex: "orderId",
          key: "orderId",
        },
        // {
        //   title: "Products",
        //   dataIndex: "product",
        //   key: "product",
        // },
        {
          title: "Qty",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Order Date",
          dataIndex: "createdAt",
          key: "createdAt",
             render: (time) => (
        <span className="text-gray-500">
     
            {time?.split("T")[0]}
        
        </span>
      ),
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => {
              let color = "";
              if (text === "Completed") color = "text-green-500";
              else if (text === "Pending") color = "text-yellow-500";
              else if (text === "Rejected") color = "text-red-500";
              return <span className={`font-semibold ${color}`}>{text}</span>;
            },
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <div className="flex items-center justify-center gap-4">
                <Link to={`/order/${record?._id}`}>
                  <button>
                    <IoMdEye  className="text-[#C8CAD8] w-5 h-5" />
                  </button>
                </Link>
                {/* <button onClick={showModal}>
                  <RiDeleteBin6Line className="text-[#C8CAD8] w-5 h-5" />
                </button> */}
              </div>
            ),
          },
      ];
      
    return (
        <div>
                  <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#00c0b5",
            },
            Pagination: {
              colorPrimaryBorder: "#00c0b5",
              colorBorder: "#00c0b5",
              colorPrimaryHover: "#00c0b5",
              colorTextPlaceholder: "#00c0b5",
              itemActiveBgDisabled: "#00c0b5",
              colorPrimary: "#00c0b5",
            },
            Table: {
              headerBg: "#00c0b5",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#00c0b5",
              
            },
          },
        }}
      >
        <Table
          dataSource={order}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          className="text-center"
        />

        <Modal 
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#00c0b5]">
              Are you sure!
            </h1>
            <p className="text-xl text-center mt-5">
            Do you really want to delete Order #5302002? Please confirm."
            </p>
            <div className="text-center py-5 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#00c0b5] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
              > 
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>

      </ConfigProvider>
        </div>
    );
};

export default OrderTable;