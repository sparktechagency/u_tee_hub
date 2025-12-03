import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetTermsQuery, useTermsPolicyMutation } from "../../redux/features/others/othersApi";
import { message } from "antd";

function TermsCondition() {
  const [content, setContent] = useState("");
  const [termsPolicy] = useTermsPolicyMutation();
  const { data: terms, error, isLoading } = useGetTermsQuery(); // Fetch the existing terms policy

  // Load saved content from localStorage or fetch from the backend when the page loads
  useEffect(() => {
    if (terms?.data?.termsPolicy) {
      setContent(terms.data.termsPolicy); // Update with fetched data if available
    } else {
      const savedContent = localStorage.getItem("TermsPolicyContent");
      if (savedContent) {
        setContent(savedContent); // Load content from localStorage if available
      } 
    }
  }, [terms]);

  // Save content to localStorage and send to the backend when Save Changes is clicked
  const handleSave = async () => {
    localStorage.setItem("TermsPolicyContent", content); // Save content to localStorage
    try {
       const data = {
      termsCondition: content,
    };
      const res = await termsPolicy(data); // Send content to the backend
      if (res?.data) {
        message.success(res?.data?.message);
      } else {
        message.error("Something went wrong, try again");
      }
      // console.log("response about terms--->", res);
    } catch (err) {
      message.error(err?.message || "An error occurred");
    }
  };

  return (
    <div className="p-5 text-black font-title bg-white">
      <h1 className="text-start text-3xl font-bold mb-5 text-[#35BEBD]">Terms & Condition</h1>

      <div className="rounded shadow p-5 h-full">
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
          readOnly={isLoading} // Disable editing while loading data
        />
      </div>

      <div className="text-center py-5">
        <button
          onClick={handleSave}
          className="bg-[#00c0b5] text-white font-semibold px-2 py-2 rounded transition duration-200"
          disabled={isLoading} // Disable save button while loading
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default TermsCondition;
