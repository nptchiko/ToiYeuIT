import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "/ToiYeuIT/frontend/public/icon.png";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("TOEIC");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelected = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <nav className="flex justify-between items-center p-5 font-semibold bg-slate-50 relative">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center h-20 w-40 rounded-[140px]">
          <img src={Icon} className="h-full w-full object-cover" />
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
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/78d4a602072e734f8e95b86f155e989b1ca9a3f7d4bb626d8c0da2cba7d989a8"
                className="object-contain shrink-0 w-4 aspect-square"
                alt=""
              />
              <span className="my-auto min-w-[50px] ">{selectedOption}</span>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c92889d5f660318ebc145a94e78a11d46d6fb1877f2aa35244a29620259c1dde"
              className={`object-contain shrink-0 w-2.5 aspect-[0.63] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              alt=""
            />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg py-2 z-10">
              <button
                className="block px-4 py-2 hover:bg-sky-50 text-indigo-900"
                onClick={() => handleSelected("TOEIC")}
              >
                TOEIC
              </button>
              <button
                className="block px-4 py-2 hover:bg-sky-50 text-indigo-900"
                onClick={() => handleSelected("IELTS")}
              >
                IELTS
              </button>
            </div>
          )}
        </div>

        <button
          className="md:hidden block text-indigo-900 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg py-2 z-10 md:hidden">
            <NavLink
              to="xay-dung"
              className={({ isActive }) =>
                `block px-4 py-3 ${
                  isActive
                    ? "text-blue-600 bg-sky-50"
                    : "text-indigo-900 hover:bg-sky-50"
                }`
              }
            >
              Xây dựng lộ trình
            </NavLink>
            <NavLink
              to="kiem-tra"
              className={({ isActive }) =>
                `block px-4 py-3 ${
                  isActive
                    ? "text-blue-600 bg-sky-50"
                    : "text-indigo-900 hover:bg-sky-50"
                }`
              }
            >
              Kiểm tra đầu vào
            </NavLink>
            <NavLink
              to="luyen-de"
              className={({ isActive }) =>
                `block px-4 py-3 ${
                  isActive
                    ? "text-blue-600 bg-sky-50"
                    : "text-indigo-900 hover:bg-sky-50"
                }`
              }
            >
              Luyện đề
            </NavLink>
            <NavLink
              to="cam-ket"
              className={({ isActive }) =>
                `block px-4 py-3 ${
                  isActive
                    ? "text-blue-600 bg-sky-50"
                    : "text-indigo-900 hover:bg-sky-50"
                }`
              }
            >
              Cam kết đầu ra
            </NavLink>
            <div className="block px-4 py-3">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base text-center text-white bg-blue-600 rounded-[32px] hover:bg-blue-700 transition-colors duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <div className="hidden md:flex text-sm font-[650] font-sent gap-10 py-1 pr-7 pl-1 leading-none bg-white rounded-[317px]">
          <NavLink
            to="/xay-dung"
            className={({ isActive }) =>
              `px-3 py-5 rounded-[317px] transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            Xây dựng lộ trình
          </NavLink>
          <NavLink
            to="kiem-tra"
            activeClassName="text-blue-600 bg-sky-100"
            className={({ isActive }) =>
              `px-3 py-5 rounded-[317px] transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            Kiểm tra đầu vào
          </NavLink>
          <NavLink
            to="luyen-de"
            activeClassName="text-blue-600 bg-sky-100"
            className={({ isActive }) =>
              `px-3 py-5 rounded-[317px] transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            Luyện đề
          </NavLink>
          <NavLink
            to="cam-ket"
            className={({ isActive }) =>
              `px-3 py-5 rounded-[317px] transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 bg-sky-100"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            Cam kết đầu ra
          </NavLink>
        </div>
      </div>
      <button className="px-4 py-2.5 text-base text-center text-white bg-blue-600 rounded-[32px] hover:bg-blue-700 transition-colors duration-200">
        Bắt đầu
      </button>
    </nav>
  );
};

export default Header;
