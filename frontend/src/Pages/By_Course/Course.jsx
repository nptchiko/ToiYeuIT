import React from "react";
import Gift from "../../assets/By_Course/gift_box.png";
import arrow from "../../assets/By_Course/arrow.png";
import volume from "../../assets/By_Course/Lovepik.png";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { useLocation } from "react-router-dom";
const Course = () => {
  const [hasText, setHasText] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    phone: "",
    fullName: "",
    email: "",
    address: "",
  });
  const location = useLocation();
  const { title, price } = location.state || {};
  const [coupon, setCoupon] = useState(price);
  const [errorCoupon, setErrorCoupon] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate phone number
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: "" }));
    } else if (value.length > 11) {
      setErrors((prev) => ({
        ...prev,
        phone: "Số điện thoại không được quá 10 chữ số!",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "Vui lòng chỉ nhập số" }));
    }
  };

  // Validate fullName
  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Vui lòng nhập họ tên" }));
    } else {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  // Validate email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Vui lòng nhập email" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Email không hợp lệ" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  // Handle address change
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, address: "Vui lòng nhập địa chỉ" }));
    } else {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
  };

  // Handle coupon application
  const handleCouponChange = () => {
    if (couponInput === "hau") {
      setCoupon((coupon) => (coupon *= 0.3)); // Giảm 30%
      setErrorCoupon("Đã áp dụng mã giảm giá 30%");
      setCouponInput("");
    } else {
      setErrorCoupon("Áp dụng Coupon không thành công");
    }
  };

  // Handle coupon input change
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setCouponInput(value);
    setHasText(value !== "");
  };

  // Submit form
  const handleSubmit = () => {
    // Validate required fields
    const newErrors = {
      phone: !phone ? "Vui lòng nhập số điện thoại" : errors.phone,
      fullName: !fullName.trim() ? "Vui lòng nhập họ tên" : "",
      email: !email.trim() ? "Vui lòng nhập email" : errors.email,
      address: !address.trim() ? "Vui lòng nhập địa chỉ" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    // Create object to send
    const orderData = {
      personalInfo: {
        phone: "+84" + phone,
        fullName,
        address,
        email,
      },
      orderInfo: {
        product: "TOEIC mất gốc đến LR 300 & SW 100",
        originalPrice: 1000000,
        discountedPrice: coupon,
        appliedCoupon: couponInput === "hau" ? "hau" : "",
      },
      timestamp: new Date().toISOString(),
    };

    // Log the object (in production, would send to server)
    console.log("Order Data:", orderData);

    // Simulate API call
    setTimeout(() => {
      alert("Đã gửi thông tin đặt hàng thành công!");
      setIsSubmitting(false);
      // Here you would typically redirect to the next step
    }, 1000);
  };

  // Check if form is valid for button state
  const isFormValid = () => {
    return (
      phone &&
      fullName.trim() &&
      email.trim() &&
      !errors.phone &&
      !errors.fullName &&
      !errors.email
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white h-14 w-full py-2 flex justify-center items-center">
        <div className="font-sent text-xl font-[750] flex">
          Bước 1<div className="opacity-30">/2</div> - Checkout
        </div>
      </div>
      {/* content */}
      <div className="mx-10 mt-5 lg:flex lg:gap-10">
        {/* monney */}
        <div className="bg-white w-full lg:w-[40%] p-8 rounded-xl space-y-4">
          <div className="text-sm font-[700]">Sản phẩm :</div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-[6px] h-[6px] rounded-full bg-green-600"></div>
              <div>{title}</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="font-bold">{price.toLocaleString("vi-VN")}</div>
              <div>VND</div>
            </div>
          </div>
          <div className="border-gray-300 border-b-[1px] border-dashed"></div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-[700]">Tổng giá bán:</div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="font-bold">{price.toLocaleString("vi-Vi")}</div>
              <div>VND</div>
            </div>
          </div>
          <div className="bg-green-50 py-4 px-3 text-sm rounded-lg space-y-2">
            <div>Khuyến mãi:</div>
            <div className="relative">
              <div className="bg-orange-100 py-2 px-5 relative z-20">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={Gift}
                      className="h-[30px] opacity-85"
                      alt="Gift icon"
                    />
                    <div className="text-orange-500">Mã khuyến mãi của bạn</div>
                  </div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-xl px-2 py-2 bg-white font-medium flex gap-2 items-center"
                  >
                    Chọn
                    <img
                      src={arrow}
                      className={`h-[10px] duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      alt="Arrow"
                    />
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="bg-white absolute w-[504px] h-[360px] border-gray-200 rounded-lg border px-3 -left-3 -top-2 z-10">
                  <div className="border-gray-200 border-b-2 pt-16"></div>
                  <div className="mt-4 text-sm font-medium">
                    Chọn một khuyến mãi
                  </div>
                </div>
              )}
            </div>
            <div>Mã Coupon:</div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Nhập mã Coupon"
                className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-700"
                onChange={handleInputChange}
                value={couponInput}
              />
              <button
                onClick={handleCouponChange}
                className={`absolute top-1/2 right-2 -translate-y-1/2 px-4 py-2 text-white font-medium rounded-lg transition ${
                  hasText
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!hasText}
              >
                Áp dụng
              </button>
            </div>
            {errorCoupon && (
              <p
                className={`text-sm mt-2 ${
                  errorCoupon.includes("thành công")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {errorCoupon}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-[700]">Giá bán sau khuyến mãi</div>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <div className="font-bold text-lg">
                {coupon.toLocaleString("vi-VN")}
              </div>
              <div className="text-lg">VND</div>
            </div>
          </div>
          <div className="bg-orange-100/80 px-2 rounded-lg flex items-center gap-2">
            <img src={volume} className="h-full w-[50px]" alt="Volume" />
            <div className="text-xs text-orange-500">
              Hơn 12.567 học viên của Prep đã sử dụng lộ trình này!
            </div>
          </div>
        </div>
        {/* personal information */}
        <div className="lg:w-[60%] bg-white px-8 py-5 rounded-xl w-full space-y-4 mt-5 lg:mt-0">
          <div className="text-lg font-bold">Thông tin của bạn</div>
          <div className="bg-blue-100 p-3 rounded-lg flex items-center gap-3">
            <div className="text-blue-700 text-xl">
              <AiFillWarning />
            </div>
            <div className="text-sm font-semibold text-blue-700">
              Khóa học và tất cả quyền lợi đi kèm sẽ được thêm vào tài khoản này
              sau khi quá trình thanh toán thành công!
            </div>
          </div>
          <div className="text-sm font-medium">Số điện thoại(*)</div>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full px-11 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                errors.phone ? "border-red-500" : "border-gray-200"
              }`}
            />
            <div className="text-sm absolute top-1/2 -translate-y-1/2 left-4">
              +84
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}

          <div className="text-sm font-medium">Họ tên người mua hàng(*)</div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Nhập họ tên người mua hàng"
              value={fullName}
              onChange={handleFullNameChange}
              className={`w-full px-5 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
          )}

          <div className="text-sm font-medium">Địa chỉ</div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={handleAddressChange}
              className={`w-full px-5 py-3 bg-gray-50  border rounded-xl focus:outline-none focus:ring-1 ${
                errors.address ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-2">{errors.address}</p>
            )}
          </div>

          <div className="text-sm font-medium">Email nhận hóa đơn(*)</div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Nhập Email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-5 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}

          <div className="text-sm flex flex-wrap">
            Bằng việc nhấn{" "}
            <div className="font-bold px-1">"Tiếp tục thanh toán"</div> bạn xác
            nhận đã đọc và đồng ý thanh toán
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`px-4 py-2 text-white rounded-xl transition ${
              isFormValid() && !isSubmitting
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Đang xử lý..." : "Tiếp tục thanh toán"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
