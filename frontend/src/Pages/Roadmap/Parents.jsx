import { useState, useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai"; // Star (Ant Design)
import { FaThumbsUp } from "react-icons/fa"; // Thumbs Up (FontAwesome)
const DataComment = [
  {
    id: 1,
    name: "Nguyễn Thị Ánh Dương",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Do tính chất công việc kế toán bận rộn, nên mình cảm thấy chọn khóa học TOEIC online của PREP là lựa chọn đúng đắn, giúp mình chủ động trong thời gian và địa điểm học!",
    like: "100",
    stars: "5",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Khóa học TOEIC của PREP rất hay và bổ ích. Tôi đã cải thiện được điểm số của mình rất nhiều sau khi hoàn thành khóa học này.",
    like: "92",
    stars: "5",
  },
  {
    id: 3,
    name: "Lê Thị Hương",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Mình rất hài lòng với khóa học TOEIC của PREP. Phương pháp giảng dạy dễ hiểu và hiệu quả.",
    like: "85",
    stars: "5",
  },
  {
    id: 4,
    name: "Phạm Quang Huy",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "PREP thực sự là một nền tảng học TOEIC tuyệt vời. Giảng viên rất tận tâm và nội dung bài giảng rất chi tiết.",
    like: "78",
    stars: "4",
  },
  {
    id: 5,
    name: "Đỗ Thu Hà",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Học online nhưng cảm giác như có giáo viên kèm cặp. Các bài tập rất sát với đề thi thực tế.",
    like: "110",
    stars: "5",
  },
  {
    id: 6,
    name: "Ngô Minh Tuấn",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Tôi rất thích cách giảng dạy của PREP, dễ hiểu và trực quan. Hy vọng sẽ đạt điểm cao trong kỳ thi sắp tới!",
    like: "90",
    stars: "5",
  },
  {
    id: 7,
    name: "Lý Thị Bích Ngọc",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Chương trình học rất chi tiết và có nhiều bài tập thực hành hữu ích.",
    like: "105",
    stars: "5",
  },
  {
    id: 8,
    name: "Hoàng Gia Bảo",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Bố cục bài giảng rất hợp lý, dễ hiểu và phù hợp với những người bận rộn như mình.",
    like: "87",
    stars: "4",
  },
  {
    id: 9,
    name: "Trần Thanh Tùng",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Hệ thống luyện đề của PREP rất hay, giúp mình làm quen với cấu trúc đề thi.",
    like: "120",
    stars: "5",
  },
  {
    id: 10,
    name: "Vũ Mai Phương",
    avatar:
      "https://cms-static-assets.prepcdn.com/uploads/Le_Xuan_Kim_557782906a.png?w=96&q=80",
    content:
      "Sau khi học khóa TOEIC của PREP, mình đã tự tin hơn rất nhiều. Cảm ơn đội ngũ giảng viên!",
    like: "98",
    stars: "5",
  },
];

const Parents = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const scrollContainerRef = useRef(null);
  const scrollSpeed = 1;
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollAnimation = () => {
      if (scrollContainerRef.current && !isPaused) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          setDirection(-1);
        } else if (scrollTop <= 0) {
          setDirection(1);
        }
        scrollContainerRef.current.scrollTop += scrollSpeed * direction;
      }
      animationRef.current = requestAnimationFrame(scrollAnimation);
    };
    animationRef.current = requestAnimationFrame(scrollAnimation);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, direction]);

  return (
    <div className="relative min-h-[720px] w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-[40px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left column - Text content */}
        <div className="text-white py-12 px-8 lg:px-16 md:text-start text-center md:py-[150px]">
          <div className="inline-block px-4 py-1 bg-blue-700 bg-opacity-50 rounded-full text-sm font-semibold mb-6">
            Sự tin tưởng
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Từ phía học viên và phụ huynh
          </h2>

          <div className="w-20 h-1 bg-blue-400 mb-6 md:mx-0 mx-auto"></div>

          <p className="text-lg text-blue-100 max-w-md">
            Những tình cảm, niềm tin từ học viên chính là sự ghi nhận lớn nhất
            dành cho Prep.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-10">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white">10K+</span>
              <span className="text-sm text-blue-200">Học viên</span>
            </div>

            <div className="w-px h-12 bg-blue-700 opacity-50"></div>

            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white">4.9</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((num) => (
                  <AiFillStar key={num} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
            </div>

            <div className="w-px h-12 bg-blue-700 opacity-50"></div>

            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white">97%</span>
              <span className="text-sm text-blue-200">Đạt mục tiêu</span>
            </div>
          </div>
        </div>
        {/* comment section with auto-scrolling */}
        <div className="flex items-center justify-center md:py-[50px]">
          <div className="relative w-[400px] h-[620px] md:w-full md:max-w-[720px] md:h-[620px] overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="h-full overflow-y-auto scrollbar-hide"
              style={{
                scrollBehavior: "auto",
                /* Hide scrollbar for Chrome, Safari and Opera */
                msOverflowStyle: "none" /* IE and Edge */,
                scrollbarWidth: "none" /* Firefox */,
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* CSS to hide scrollbar for WebKit browsers */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5 pb-20">
                {/* Display all comments for scrolling */}
                {DataComment.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-[350px] bg-white h-[300px] space-y-3 mt-2 rounded-xl shadow-2xl border border-gray-100 p-5"
                  >
                    {/* avatar name */}
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar || "/placeholder.svg"}
                        alt={`${item.name}'s avatar`}
                        className="rounded-full object-cover h-12 w-12"
                      />
                      <h3 className="text-xl font-sent font-[550]">
                        {item.name}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="text-gray-900 font-[450] leading-normal">
                      {item.content}
                    </div>

                    {/* section element */}
                    <div className="flex justify-between">
                      {/* stars */}
                      <div className="flex justify-center items-center gap-1">
                        <AiFillStar className="text-yellow-400 fill-yellow-500 h-5 w-5" />
                        <div className="text-base font-[500] font-sans">
                          {item.stars}
                        </div>
                      </div>

                      {/* like */}
                      <div className="flex gap-1 items-center">
                        <FaThumbsUp className="text-blue-500 h-5 w-5" />
                        <div className="text-base font-[500] font-sans">
                          {item.like}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parents;
