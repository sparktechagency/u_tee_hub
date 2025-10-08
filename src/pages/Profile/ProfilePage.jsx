import { Button, Input, Form, message } from "antd";
import { TbPhotoScan } from "react-icons/tb";
import { Link } from "react-router-dom";
import gallery from "../../assets/gallery.png";
import profile from "../../assets/profile.png";
import { useState } from "react";
import { useUpdateProfileMutation } from "../../redux/features/profile/profileApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useUpdateAdminMutation } from "../../redux/features/user/userApi";

const ProfilePage = () => {
  const [previewImg, setPreviewImg] = useState(null); // For showing preview
  const [imageFile, setImageFile] = useState(null);   // For uploading
const [updateAdmin]  = useUpdateAdminMutation()
const user = useAppSelector(selectCurrentUser)
console.log("user",user);
  const onFinish =async (values) => {

    console.log("values:", values);
const id= user?.id

 try {
   
     const res = await updateAdmin({id,data:values}).unwrap();
      message.success(res.message);
  
      closeCreate();
 
    } catch (e) {
      message.error(e?.data?.message);
    }





    }


  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save file for upload
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result); // Show preview
      };
      reader.readAsDataURL(file);
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
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                // src={previewImg || profile}
                alt="Profile"
                className="w-36 h-36 object-cover rounded-full"
              />
            </div>
            {/* <div className="absolute top-20 left-[224px]">
              <div className="bg-[#35BEBD] w-12 h-12 rounded-full relative">
                <label
                  htmlFor="fileInput"
                  className="bg-[#35BEBD] w-12 h-12 rounded-full relative cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={gallery}
                    alt=""
                    className="text-white text-3xl left-2.5 top-2.5 absolute w-7"
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div> */}
          </div>
          {/* <p className="text-[#35BEBD] text-center font-title my-3">
            Edit Photo
          </p> */}
          <Link to={"/changePass"}>
            <p className="text-[#313131] text-center font-title my-3 underline text-lg">
              Change Password
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
          {/* Name Input */}
          <div className="mt-3">
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <div>
                <label className={`px-1 text-lg transition-all`}>Name</label>
                <Input
                  placeholder="Name..."
                  type="text"
                  className="w-full px-3 py-3 rounded-xl border border-[#35BEBD]  focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
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

export default ProfilePage;
