import { useState, useEffect } from "react";
import { Table, Tag, Input, message as antdMessage } from "antd";
import { IoSearch } from "react-icons/io5";
import { MdOutlineReply, MdOutlineDelete } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import {
  useAllSupportQuery,
  useReplySupportMutation,
  useComposeEmailMutation,
  useDeleteSupportMutation,
} from "../../redux/features/support/supportApi";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("vendor");
  const [page, setPage] = useState(1);
  // Tailwind modals and state
  const [replyOpen, setReplyOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [composeData, setComposeData] = useState({ to: "", subject: "", body: "" });

  const { data: getAllSupport, refetch } = useAllSupportQuery({
    searchTerm,
    type: activeTab,
    page
  });


  const meta = getAllSupport?.data?.meta;
  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const handlePageChange = (nextPage) => setPage(nextPage);
  const [replySupport, { isLoading: replying }] = useReplySupportMutation();
  const [composeEmail, { isLoading: composing }] = useComposeEmailMutation();
  const [deleteSupport, { isLoading: deleting }] = useDeleteSupportMutation();

  // reply submit
  const handleReply = async () => {
    if (!messageText.trim()) return antdMessage.warning("Please enter a message.");
    try {
      await replySupport({
        supportId: selectedSupport?._id,
        message: messageText,
      }).unwrap();
      antdMessage.success("Reply sent successfully!");
      setMessageText("");
      setReplyOpen(false);
      refetch();
    } catch (err) {
      console.error("Reply error:", err);
      antdMessage.error("Failed to send reply.");
    }
  };

  // compose submit
  const handleCompose = async () => {
    if (!composeData.to || !composeData.subject || !composeData.body)
      return antdMessage.warning("All fields are required.");
    try {
      await composeEmail(composeData).unwrap();
      antdMessage.success("Email sent successfully!");
      setComposeData({ to: "", subject: "", body: "" });
      setComposeOpen(false);
    } catch (err) {
      console.error("Compose error:", err);
      antdMessage.error("Failed to send email.");
    }
  };

  // delete
  const handleDelete = async (record) => {
    if (confirm("Are you sure you want to delete this support?")) {
      try {
        await deleteSupport(record._id).unwrap();
        antdMessage.success("Support deleted successfully!");
        refetch();
      } catch (err) {
        console.error("Delete error:", err);
        antdMessage.error("Failed to delete support.");
      }
    }
  };

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
              borderColor: record?.user?.role === "Client" ? "#35BEBD" : "orange",
              color: record?.user?.role === "Client" ? "#35BEBD" : "orange",
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
      width: "55%",
    },
    {
      title: "",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "right",
      width: "15%",
      render: (time) => (
        <span className="text-gray-500">
          Time:
          <span className="text-amber-600 text-sm ml-3">
            {time?.split("T")[0]}
          </span>
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: "15%",
      render: (_, record) => (
        <div className="flex justify-center gap-3 text-lg">
          <MdOutlineReply
            className="text-[#00C0B5] cursor-pointer hover:scale-110 transition-transform"
            title="Reply"
            onClick={() => {
              setSelectedSupport(record);
              setReplyOpen(true);
            }}
          />
          {/* <MdOutlineDelete
            className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
            title="Delete"
            onClick={() => handleDelete(record)}
          /> */}
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  // auto-scroll to bottom of chat
  useEffect(() => {
    const el = document.getElementById("chat-scroll");
    if (el) el.scrollTop = el.scrollHeight;
  }, [selectedSupport, replyOpen]);

  return (
    <div className="relative text-gray-800">
      {/* Tabs + Search */}
      <div className="flex justify-between items-center pt-0 mb-3">
        <div className="flex gap-5 text-md md:text-xl font-semibold mb-3">
          <p
            onClick={() => setActiveTab("vendor")}
            className={`cursor-pointer pb-1 ${
              activeTab === "vendor"
                ? "text-[#00C0B5] border-b-4 border-[#00C0B5]"
                : "text-[#575757]"
            }`}
          >
            Vendor
          </p>
          <p
            onClick={() => setActiveTab("client")}
            className={`cursor-pointer pb-1 ${
              activeTab === "client"
                ? "text-[#00C0B5] border-b-4 border-[#00C0B5]"
                : "text-[#575757]"
            }`}
          >
            Client
          </p>
        </div>

        <div className="relative w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Search anything here..."
            className="border border-[#e5eaf2] py-3 outline-none w-full rounded-full px-3"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>

      {/* Compose Button */}
      <div className="flex justify-end mb-3">
        <button
          className="bg-[#00C0B5] hover:bg-[#00a79d] text-white font-semibold rounded-full px-5 py-2 flex items-center gap-2 transition"
          onClick={() => setComposeOpen(true)}
        >
          <HiOutlineMail className="text-lg" /> Compose Email
        </button>
      </div>

      {/* Table */}
      <Table
        dataSource={getAllSupport?.data?.data}
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
        rowClassName={() => "bg-[#EBFFFF]"}
        className="border border-blue-100 rounded-md overflow-hidden"
      />

      {/* ---------------- CHAT MODAL WITH MESSAGE HISTORY ---------------- */}
      {replyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg w-[95%] sm:w-[550px] h-[80vh] flex flex-col shadow-lg relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Conversation with {selectedSupport?.user?.fullName}
              </h2>
              <button
                onClick={() => setReplyOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Message List */}
            <div
              id="chat-scroll"
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
            >
              {selectedSupport?.messages?.length ? (
                selectedSupport.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "super_admin"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm transition-all duration-300 ${
                        msg.sender === "super_admin"
                          ? "bg-[#00C0B5] text-white"
                          : "bg-white border text-gray-800"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.sender === "super_admin"
                            ? "text-gray-200"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.sentAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-5">No messages yet</p>
              )}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t bg-white">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full border rounded-md p-2 text-sm text-gray-700 focus:ring focus:ring-[#00C0B5] focus:outline-none"
                rows={3}
                placeholder="Type your reply..."
              />
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setReplyOpen(false)}
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={replying}
                  className="bg-[#00C0B5] text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-[#009a92] transition"
                >
                  {replying ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- COMPOSE EMAIL MODAL ---------------- */}
      {composeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg w-[95%] sm:w-[450px] p-5 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-3">Compose New Email</h2>
            <input
              type="email"
              placeholder="Recipient email"
              value={composeData.to}
              onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Subject"
              value={composeData.subject}
              onChange={(e) =>
                setComposeData({ ...composeData, subject: e.target.value })
              }
              className="w-full border rounded-md p-2 mb-3"
            />
            <textarea
              placeholder="Write your email..."
              value={composeData.body}
              onChange={(e) =>
                setComposeData({ ...composeData, body: e.target.value })
              }
              className="w-full border rounded-md p-2 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setComposeOpen(false)}
                className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCompose}
                disabled={composing}
                className="bg-[#00C0B5] text-white rounded-md px-4 py-2 hover:bg-[#009a92] transition"
              >
                {composing ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
