import { useState } from "react";
import { Form, Input, Checkbox, Divider, Typography } from "antd";



import logo from "../../assets/Logo.png";
import forgotPass from "../../assets/forgotPass.png";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSendOtpMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const ForgotPass = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
const [sendOtp]=useSendOtpMutation();
  const onFinish = async(values) => {
    console.log("Form submitted:", values); // Display form values in the console
    setLoading(true);
 try{
 
   
      const res = await sendOtp(values).unwrap();
      console.log("res===>",res);
      setLoading(true)


      setLoading(false)
      toast.success(res?.message);
   navigate("/validation");

 // eslint-disable-next-line @typescript-eslint/no-explicit-any ---
 }catch(err){
    toast.error(err?.data?.message) 
 }
 
  };
  return (
    <div className="max-w-7xl mx-auto w-full flex md:flex-row flex-col justify-center items-center gap-8 md:ml-16 lg:ml-96">
      <div className="flex w-1/2 bg-white rounded-lg overflow-hidden font-title">
        {/* Left Section --- Form */}
        <div className="flex-1 p-10 flex flex-col">
          {/* Logo */}
          <div className="mb-10">
            <img
              src={logo}
              alt="U TEE HUB Logo"
              width={142}
              height={50}
              className="logo"
            />
          </div>

          {/* Form Container --- */}
          <div className="max-w-md">
          <Link to="/sign-in"  className=" mb-2 flex items-center text-black">
            <MdKeyboardArrowLeft className="" size={24}/> Back to login
            </Link>
            <Title level={2} className="text-gray-800 mb-2">
            Forgot your password?
            </Title>
            <Text className="text-gray-600 mb-8">
            Don’t worry, happens to all of us. Enter your email below to recover your password
            </Text>

            <Form
              name="verify"
              onFinish={onFinish}
              className="space-y-6"
              initialValues={{ remember: true }}
            >
  

             {/* Email Field */}
             <div className="relative mt-3">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <div>
                    <label
                      className={`absolute z-30 -top-3 left-3 px-1 text-lg bg-white transition-all`}
                    >
                      Email
                    </label>
                    <Input
                      placeholder="john.doe@gmail.com"
                      type="email"
                      className="w-full px-3 py-5 border border-[#35BEBD] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Form.Item>
              </div>

  

              {/* Verify Button */}
              <Form.Item>
                <button
                  type="submit"
                  className="w-full flex text-xl items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#35BEBD] hover:bg-[#25a0a0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
             Submit
                </button>
              </Form.Item>
            </Form>

   
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <img src={forgotPass} alt="Login Image" className="w-[70%] mt-20" />
      </div>
    </div>
  );
};

export default ForgotPass;
