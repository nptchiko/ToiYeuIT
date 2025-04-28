import { AuthService, api } from "@/utils/auth-service";
import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaBookOpen,
  FaRegCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("TOEIC");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
  });
  // const { logout } = useAuth();
  // const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/users/user-info");

        // Extract the relevant data from the API response
        const userData = response.data.body;

        setProfileData({
          name: userData.username || "",
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSelected = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleLogout = () => {
    console.log("Logging out...");
    AuthService.logout();
    // clear session & token hear
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  return (
    <nav className="flex justify-between items-center p-4 font-semibold bg-slate-50 relative">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <div className="bg-blue-700 text-white p-1 rounded">
            <span className="font-bold text-xl">ET</span>
          </div>
          <span className="font-bold text-blue-700 text-xl ml-1">ENGHUB</span>
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
              to="/xay-dung"
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
      <NavLink to="/sidebar">
        <div className="bg-indigo-700 hover:bg-indigo-600 px-3 py-2 text-white rounded-full ml-[350px]">
          Bắt đầu làm bài
        </div>
      </NavLink>
      <div
        className="flex items-center ml-auto text-blue-700 relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <FaUserCircle className="h-10 w-10 cursor-pointer" />

        {show && (
          <div className="absolute top-10 right-0 bg-white border-gray-100 border shadow-lg rounded-lg w-[220px] p-4 z-50">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-4">
                <FaUserCircle className="h-10 w-10" />
                <div className="text-gray-800 font-semibold">
                  {profileData.name}
                </div>
              </div>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">View Profile</span>
              </Link>
              <Link
                to="/login"
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors px-3 py-2 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
                <span onClick={handleLogout} className="text-sm font-medium">
                  Logout
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
