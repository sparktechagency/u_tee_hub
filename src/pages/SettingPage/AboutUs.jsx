import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAboutUsMutation, useGetAboutUsQuery } from "../../redux/features/others/othersApi";
import { message } from "antd";

function AboutUs() {
  const [aboutUs, { isLoading }] = useAboutUsMutation();
  const { data: aboutUsData, isLoading: isFetching, refetch } = useGetAboutUsQuery(undefined);
  console.log("about us data----->",aboutUsData);
  if(aboutUsData?.data?.description){

    localStorage.setItem("aboutUsContent", aboutUsData.data.description);
  }

  const [content, setContent] = useState("");

  useEffect(() => {
    if (aboutUsData?.data?.description) {
      setContent(aboutUsData.data.description);
    }
  }, [aboutUsData]);


  const handleAboutUs = async () => {
    try {
       const data = {
      description: content,
    };
   console.log("data-------->>>>>",data);
      const res = await aboutUs(data).unwrap();
      console.log("res--------->",res);
      if (res?.status=='success') {
        message.success(res?.message || "Saved successfully!");
        refetch();
      } else {
        message.error("Something went wrong, try again");
      }
    } catch (err) {
      console.log(err);
      message.error(err?.data?.message || "Failed to save");
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="p-5 bg-white flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white">
      <h1 className="text-start text-3xl font-bold mb-5 text-[#35BEBD] font-title">
        About Us
      </h1>

      <div className="rounded shadow p-5 h-full text-black">
        <ReactQuill
          style={{ padding: "5px" }}
          theme="snow"
          value={content}  
          onChange={setContent}
        />
      </div>

      <div className="text-center py-5">
        <button
          className={`font-semibold py-2 px-6 rounded-lg mx-auto block ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-teal-400 hover:bg-teal-500 text-white"
          }`}
          onClick={handleAboutUs} 
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AboutUs;