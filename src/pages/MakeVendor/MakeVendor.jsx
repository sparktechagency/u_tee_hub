import { ConfigProvider, Form, Input, Modal, Table } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const MakeVendor = () => { 
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const showCreateModal = () => {
        setIsCreateModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
      };
  
  const details = [
    {
      "S.ID": "#21463",
      "Name": "Rohan Khan",
      "E-mail": "roham2@gmail.com",
      "user Type": "Vendor",
      "Action": "Delete"
    },
    {
      "S.ID": "#21463",
      "Name": "Rohan Khan",
      "E-mail": "roham2@gmail.com",
      "user Type": "Vendor",
      "Action": "Delete"
    }
  ]
   
  const columns = [
    {
      "title": "S.ID",
      "dataIndex": "S.ID",
      "key": "S.ID"
    },
    {
      "title": "Name",
      "dataIndex": "Name",
      "key": "Name"
    },
    {
      "title": "E-mail",
      "dataIndex": "E-mail",
      "key": "E-mail"
    },
    {
      "title": "user Type",
      "dataIndex": "user Type",
      "key": "user Type"
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          <button onClick={showModal}>
            <RiDeleteBin6Line className="text-[#FF2020] w-5 h-5" />
          </button>
        </div>
      ),
    }
    
  ]
  
  // Form
  const onFinish = (values) => {
    console.log('Form values:', values);
  };
    return (
        <div>
                 <div className="flex justify-between items-center pt-0  my-3">
        <div>
          <p className="text-[#35BEBD] font-title text-3xl font-bold">
         Make Vendor
          </p>
        </div>
        <div>
          <div className=" w-full sm:w-[300px] ">
          <button
          onClick={showCreateModal}
            className="px-7 py-3.5 rounded-xl border bg-teal-500 text-white text-sm font-bold "
           
          >
            Make Vendor +
          </button>
          </div>
        </div>
      </div> 
      {/* Table */}
      
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
          dataSource={details}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
        {/* create modal */}

        <Modal
          open={isCreateModalOpen}
          centered
          onCancel={handleCreateModalCancel}
          footer={null}
        >
        <div style={{ maxWidth: 400, margin: 'auto' }}>
        <p className="text-[#35BEBD] font-title text-xl mb-5 font-bold">
         Make Vendor
          </p>
      <Form
        name="make-vendor"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input placeholder="Type name" />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Please input your e-mail address!' }, { type: 'email', message: 'Please input a valid e-mail!' }]}
        >
          <Input placeholder="e-mail address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        <Form.Item
          label="User Type"
          name="userType"
          rules={[{ required: true, message: 'Please select the user type!' }]}
        >
         <Input placeholder="admin" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center">

        <button
                  type="submit"
                  className=" flex text-xl items-center justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#30c1c1]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >Submit</button>
          </div>
        </Form.Item>
      </Form>
    </div>
        </Modal>

        {/* delete modal */}
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
            Do You want To delete This Contant
            </p>
            <div className="text-center py-5 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#FF2020] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
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

export default MakeVendor;