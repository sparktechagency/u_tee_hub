import { ConfigProvider, Modal } from "antd";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetAllFaqQuery } from "../../redux/features/others/othersApi";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
const {data:getAllFaq}=useGetAllFaqQuery(undefined)
console.log("data---->",getAllFaq?.data);
  // Accordion data
  const AccordionData = [
    {
      "title": "1. What is \"U Tee Hub\"?",
      "description": "Ans: U Tee Hub is an e-commerce mobile application that allows users to browse and purchase a wide range of products, including fashion, accessories, and more, all from the convenience of their mobile device."
    },
    {
      "title": "2. How does \"U Tee Hub\" work?",
      "description": "Ans: U Tee Hub allows users to create and manage their own apparel brand with custom designs, handle printing, logistics, and have the products delivered to customers. It simplifies the process for creators and entrepreneurs."
    },
    {
      "title": "3. What products can I sell on \"U Tee Hub\"?",
      "description": "Ans: You can sell a wide range of products such as t-shirts, hoodies, and other custom apparel. You can also design your own merchandise and promote your brand through the platform."
    }
  ]
  

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const handleOk2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="relative p-5 z-0 bg-white text-black font-title">
      <div className="flex justify-between items-center">
        <h1 className="text-start text-3xl font-bold mb-5 text-[#35BEBD]">FAQ</h1>
        <button
          onClick={showModal2}
          className="bg-[#35BEBD] text-white font-semibold px-5 py-2 rounded transition duration-200"
        >
          + Add FAQ
        </button>
      </div>

      <div className="flex gap-2 flex-col w-[90%] mt-5">
        {getAllFaq?.data?.map((accordion, index) => (
          <section
            key={index}
            className="border-b border-[#e5eaf2] rounded py-3"
          >
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full bg-[#E1FFFF] p-5"
              onClick={() => handleClick(index)}
            >
              <h2 className="text-base font-normal md:font-bold md:text-lg flex gap-2 items-center">
               
                {accordion.question}
              </h2>
              <div className="flex gap-2 md:gap-4 items-center">
                <FaChevronDown
                  className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${
                    isAccordionOpen === index &&
                    "rotate-[180deg] !text-[#35BEBD]"
                  }`}
                />

              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden bg-[#E1FFFF] p-5">
                {accordion.answer}
              </p>
            </div>
          </section>
        ))}
      </div>

      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#FF0000",
            },
            Modal: {
              titleColor: "#FF0000",
            },
          },
        }}
      >

      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
        title={<span style={{ color: "#35BEBD" }}>Add FAQ</span>}
      >
        <div className="p-5">
          <div className="flex justify-between items-center gap-5">
            <div>
              <label className="text-[#0D0D0D] text-[0.9rem] mb-3">
                Question
              </label>
              <input
                type="text"
                className="border-2 border-[#e5eaf2] p-2 w-full rounded transition duration-200 mt-3"
                placeholder="Enter your question"
              />
            </div>
            <div>
              <label className="text-[#0D0D0D] text-[0.9rem] mb-3">
                Answer
              </label>
              <input
                type="text"
                className="border-2 border-[#e5eaf2] p-2 w-full rounded transition duration-200 mt-3"
                placeholder="Enter your answer"
              />
            </div>
          </div>

          <div className="text-center py-5">
             
              <button className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg mx-auto block"  onClick={handleOk2}>
        Confirm
      </button>
          </div>
        </div>
      </Modal>
      </ConfigProvider>
    </div>
  );
};

export default FAQ;
