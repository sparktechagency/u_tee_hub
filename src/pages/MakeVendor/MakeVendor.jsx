import React, { useMemo, useState } from "react";
import { ConfigProvider, Form, Input, Modal, Table, message } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useAllAdminQuery,

  useBlockAdminMutation,

  useCreateAdminMutation,
  useDeleteAdminMutation,
} from "../../redux/features/user/userApi";
import { MdBlock } from "react-icons/md";

const MakeVendor = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [page, setPage] = useState(1);

  // list + pagination
  const {
    data: allAdmin,
    isFetching,
    refetch,
  } = useAllAdminQuery(page);

  // mutations
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [blockAdmin, { isLoading: isBlocking }] = useBlockAdminMutation();


  const admin = allAdmin?.data ?? [];
  const meta = allAdmin?.meta;
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const [form] = Form.useForm();

  // pagination change
  const handlePageChange = (nextPage) => setPage(nextPage);

  // create modal
  const openCreate = () => setIsCreateOpen(true);
  const closeCreate = () => setIsCreateOpen(false);

  // delete modal
  const openDelete = (record) => {
    setSelectedAdmin(record);
    setIsDeleteOpen(true);
  };
  const openBlock = (record) => {
    setSelectedAdmin(record);
    setIsBlockOpen(true);
  };
  const closeBlock = () => {
    setSelectedAdmin(null);
    setIsBlockOpen(false);
  };
  const closeDelete = () => {
    setSelectedAdmin(null);
    setIsDeleteOpen(false);
  };

  // create handler
  const onFinish = async (values) => {
    try {
      // API body expects: { fullName, email, password, role }
      const payload = {
        fullName: values.name,
        email: values.email,
        password: values.password,
        role: values.userType || "admin",
      };
      await createAdmin(payload).unwrap();
      message.success("Admin created");
      form.resetFields();
      closeCreate();
      refetch();
    } catch (e) {
      message.error(e?.data?.message || "Failed to create admin");
    }
  };

  // delete handler
  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;
    const id = selectedAdmin.id ?? selectedAdmin._id; // support id/_id
    try {
      // If your mutation expects an object, use: await deleteAdmin({ id }).unwrap();
      await deleteAdmin(id).unwrap();
      message.success("Admin deleted");
      closeDelete();

      // adjust page if last row on current page was removed
      const remainingThisPage = admin.length - 1;
      if (remainingThisPage === 0 && currentPage > 1) {
        setPage(currentPage - 1);
      } else {
        refetch();
      }
    } catch (e) {
      message.error(e?.data?.message || "Failed to delete admin");
    }
  };
  // delete handler
  const handleConfirmBlock = async () => {
    if (!selectedAdmin) return;
    const id = selectedAdmin.id ?? selectedAdmin._id; // support id/_id
    try {
      // If your mutation expects an object, use: await deleteAdmin({ id }).unwrap();
      const res =await blockAdmin(id).unwrap();
      if(res?.status==='success'){

        message.success(res.message);
      }else{
        message.error(res.error);
      }
      closeBlock();

 
        refetch();
  
    } catch (e) {
      // console.log(e);
      message.error(e?.data?.error || "Failed to block admin");
    }
  };

  // columns (with index)
  const columns = useMemo(
    () => [
      {
        title: "S.ID",
        key: "index",
        width: 90,
        render: (_, __, index) =>
          (currentPage - 1) * pageSize + index + 1,
      },
      {
        title: "Name",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "User Type",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Action",
        key: "action",
        width: 100,
        render: (_, record) => (
      <div>
            <button
            onClick={() => openBlock(record)}
            disabled={isBlocking}
            title="Block"
          >
  
            <MdBlock className="text-[#15555e] w-5 h-5 mr-1" />
          </button>
            <button
            onClick={() => openDelete(record)}
            disabled={isDeleting}
            title="Delete"
          >
            <RiDeleteBin6Line className="text-[#FF2020] w-5 h-5" />
          </button>
      
      </div>
        ),
      },
    ],
    [currentPage, pageSize, isDeleting]
  );

  return (
    <div>
      {/* header */}
      <div className="flex justify-between items-center pt-0 my-3">
        <p className="text-[#35BEBD] font-title text-3xl font-bold">Make Admin</p>
        <button
          onClick={openCreate}
          className="px-7 py-3.5 rounded-xl border bg-teal-500 text-white text-sm font-bold"
        >
          Make Admin +
        </button>
      </div>

      {/* table */}
      <ConfigProvider
        theme={{
          components: {
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
          rowKey={(r) => r.id ?? r._id}
          dataSource={admin}
          columns={columns}
          loading={isFetching}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: false,
          }}
          onChange={(pagination) => {
            const next = pagination?.current ?? 1;
            if (next !== currentPage) handlePageChange(next);
          }}
          scroll={{ x: "max-content" }}
        />

        {/* create modal */}
        <Modal open={isCreateOpen} centered onCancel={closeCreate} footer={null} destroyOnClose>
          <div style={{ maxWidth: 400, margin: "auto" }}>
            <p className="text-[#35BEBD] font-title text-xl mb-5 font-bold">
              Create Admin
            </p>
            <Form
              form={form}
              name="create-admin"
              layout="vertical"
              initialValues={{ userType: "admin" }}
              onFinish={onFinish}
              disabled={isCreating}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="Type name" />
              </Form.Item>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: "Please input your e-mail address!" },
                  { type: "email", message: "Please input a valid e-mail!" },
                ]}
              >
                <Input placeholder="e-mail address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>

              <Form.Item
                label="User Type"
                name="userType"
                rules={[{ required: true, message: "Please select the user type!" }]}
              >
                <Input placeholder="admin" />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex text-xl items-center justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#30c1c1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                  >
                    {isCreating ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        {/* Block modal */}
        <Modal open={isBlockOpen} centered onCancel={closeBlock} footer={null}>
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#00c0b5]">Are you sure?</h1>
            <p className="text-xl text-center mt-5">
              Block <strong>{selectedAdmin?.fullName}</strong> this admin?
            </p>
            <div className="text-center py-5 w-full flex justify-center gap-3">
              <button
                onClick={closeBlock}
                className="bg-gray-200 text-gray-900 font-semibold w-1/3 py-3 px-5 rounded-lg"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBlock}
                className="bg-[#FF2020] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
                disabled={isDeleting}
              >
                {isDeleting ? "Blocking…" : "Confirm"}
              </button>
            </div>
          </div>
        </Modal>
        {/* delete modal */}
        <Modal open={isDeleteOpen} centered onCancel={closeDelete} footer={null}>
          <div className="flex flex-col justify-center items-center py-10">
            <h1 className="text-3xl text-center text-[#00c0b5]">Are you sure?</h1>
            <p className="text-xl text-center mt-5">
              Delete <strong>{selectedAdmin?.fullName}</strong>?
            </p>
            <div className="text-center py-5 w-full flex justify-center gap-3">
              <button
                onClick={closeDelete}
                className="bg-gray-200 text-gray-900 font-semibold w-1/3 py-3 px-5 rounded-lg"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-[#FF2020] text-white font-semibold w-1/3 py-3 px-5 rounded-lg"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting…" : "Confirm"}
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default MakeVendor;
