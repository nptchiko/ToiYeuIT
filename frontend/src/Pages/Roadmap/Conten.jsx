const Conten = () => {
  return (
    <section className="pb-9 rounded-none w-full overflow-hidden">
      <div className="flex gap-0 max-md:flex-col">
        <div className="w-[60%] max-md:ml-0 max-md:w-full">
          <article className="flex ml-3 flex-col items-start py-12 px-8 sm:py-16 sm:px-12 md:py-20 md:px-16 lg:py-[100px] lg:px-[100px] mx-auto w-full font-bold bg-sky-100 rounded-[32px_32px_0px_32px] max-md:max-w-full">
            <div className="px-4 py-3 text-base font-semibold tracking-widest text-sky-800 uppercase rounded-3xl bg-sky-800 bg-opacity-10">
              Khoá học TOEIC
            </div>

            <h1 className="flex flex-wrap gap-2 sm:gap-5 items-start mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none">
              <span className="grow self-stretch text-indigo-900">
                Luyện Thi
              </span>
              <span className="leading-none basis-auto">TOEIC</span>
            </h1>

            <div className="flex gap-3 sm:gap-7 mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none text-indigo-900">
              <span className="grow">Hiệu</span>
              <span className="basis-auto">Quả!</span>
            </div>

            <p className="mt-6 sm:mt-10 md:mt-14 text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-indigo-900 max-md:max-w-full">
              Với Phòng Luyện TOEIC Ảo kỹ năng đầu tiên & duy nhất tại
              <br className="hidden sm:block" />
              Việt Nam
            </p>

            <button className="px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 mt-8 sm:mt-12 md:mt-16 text-base tracking-normal text-center text-white bg-sky-800 rounded-[32px] w-full sm:w-auto">
              Thiết kế lộ trình học
            </button>

            <div className="flex gap-4 mt-6 text-sm leading-5 text-indigo-900">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe4dfab339c5a89e7915b8330d90e71f11135e6253b8a18c563d8864f60882a1?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
                alt="Student statistics"
                className="object-contain shrink-0 w-20 rounded-full shadow-md aspect-[2]"
              />
              <div className="my-auto">
                <strong>30.000+</strong> học viên
                <br />
                Đã học TOEIC tại Enghub
              </div>
            </div>
          </article>
        </div>
        <div className="w-[40%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col grow items-start h-full min-h-[300px] md:min-h-[500px] lg:min-h-[732px] max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/46af2340beccaf1f894c7f6c8099cb28328390225ebec795d93ce0085489d55b?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
              alt="TOEIC course background"
              className="object-cover absolute inset-0 size-full rounded-[32px_32px_32px_0px] z-10"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/91d488bc860d0b4b55ce117febe9c99a86bd71b1d893ae0246210e36686cc7f6?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
              alt="TOEIC course feature"
              className="object-contain w-full max-w-[120%] absolute bottom-7 left-[30%] -translate-x-1/2 z-20 max-md:scale-100 md:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Conten;
