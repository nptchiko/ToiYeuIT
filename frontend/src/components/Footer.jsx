import React from "react";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#F7FAFC] py-8 ">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col pl-10 space-y-5 text-sm font-semibold uppercase">
          <h1>Tải Ứng dụng trên điện thoại</h1>
          <img
            src="https://static-assets.prepcdn.com/content-management-system/Google_Play_Black_76f09f6160.png?w=256&q=80"
            className="w-[140px] h-[40px] cursor-pointer"
          />
          <img
            src="https://static-assets.prepcdn.com/content-management-system/App_Store_Black_e79f8b5b2c.png?w=256&q=80"
            className="w-[140px] h-[40px] cursor-pointer"
          />
          <h1>Kết nối với chúng tôi</h1>
          <div className="flex gap-5 text-lg">
            <div className="border-2 border-gray-200 rounded-full p-2 shadow-sm hover:border-gray-900 cursor-pointer">
              <FaFacebook className=" text-blue-600 text-2xl hover:scale-150" />
            </div>
            <div className="border-2 border-gray-200 rounded-full p-2 shadow-sm hover:border-gray-900 cursor-pointer">
              <FaGoogle className="text-red-500 text-2xl hover:scale-150" />
            </div>
            <div className="border-2 border-gray-200 rounded-full p-2 shadow-sm hover:border-gray-900 cursor-pointer">
              <FaInstagram className="text-pink-500 text-2xl hover:scale-150" />
            </div>
          </div>
        </div>
        {/* courd study */}
        <div className="space-y-4  md:pl-0 pl-10">
          <h1 className="text-sm font-semibold uppercase">Chương trình học</h1>
          <ul className="space-y-4 text-gray-700">
            <li>TOEIC</li>
            <li>Tiếng anh giao tiếp</li>
          </ul>
        </div>
        <div className="space-y-4 pl-10 md:pl-0 md:pt-0 pt-5">
          <h1 className="text-sm font-semibold uppercase">tính năng nổi bật</h1>
          <ul className="space-y-4 text-gray-700">
            <li>Luyện đề TOEIC 4 kỹ năng</li>
            <li>Luyện viết TOEIC ENGHUB</li>
            <li>Luyện nói TOEIC ENGHUB</li>
          </ul>
        </div>
        <div className="space-y-4 md:pt-0 pt-5 md:pl-0 pl-10">
          <h1 className="text-sm font-semibold uppercase">VỀ ENGHUB</h1>
          <ul className="space-y-4 text-gray-700">
            <li>Giới thiệu</li>
            <li>Chính sách dùng AI</li>
            <li>Điều kiện & điều khoản</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách an toàn</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
