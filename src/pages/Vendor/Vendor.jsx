import { ConfigProvider, Input, Select, Table, Tag } from "antd";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAllUserQuery } from "../../redux/features/user/userApi";
import Swal from "sweetalert2";
import { useUpdateProfileMutation } from "../../redux/features/profile/profileApi";

const statusColors = {
  pending: "gold",
  active: "green",
  blocked: "red",
};

const Vendor = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const role = "vendor";

  const { data: alluser, isLoading, isError ,refetch} = useAllUserQuery({ searchTerm, page,role });
  const [updateProfile] = useUpdateProfileMutation();

  const vendors = alluser?.data || [];
  const meta = alluser?.meta;
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  // 🔹 Generic status updater
  const updateVendorStatus = async (vendor, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      const res = await updateProfile({ info: formData, id: vendor?._id }).unwrap();
      console.log("Status update response:", res);

      const statusLabel =
        newStatus === "active"
          ? "approved"
          : newStatus === "blocked"
          ? "rejected"
          : "updated";

      Swal.fire({
        title: `Are you sure?`,
        text: `You are about to mark ${vendor?.profile?.id?.name || "this vendor"} as ${statusLabel}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:
          newStatus === "active" ? "#35BEBD" : newStatus === "blocked" ? "#DD1A1D" : "#3085d6",
        confirmButtonText:
          newStatus === "active"
            ? "Approve"
            : newStatus === "blocked"
            ? "Reject"
            : "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:
              newStatus === "active"
                ? "Approved!"
                : newStatus === "blocked"
                ? "Rejected!"
                : "Updated!",
            text: `${vendor?.profile?.id?.name || "Vendor"} has been ${
              newStatus === "active" ? "approved" : newStatus === "blocked" ? "rejected" : "updated"
            }.`,
            icon: newStatus === "blocked" ? "error" : "success",
          });
          refetch()
        }
      });
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Status update failed", "error");
    }
  };

  const handleStatusChange = (value, record) => {
    updateVendorStatus(record, value);
  };

  const columns = [
{
  title: "ID",
  dataIndex: "_id",
  key: "_id",
  render: (_, record, index) => index + 1, // Index is 0-based, so we add 1 to start the serial number from 1
},

    {
      title: "Name",
      dataIndex: "profile",
      key: "profile",
      render: (profile) => profile?.id?.name || "—",
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
          value={status || "pending"}
          onChange={(value) => handleStatusChange(value, record)}
          style={{ width: 130 }}
          options={[
            { label: <Tag color={statusColors.pending}>Pending</Tag>, value: "pending" },
            { label: <Tag color={statusColors.active}>Active</Tag>, value: "active" },
            { label: <Tag color={statusColors.blocked}>Blocked</Tag>, value: "blocked" },
          ]}
        />
      ),
    },
  ];

  if (isError) return <p className="text-red-500">Failed to load vendors.</p>;

  return (
    <div>
      {/* Header and Search */}
      <div className="flex justify-between items-center my-3">
        <p className="text-[#35BEBD] font-title text-3xl font-bold">Vendor Management</p>
        <div className="relative w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Search vendors..."
            className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>

      {/* Table */}
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
          onChange={(pagination) => {
            const next = pagination?.current ?? 1;
            if (next !== currentPage) handlePageChange(next);
          }}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Vendor;
