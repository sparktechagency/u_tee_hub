import { Input, Form, message } from "antd";

import { Link, useNavigate } from "react-router-dom";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profile.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const ChangePass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [changePass]=useChangePasswordMutation();
const user = useAppSelector(selectCurrentUser)
const navigate = useNavigate();
const onFinish = async (values) => {

  const payload = {
    email: user?.email,
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
  };

  try {
    const res = await changePass(payload).unwrap();
    // console.log("res===>", res);
    message.success(res?.message || "Password changed successfully!");
    navigate('/profile')
  } catch (err) {
    // console.error("Error:", err);
    message.error(err?.data?.error|| "Failed to change password.");
  }
};

  return (
    <div>
      <h1 className="text-start text-3xl font-bold my-5 text-[#35BEBD] font-title">
        Profile
      </h1>

      <div style={{ maxWidth: 400, margin: "auto" }}>
        {/* Profile Picture Section */}
        <div className="">
          <div className="relative text-center items-center justify-center flex">
            <div>
              <img src={"https://cdn-icons-png.flaticon.com/512/3607/3607444.png"} alt="Profile" className="w-36" />
            </div>
            {/* <div className="absolute top-20 left-[224px]">
              <div className="bg-[#35BEBD] w-12 h-12 rounded-full relative">
          
                <img
                  src={gallery}
                  alt=""
                  className="text-white text-3xl left-2.5 top-2.5 absolute w-7"
                />
              </div>
            </div> */}
          </div>
          {/* <p className="text-[#35BEBD] text-center font-title my-3">
            Edit Photo
          </p> */}
          <Link to={"/profile"}>
            {" "}
            <p className="text-[#313131] text-center font-title my-3 underline text-lg">
              {" "}
             Edit Profile
            </p>
          </Link>
        </div>

        {/* Form */}
        <Form
          name="profile-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* old pass Input */}
          <div className="relative pt-2">
            <Form.Item
              name="oldPassword" // This binds the input to form state
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="">
                <label className=" px-1 text-lg">Old Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  className="w-full px-3 py-3 border border-[#35BEBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <IoEyeOutline className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </Form.Item>
          </div>
          {/* new pass Input */}
          <div className="relative pt-2">
            <Form.Item
              name="newPassword" // This binds the input to form state
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="">
                <label className=" px-1 text-lg">New Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••••"
                  className="w-full px-3 py-3 border border-[#35BEBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <IoEyeOutline className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </Form.Item>
          </div>

  
          {/* Save Button */}
          <Form.Item>
            <button
              type="submit"
              className="w-full flex text-xl items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-[#30c1c1] hover:bg-[#25a0a0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePass;
