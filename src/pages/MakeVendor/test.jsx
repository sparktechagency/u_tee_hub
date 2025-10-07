import { ConfigProvider, Form, Input, Modal, Table, Tag, Select } from "antd";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetPendingVendorsQuery } from "../../redux/features/user/userApi";

const statusColors = {
  pending: "gold",
  active: "green",
  blocked: "red",
};

const MakeVendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [page, setPage] = useState(1);

  const { data: pendingVendors, isLoading, isError } = useGetPendingVendorsQuery(page);
  const vendors = pendingVendors?.data || [];
const meta = pendingVendors?.meta
  const showModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };
    const handlePageChange = (nextPage /*, pageSize */) => {
    console.log("calling functon........",nextPage);
    setPage(nextPage); // triggers RTK Query refetch because query args changed
  }
    const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);
  const handleCancel = () => setIsModalOpen(false);
  const handleCreateModalCancel = () => setIsCreateModalOpen(false);

  const showCreateModal = () => setIsCreateModalOpen(true);

  const handleStatusChange = (value, record) => {
    console.log(`Updating ${record.email} to status:`, value);
    // TODO: trigger mutation API call, e.g. updateVendorStatus(record._id, value)
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => `#${id.slice(-5)}`,
    },
    {
      title: "Name",
      dataIndex: "profile",
      key: "profile",
      render: (profile) =>  profile?.id?.name  || "—",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record)}
          style={{ width: 120 }}
          options={[
            { label: <Tag color="gold">Pending</Tag>, value: "pending" },
            { label: <Tag color="green">Active</Tag>, value: "active" },
            { label: <Tag color="red">Blocked</Tag>, value: "blocked" },
          ]}
        />
      ),
    },

  ];

  const onFinish = (values) => {
    console.log("Form values:", values);
    // TODO: API call to create a vendor
  };

  if (isError) return <p className="text-red-500">Failed to load vendors.</p>;

  return (
    <div>
    

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#00c0b5",
              headerColor: "white",
              cellFontSize: 16,
              headerSplitColor: "#00c0b5",
            },
          },
        }}
      >
        <Table
          loading={isLoading}
          rowKey="_id"
          dataSource={vendors}
          columns={columns}
               pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: false,
          }}
          // IMPORTANT: handle page change here (Table's onChange)
          onChange={(pagination) => {
            const next = pagination?.current ?? 1;
            const size = pagination?.pageSize ?? pageSize;
            if (
              typeof handlePageChange === "function" &&
              (next !== currentPage || size !== pageSize)
            ) {
              handlePageChange(next, size);
            }
          }}
          scroll={{ x: "max-content" }}
        />


      </ConfigProvider>
    </div>
  );
};

export default MakeVendor;
