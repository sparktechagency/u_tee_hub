import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AboutUs() {
  // Set initial content from localStorage or fallback to the default value if not set
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem("aboutUsContent");
    return savedContent || "U Tee Hub is a creative platform designed for makers, dreamers, and entrepreneurs who want to build their own apparel brand without any hassle. From custom t-shirt designing to doorstep delivery — we provide everything a creator needs to launch and grow their fashion brand. Our mission is to make fashion entrepreneurship accessible to all — whether you're a professional designer or just starting out. We handle the printing, logistics, and technology, so you can focus on what you do best: creating. Join thousands of creators who are building their brands, earning from their designs, and expressing their vision through fashion. U Tee Hub is more than just a platform — it’s your launchpad to something bigger.";
  });

  // Save content to localStorage whenever the content changes
  useEffect(() => {
    localStorage.setItem("aboutUsContent", content);
  }, [content]);

  return (
    <div className="p-5 bg-white">
      <h1 className="text-start text-3xl font-bold mb-5 text-[#35BEBD] font-title">About Us</h1>

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
          className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg mx-auto block"
          onClick={() => console.log(content)} // You can replace this with other actions as needed
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
