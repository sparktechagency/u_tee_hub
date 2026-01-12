import { ConfigProvider, Input, Modal, Select, Table, Tag, Image } from "antd";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAllUserQuery } from "../../redux/features/user/userApi";
import Swal from "sweetalert2";
import { useUpdateProfileMutation } from "../../redux/features/profile/profileApi";
import { FaFileAlt, FaFilePdf, FaFileImage } from "react-icons/fa";

const statusColors = {
  pending: "gold",
  active: "green",
  blocked: "red",
};

const Vendor = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const role = "vendor";

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { data: alluser, isLoading, isError, refetch } = useAllUserQuery({ searchTerm, page, role });
  const [updateProfile] = useUpdateProfileMutation();
  
  console.log("user data--->", alluser?.data[0]?.profile?.id?.documents);
  
  const vendors = alluser?.data || [];
  const meta = alluser?.meta;
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  // Modal handlers
  const showDocumentModal = (record) => {
    setSelectedVendor(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
  };

  // Get file extension to determine file type
  const getFileType = (url) => {
    if (!url) return "unknown";
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(extension)) return "image";
    if (["pdf"].includes(extension)) return "pdf";
    return "other";
  };

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
          refetch();
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
      render: (_, record, index) => (currentPage - 1) * pageSize + index + 1,
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
      title: "Document",
      dataIndex: "document",
      key: "document",
      render: (_, record) => (
        <button
          onClick={() => showDocumentModal(record)}
          className="flex items-center gap-2 text-[#35BEBD] hover:text-[#2a9a99] transition-colors cursor-pointer"
        >
          <IoEyeSharp className="w-5 h-5" />
          <span className="text-sm">View</span>
        </button>
      ),
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

  // Render document based on type
  const renderDocument = (docUrl) => {
    if (!docUrl) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <FaFileAlt className="w-16 h-16 mb-4" />
          <p className="text-lg">No document available</p>
        </div>
      );
    }

    const fileType = getFileType(docUrl);

    if (fileType === "image") {
      return (
        <div className="flex justify-center">
          <Image
            src={docUrl}
            alt="Vendor Document"
            className="max-w-full rounded-lg"
            style={{ maxHeight: "500px", objectFit: "contain" }}
            placeholder={
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <span className="text-gray-400">Loading...</span>
              </div>
            }
          />
        </div>
      );
    }

    if (fileType === "pdf") {
      return (
        <div className="flex flex-col items-center">
          <div className="w-full h-[500px] border border-gray-200 rounded-lg overflow-hidden">
            <iframe
              src={docUrl}
              title="PDF Document"
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-6 py-2 bg-[#35BEBD] text-white rounded-lg hover:bg-[#2a9a99] transition-colors flex items-center gap-2"
          >
            <FaFilePdf />
            Open PDF in New Tab
          </a>
        </div>
      );
    }

    // For other file types
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <FaFileAlt className="w-16 h-16 mb-4 text-gray-400" />
        <p className="text-lg text-gray-600 mb-4">Document Preview Not Available</p>
        <a
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-[#35BEBD] text-white rounded-lg hover:bg-[#2a9a99] transition-colors"
        >
          Download Document
        </a>
      </div>
    );
  };

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

      {/* Document View Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
            <FaFileImage className="text-[#35BEBD] w-6 h-6" />
            <span className="text-xl font-semibold text-gray-800">
              Vendor Document
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        centered
        destroyOnClose
        className="document-modal"
      >
        {selectedVendor && (
          <div className="py-4">
            {/* Vendor Info Header */}
            <div className="bg-gradient-to-r from-[#35BEBD]/10 to-[#35BEBD]/5 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#35BEBD] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedVendor?.profile?.id?.name?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedVendor?.profile?.id?.name || "Unknown Vendor"}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedVendor?.email}</p>
                </div>
                <div className="ml-auto">
                  <Tag color={statusColors[selectedVendor?.status] || "default"}>
                    {selectedVendor?.status?.toUpperCase() || "PENDING"}
                  </Tag>
                </div>
              </div>
            </div>

            {/* Document Display */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-[#35BEBD]" />
                Uploaded Documents
              </h4>
              
              {/* If documents is an array */}
              {Array.isArray(selectedVendor?.profile?.id?.documents) ? (
                <div className="space-y-4">
                  {selectedVendor?.profile?.id?.documents.length > 0 ? (
                    <Image.PreviewGroup>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedVendor?.profile?.id?.documents.map((doc, index) => (
                          <div key={index} className="relative group">
                            {getFileType(doc) === "image" ? (
                              <Image
                                src={doc}
                                alt={`Document ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg border border-gray-200"
                              />
                            ) : (
                              <a
                                href={doc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center w-full h-40 bg-white rounded-lg border border-gray-200 hover:border-[#35BEBD] transition-colors"
                              >
                                <FaFilePdf className="w-12 h-12 text-red-500 mb-2" />
                                <span className="text-sm text-gray-600">View PDF</span>
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </Image.PreviewGroup>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                      <FaFileAlt className="w-16 h-16 mb-4" />
                      <p className="text-lg">No documents uploaded</p>
                    </div>
                  )}
                </div>
              ) : (
                // If documents is a single string URL
                renderDocument(selectedVendor?.profile?.id?.documents)
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleModalClose}
                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedVendor?.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleModalClose();
                      updateVendorStatus(selectedVendor, "blocked");
                    }}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleModalClose();
                      updateVendorStatus(selectedVendor, "active");
                    }}
                    className="px-6 py-2 bg-[#35BEBD] text-white rounded-lg hover:bg-[#2a9a99] transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vendor;