import { ConfigProvider, Input, Modal, Select, Table, Tag, Image, message } from "antd";
import { IoEyeSharp, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useAllUserQuery } from "../../redux/features/user/userApi";
import Swal from "sweetalert2";
import { useUpdateProfileMutation } from "../../redux/features/profile/profileApi";
import { FaFileAlt, FaFilePdf, FaFileImage, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const statusColors = {
  pending: "gold",
  active: "green",
  blocked: "red",
};

// --- down fun
const downloadFile = async (url, filename) => {
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename; 
    document.body.appendChild(link);
    link.click();


    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed, opening in new tab:", err);

    window.open(url, "_blank");
  }
};

const Vendor = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const role = "vendor";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { data: alluser, isLoading, isError, refetch } = useAllUserQuery({ searchTerm, page, role });
  const [updateProfile] = useUpdateProfileMutation();

  const vendors = alluser?.data || [];
  const meta = alluser?.meta;
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const showDocumentModal = (record) => {
    setSelectedVendor(record);
    setIsModalOpen(true);
  };

  const getFileType = (url) => {
    if (!url) return "unknown";
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(extension)) return "image";
    if (["pdf"].includes(extension)) return "pdf";
    return "other";
  };

  const handleStatusChange = async (vendor, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);
    try {
    const res =   await updateProfile({ info: formData, id: vendor?._id }).unwrap();
 
      Swal.fire("Success", `Vendor marked as ${newStatus}`, "success");
      refetch();
    } catch (error) {
      // Swal.fire("Error", "Update failed", "error");

      toast.error(error?.data?.error)
    }
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id", render: (_, __, index) => (currentPage - 1) * pageSize + index + 1 },
    { title: "Name", dataIndex: "profile", key: "profile", render: (profile) => profile?.id?.name || "—" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    {
      title: "Document",
      key: "document",
      render: (_, record) => (
        <button onClick={() => showDocumentModal(record)} className="flex items-center gap-2 text-[#35BEBD] hover:underline">
          <IoEyeSharp className="w-5 h-5" /> View
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
          onChange={(val) => handleStatusChange(record, val)}
          options={[
            { label: <Tag color="gold">Pending</Tag>, value: "pending" },
            { label: <Tag color="green">Active</Tag>, value: "active" },
            { label: <Tag color="red">Blocked</Tag>, value: "blocked" },
          ]}
        />
      ),
    },
  ];


  const renderSingleDoc = (docUrl, index = 0) => {
    const fileType = getFileType(docUrl);

    const vendorName = selectedVendor?.profile?.id?.name || "vendor";
    const ext = docUrl.split('.').pop()?.split(/[?#]/)[0] || "file";
    const fileName = `${vendorName.replace(/\s+/g, '-').toLowerCase()}-document-${index + 1}.${ext}`;

    return (
      <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
        {fileType === "image" ? (
          <Image src={docUrl} className="w-full h-40 object-cover rounded" />
        ) : (
          <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-50 rounded">
            <FaFilePdf className="text-red-500 text-5xl mb-2" />
            <span className="text-xs text-gray-500">PDF Document</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            downloadFile(docUrl, fileName);
          }}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#35BEBD] text-white py-2 rounded hover:bg-[#2a9a99] transition-colors text-sm font-medium"
        >
          <FaDownload size={14} /> Download
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#35BEBD]">Vendor Management</h2>
        <Input
          placeholder="Search..."
          prefix={<IoSearch />}
          className="max-w-xs rounded-full"
          onChange={handleSearchChange}
        />
      </div>

      <Table
        dataSource={vendors}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        pagination={{ total, current: currentPage, pageSize }}
        onChange={(p) => handlePageChange(p.current)}
      />

      <Modal
        title="Vendor Documents"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
        centered
      >
        {selectedVendor && (
          <div className="mt-4">
            <div className="mb-4 pb-4 border-b">
              <p className="font-semibold text-lg">{selectedVendor?.profile?.id?.name}</p>
              <p className="text-gray-500 text-sm">{selectedVendor?.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Array.isArray(selectedVendor?.profile?.id?.documents) ? (
                selectedVendor.profile.id.documents.map((doc, idx) => (
                  <div key={idx}>{renderSingleDoc(doc, idx)}</div>
                ))
              ) : selectedVendor?.profile?.id?.documents ? (
                <div className="col-span-2">
                  {renderSingleDoc(selectedVendor.profile.id.documents)}
                </div>
              ) : (
                <p className="col-span-2 text-center text-gray-400 py-10">No documents found.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vendor;