import { useState, useEffect } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => {
    return localStorage.getItem("activeLink") || "xay-dung"; // Mặc định là "xay-dung"
  });
  const [selectedOption, setselectedOption] = useState("TOEIC");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State cho menu mobile

  const handlselected = (option) => {
    setselectedOption(option);
    setIsOpen(false);
  };
  useEffect(() => {
    const savedLink = localStorage.getItem("activeLink");
    if (savedLink) {
      setActiveLink(savedLink);
    }
  }, []);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link); // Lưu vào localStorage
  };
  return (
    <nav className="flex justify-between items-center p-5 font-semibold bg-slate-50 relative">
      {/* LOGO */}
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center bg-white py-5 rounded-[140px] px-3">
          icon
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-10 items-start hover:bg-blue-50 px-5 py-5 leading-none text-indigo-900 whitespace-nowrap bg-white rounded-[317px]"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <div className="flex gap-2.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/78d4a602072e734f8e95b86f155e989b1ca9a3f7d4bb626d8c0da2cba7d989a8?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
                className="object-contain shrink-0 w-4 aspect-square"
                alt=""
              />
              <span className="my-auto min-w-[50px] ">{selectedOption}</span>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c92889d5f660318ebc145a94e78a11d46d6fb1877f2aa35244a29620259c1dde?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
              className={`object-contain shrink-0 w-2.5 aspect-[0.63] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              alt=""
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg py-2 z-10">
              <a
                href="#"
                className="block px-4 py-2 hover:bg-sky-50 text-indigo-900"
                onClick={() => handlselected("TOEIC")}
              >
                TOEIC
              </a>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-sky-50 text-indigo-900"
                onClick={() => handlselected("IELTS")}
              >
                IELTS
              </a>
            </div>
          )}
        </div>

        {/* NÚT MỞ MENU TRÊN MOBILE */}
        <button
          className="md:hidden block text-indigo-900 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰ {/* Icon hamburger */}
        </button>

        {/* MENU TRÊN MOBILE */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg py-2 z-10 md:hidden">
            <a
              href="#"
              className={`block px-4 py-3 ${
                activeLink === "xay-dung"
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`}
              onClick={() => {
                handleLinkClick("xay-dung");
              }}
            >
              Xây dựng lộ trình
            </a>
            <a
              href="#"
              className={`block px-4 py-3  ${
                activeLink === "kiem-tra"
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`}
              onClick={() => {
                handleLinkClick("kiem-tra");
              }}
            >
              Kiểm tra đầu vào
            </a>
            <a
              href="#"
              className={`block px-4 py-3  ${
                activeLink === "luyen-de"
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`}
              onClick={() => {
                handleLinkClick("luyen-de");
              }}
            >
              Luyện đề
            </a>
            <a
              href="#"
              className={`block px-4 py-3 ${
                activeLink === "cam-ket"
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`}
              onClick={() => {
                handleLinkClick("cam-ket");
              }}
            >
              Cam kết đầu ra
            </a>
            <div className={"block px-4 py-3 "}>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base text-center text-white bg-blue-600 rounded-[32px] hover:bg-blue-700 transition-colors duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* MENU CHÍNH (ẨN TRÊN MOBILE) */}
        <div className="hidden md:flex text-sm font-semibold gap-10 py-1 pr-7 pl-1 leading-none bg-white rounded-[317px]">
          <a
            href="#"
            className={`px-3 py-5 rounded-[317px] transition-colors duration-200 ${
              activeLink === "xay-dung"
                ? "text-blue-600 bg-sky-100"
                : "text-indigo-900 hover:bg-sky-50"
            }`}
            onClick={() => handleLinkClick("xay-dung")}
          >
            Xây dựng lộ trình
          </a>
          <a
            href="#"
            className={`px-3 py-5 rounded-[317px] transition-colors duration-200 ${
              activeLink === "kiem-tra"
                ? "text-blue-600 bg-sky-100"
                : "text-indigo-900 hover:bg-sky-50"
            }`}
            onClick={() => handleLinkClick("kiem-tra")}
          >
            Kiểm tra đầu vào
          </a>
          <a
            href="#"
            className={`px-3 py-5 rounded-[317px] transition-colors duration-200 ${
              activeLink === "luyen-de"
                ? "text-blue-600 bg-sky-100"
                : "text-indigo-900 hover:bg-sky-50"
            }`}
            onClick={() => handleLinkClick("luyen-de")}
          >
            Luyện đề
          </a>
          <a
            href="#"
            className={`px-3 py-5 rounded-[317px] transition-colors duration-200 ${
              activeLink === "cam-ket"
                ? "text-blue-600 bg-sky-100"
                : "text-indigo-900 hover:bg-sky-50"
            }`}
            onClick={() => handleLinkClick("cam-ket")}
          >
            Cam kết đầu ra
          </a>
        </div>
      </div>
      {/* NÚT "BẮT ĐẦU" */}
      <button className="px-4 py-2.5 text-base text-center text-white bg-blue-600 rounded-[32px] hover:bg-blue-700 transition-colors duration-200">
        Bắt đầu
      </button>
    </nav>
  );
};

export default Header;
