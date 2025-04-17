const Content = () => {
  return (
    <section className="pb-12 w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 max-lg:flex-col">
          {/* Left Content Area */}
          <div className="w-full lg:w-3/5 transition-all duration-700 transform">
            <article
              className="flex flex-col items-start py-12 px-8 sm:py-16 sm:px-12 md:py-20 md:px-16 
                         font-bold bg-gradient-to-br from-sky-100 to-blue-50 rounded-3xl shadow-lg"
            >
              <div
                className="px-5 py-3 text-base font-semibold tracking-wider text-sky-800 
                          uppercase rounded-full bg-sky-100 border border-sky-200 shadow-sm"
              >
                Khoá học TOEIC
              </div>
              <h1
                className="flex gap-2 sm:gap-5 items-start mt-8 text-4xl sm:text-5xl 
                          lg:text-6xl font-extrabold leading-tight"
              >
                <span className="text-indigo-900">Luyện Thi</span>
                <span
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-transparent bg-clip-text"
                >
                  TOEIC
                </span>
              </h1>
              <div
                className="flex gap-3 sm:gap-5 mt-3 text-3xl sm:text-4xl lg:text-5xl 
                          font-extrabold leading-tight"
              >
                <span className="text-indigo-800">Hiệu</span>
                <span
                  className="bg-gradient-to-r from-sky-500 to-blue-500 
                             text-transparent bg-clip-text"
                >
                  Quả!
                </span>
              </div>
              <p className="mt-8 text-lg leading-relaxed text-indigo-900 font-medium">
                Với Phòng Luyện TOEIC Ảo kỹ năng đầu tiên & duy nhất tại Việt
                Nam
              </p>
              <button
                className="px-10 py-4 mt-10 text-lg font-semibold
                            text-white bg-gradient-to-r from-sky-600 to-blue-700 
                            hover:from-sky-500 hover:to-blue-600 rounded-full 
                            shadow-lg transform transition hover:scale-105 "
              >
                Thiết kế lộ trình học
              </button>

              {/* Social Proof */}
              <div
                className="flex gap-4 mt-8 text-sm font-medium text-indigo-900 bg-white 
                          bg-opacity-50 p-4 rounded-2xl shadow-sm"
              >
                <div
                  className="flex items-center justify-center bg-gradient-to-r from-blue-500 
                            to-indigo-600 rounded-full h-16 w-16 shadow-md"
                >
                  <span className="text-xl font-bold text-white">30K+</span>
                </div>
                <div className="my-auto">
                  <strong className="text-lg">30.000+</strong> học viên
                  <br />
                  Đã học TOEIC tại Enghub
                </div>
              </div>
            </article>
          </div>

          {/* Right Image Area */}
          <div className="w-full lg:w-2/5">
            <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 shadow-xl">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md">
                <img
                  src="https://cms-static-assets.prepcdn.com/uploads/Frame_1597886190_4c0ba9529c.png?w=1920&q=80"
                  alt="TOEIC student studying"
                  className="object-contain w-full"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 right-10 bg-white bg-opacity-90 p-4 rounded-2xl shadow-lg z-30 transform rotate-6">
                <div className="text-indigo-900 font-bold">TOEIC Score</div>
                <div className="text-2xl font-extrabold text-blue-600">
                  850+
                </div>
              </div>
              <div className="absolute top-1/4 left-6 bg-white bg-opacity-90 p-3 rounded-2xl shadow-lg z-30 transform -rotate-6">
                <div className="text-blue-800 font-bold">🎯 Target</div>
              </div>
              <div
                className="absolute bottom-1/4 right-10 bg-sky-100 bg-opacity-90 p-3 rounded-full w-12 h-12
                            flex items-center justify-center shadow-lg z-30
                           transform transition hover:scale-105 "
              >
                <span className="text-xl transform transition hover:scale-105">
                  ⭐
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
