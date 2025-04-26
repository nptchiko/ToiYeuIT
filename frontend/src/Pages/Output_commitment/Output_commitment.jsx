import React from "react";
import { useState } from "react";
const Output_commitment = () => {
  const [activeTab, setActiveTab] = useState("listening-reading");
  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        Chương trình Cam kết đầu ra
      </h1>

      <div className="mt-8">
        {/* Tabs */}
        <div className="border-b">
          <div className="grid w-full grid-cols-1 md:grid-cols-3">
            <button
              onClick={() => setActiveTab("listening-reading")}
              className={`py-3 text-sm font-medium ${
                activeTab === "listening-reading"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              TOEIC Listening + Reading
            </button>
            <button
              onClick={() => setActiveTab("speaking-writing")}
              className={`py-3 text-sm font-medium ${
                activeTab === "speaking-writing"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              TOEIC Speaking + Writing
            </button>
            <button
              onClick={() => setActiveTab("four-skills")}
              className={`py-3 text-sm font-medium ${
                activeTab === "four-skills"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              TOEIC 4 Kỹ Năng
            </button>
          </div>
        </div>

        {/* TOEIC Listening + Reading Content */}
        {activeTab === "listening-reading" && (
          <div className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold">
                  CAM KẾT ĐẦU RA TOEIC 2 KỸ NĂNG LISTENING + READING
                </h2>
                <p className="mt-2 text-gray-600">
                  Kính gửi các bạn học viên đăng ký các khóa học TOEIC của
                  Enghub.com
                </p>
              </div>
              <div className="p-6">
                <p className="mb-6">
                  Enghub cam kết đảm bảo đầu ra TOEIC cặp kỹ năng Listening +
                  Reading ("LR") cho học viên theo từng chặng học như sau:
                </p>
                <div className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-medium">1. Chặng học áp dụng:</h3>
                      <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Mục tiêu
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">600 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">800 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-sm italic">
                        *Lưu ý: Ở chặng Nền Tảng TOEIC (bao gồm khóa TOEIC Ngữ
                        Pháp Cơ Bản và TOEIC Từ Vựng Cơ Bản) trong các lộ trình
                        học sẽ không áp dụng cam kết đầu ra.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">2. Thời gian áp dụng:</h3>
                      <p>Bắt đầu từ ngày 06/11/2023 đến hết ngày 31/12/2025.</p>
                    </div>

                    <div>
                      <h3 className="font-medium">3. Yêu cầu đầu vào:</h3>
                      <p className="mb-2">
                        Học viên đăng ký các lộ trình học đã có kết quả thi
                        chính thức đạt yêu cầu đầu vào nói trên tại IIG tối đa
                        03 tháng trước khi đăng ký khoá học HOẶC đã làm bài kiểm
                        tra full test đầu vào đạt yêu cầu đầu vào tương ứng bảng
                        sau:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Yêu cầu đầu vào
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 300</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 120
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 600</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 300
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">4. Thời hạn thi TOEIC:</h3>
                      <p>
                        Áp dụng cho học viên tham dự kì thi do IIG tổ chức trong
                        vòng 01 tháng kể từ ngày kết thúc khóa học (Học viên
                        được coi là kết thúc khóa học nếu hoàn thành đầy đủ
                        nghĩa vụ ở mục II).
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">
                        5. Thời hạn nhận thông tin xin hoàn phí:
                      </h3>
                      <p>
                        Tối đa 01 tháng kể từ ngày học viên nhận kết quả thi
                        TOEIC chính thức từ hội đồng thi, và trong khoảng thời
                        gian áp dụng cam kết theo Khoản 2 Mục I.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <p>
                      Học viên cần hoàn thành đầy đủ và đồng thời các nghĩa vụ
                      sau:
                    </p>

                    <div>
                      <h3 className="font-medium">
                        Về số lượng bài học, bài tập và test luyện đề:
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Học viên bắt buộc xem 100% các video bài giảng trên
                          Enghub.com từ đầu đến cuối video.
                        </li>
                        <li>
                          Làm đầy đủ 100% bài tập đi kèm và đạt số điểm tương
                          đương 80% cho mỗi bài tập.
                        </li>
                        <li>
                          Hoàn thành 100% số bài kiểm tra có trong khóa học và
                          đạt số điểm tương đương 80% cho mỗi bài kiểm tra.
                        </li>
                        <li>
                          (Lưu ý: Đối với bài kiểm tra định kỳ - progress test
                          và mini test, thời gian làm bài tối thiểu là 30 phút/1
                          bài. Các bài kiểm tra còn lại tối thiểu từ 60 phút/ 1
                          bài).
                        </li>
                        <li>
                          Học viên cần làm đề Full test (sử dụng code để kích
                          hoạt TP) trước khi đi thi ở mỗi lộ trình. Yêu cầu HS
                          làm bài nghiêm túc, đúng thời gian cho phép. Cụ thể
                          là:
                          <ul className="list-disc list-inside ml-6 mt-1">
                            <li>
                              Cuối chặng TOEIC LS Trung Cấp, HS cần làm 10 bài
                              Practice test trước khi đi thi.
                            </li>
                            <li>
                              Cuối chặng TOEIC LS Chuyên Sâu, HS cần làm 20 bài
                              Practice test trước khi đi thi.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-medium">Về thời lượng học:</h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Trong suốt thời gian kể từ khi đăng ký học ở Enghub,
                          học viên cần tham gia học liên tục chương trình tối
                          thiểu 1 tiếng/ngày trong ít nhất 3 ngày/tuần.
                        </li>
                        <li>
                          Trong khoảng thời gian 02 tuần trước thời điểm chính
                          thức thi, học viên cần tham gia học tối thiểu 5
                          tiếng/tuần (tính toán dựa trên thời lượng xem video,
                          nộp bài tập và thời gian ở trên trang).
                        </li>
                        <li>
                          Khuyến khích tham gia đầy đủ các chương trình hỗ trợ
                          kiến thức dành riêng cho học viên Enghub, được thầy cô
                          tổ chức trên các nền tảng Online và đã thông báo trên
                          Fanpage chính thức: Enghub For TOEIC.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border"></th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Nội dung học
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Yêu cầu đầu vào
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Cam kết đầu ra
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 1</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                Nền tảng TOEIC (0 - 300)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC Ngữ Pháp Cơ Bản</li>
                                <li>TOEIC Từ Vựng Cơ Bản</li>
                                <li>Từ Mất Gốc</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border"></td>
                            <td className="px-4 py-2 border">Không cam kết</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 2</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Trung Cấp (300 - 600)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 600+</li>
                                <li>Từ Vựng TOEIC Trung Cấp</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 300</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 120
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 600
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 3</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Chuyên Sâu (600 - 800+)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 800+</li>
                                <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 600</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 300
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 800
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p>
                        Học viên cần học hết toàn bộ lộ trình để đủ điều kiện
                        cam kết. Trong trường hợp Học viên đáp ứng các điều kiện
                        tại Mục I, II của cam kết này mà không đạt band điểm như
                        đúng mục tiêu đầu ra của khóa học, Enghub cam kết hoàn
                        lại 100% chi phí của khoá học không đạt đầu ra.
                      </p>
                      <p>
                        Đối với những trường hợp mua lộ trình từ hai chặng trở
                        lên, Học viên đi thi không đạt ở chặng học nào, Enghub
                        sẽ hoàn tiền ở chặng học đó và chặng học liền kề cao hơn
                        (nếu có), căn cứ theo Lộ trình mà học viên đã mua.
                      </p>

                      <div className="p-4 bg-gray-50 rounded-lg mt-4">
                        <p className="font-medium">Lưu ý: Không cam kết khi</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>
                            Học viên không đáp ứng một trong các nghĩa vụ/điều
                            kiện đã nêu trên, Enghub không có trách nhiệm đảm
                            bảo đầu ra cho Học viên, nhưng vẫn sẽ hỗ trợ tối đa
                            để Học viên đạt điểm số cao nhất có thể.
                          </li>
                          <li>
                            Học viên hoàn thành khóa học nhưng không đảm bảo
                            thời gian tham gia kỳ thi TOEIC hoặc quá thời hạn đề
                            xuất hoàn học phí theo các quy định tại Khoản 1, 3
                            và 4 Mục I.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <p>
                      Gửi thông tin theo tiêu đề: "Yêu cầu hoàn tiền - Tên chặng
                      học" tới email support@Enghub.com kèm thông tin như sau:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Thông tin tài khoản của Học viên đăng ký học tại Enghub.
                      </li>
                      <li>
                        Bản Scan kết quả thi chính thức TOEIC từ IIG và các giấy
                        tờ liên quan.
                      </li>
                    </ul>
                    <p>
                      Đội ngũ Enghub sẽ check lại toàn bộ thông tin và phản hồi
                      Học viên một cách chi tiết, đầy đủ nhất về việc Học viên
                      đã đáp ứng đủ điều kiện của Chính sách Cam kết hoàn tiền
                      hay chưa trong vòng 03 ngày làm việc.
                    </p>
                    <p>
                      Nếu đủ điều kiện hoàn tiền, số tiền được hoàn sẽ được trả
                      về tài khoản của Học viên trong vòng 30 ngày, kể từ ngày
                      Enghub xác nhận thông tin tới email của Học viên.
                    </p>
                    <p className="font-medium mt-4">
                      Chúc quý học viên có kết quả học tập thật tốt và hoàn
                      thành mục tiêu.
                    </p>
                    <p className="font-medium">Trân trọng cảm ơn!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOEIC Speaking + Writing Content */}
        {activeTab === "speaking-writing" && (
          <div className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold">
                  CAM KẾT ĐẦU RA TOEIC 2 KỸ NĂNG SPEAKING + WRITING
                </h2>
                <p className="mt-2 text-gray-600">
                  Kính gửi các bạn học viên đăng ký các khóa học TOEIC của
                  Enghub.com
                </p>
              </div>
              <div className="p-6">
                <p className="mb-6">
                  Enghub cam kết đảm bảo đầu ra TOEIC cặp kỹ năng Speaking +
                  Writing ("SW") cho học viên theo từng chặng học như sau:
                </p>
                <div className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-medium">1. Chặng học áp dụng:</h3>
                      <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Mục tiêu
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">600 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">800 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-sm italic">
                        *Lưu ý: Ở chặng Nền Tảng TOEIC (bao gồm khóa TOEIC Ngữ
                        Pháp Cơ Bản và TOEIC Từ Vựng Cơ Bản) trong các lộ trình
                        học sẽ không áp dụng cam kết đầu ra.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">2. Thời gian áp dụng:</h3>
                      <p>Bắt đầu từ ngày 06/11/2023 đến hết ngày 31/12/2025.</p>
                    </div>

                    <div>
                      <h3 className="font-medium">3. Yêu cầu đầu vào:</h3>
                      <p className="mb-2">
                        Học viên đăng ký các lộ trình học đã có kết quả thi
                        chính thức đạt yêu cầu đầu vào nói trên tại IIG tối đa
                        03 tháng trước khi đăng ký khoá học HOẶC đã làm bài kiểm
                        tra full test đầu vào đạt yêu cầu đầu vào tương ứng bảng
                        sau:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Yêu cầu đầu vào
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 300</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 120
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 600</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 300
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">4. Thời hạn thi TOEIC:</h3>
                      <p>
                        Áp dụng cho học viên tham dự kì thi do IIG tổ chức trong
                        vòng 01 tháng kể từ ngày kết thúc khóa học (Học viên
                        được coi là kết thúc khóa học nếu hoàn thành đầy đủ
                        nghĩa vụ ở mục II).
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">
                        5. Thời hạn nhận thông tin xin hoàn phí:
                      </h3>
                      <p>
                        Tối đa 01 tháng kể từ ngày học viên nhận kết quả thi
                        TOEIC chính thức từ hội đồng thi, và trong khoảng thời
                        gian áp dụng cam kết theo Khoản 2 Mục I.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <p>
                      Học viên cần hoàn thành đầy đủ và đồng thời các nghĩa vụ
                      sau:
                    </p>

                    <div>
                      <h3 className="font-medium">
                        Về số lượng bài học, bài tập và test luyện đề:
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Học viên bắt buộc xem 100% các video bài giảng trên
                          Enghub.com từ đầu đến cuối video.
                        </li>
                        <li>
                          Làm đầy đủ 100% bài tập đi kèm và đạt số điểm tương
                          đương 80% cho mỗi bài tập.
                        </li>
                        <li>
                          Hoàn thành 100% số bài kiểm tra có trong khóa học và
                          đạt số điểm tương đương 80% cho mỗi bài kiểm tra.
                        </li>
                        <li>
                          (Lưu ý: Đối với bài kiểm tra định kỳ - progress test
                          và mini test, thời gian làm bài tối thiểu là 30 phút/1
                          bài. Các bài kiểm tra còn lại tối thiểu từ 60 phút/ 1
                          bài).
                        </li>
                        <li>
                          Học viên cần làm đề Full test (sử dụng code để kích
                          hoạt TP) trước khi đi thi ở mỗi lộ trình. Yêu cầu HS
                          làm bài nghiêm túc, đúng thời gian cho phép. Cụ thể
                          là:
                          <ul className="list-disc list-inside ml-6 mt-1">
                            <li>
                              Cuối chặng TOEIC LS Trung Cấp, HS cần làm 10 bài
                              Practice test trước khi đi thi.
                            </li>
                            <li>
                              Cuối chặng TOEIC LS Chuyên Sâu, HS cần làm 20 bài
                              Practice test trước khi đi thi.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-medium">Về thời lượng học:</h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Trong suốt thời gian kể từ khi đăng ký học ở Enghub,
                          học viên cần tham gia học liên tục chương trình tối
                          thiểu 1 tiếng/ngày trong ít nhất 3 ngày/tuần.
                        </li>
                        <li>
                          Trong khoảng thời gian 02 tuần trước thời điểm chính
                          thức thi, học viên cần tham gia học tối thiểu 5
                          tiếng/tuần (tính toán dựa trên thời lượng xem video,
                          nộp bài tập và thời gian ở trên trang).
                        </li>
                        <li>
                          Khuyến khích tham gia đầy đủ các chương trình hỗ trợ
                          kiến thức dành riêng cho học viên Enghub, được thầy cô
                          tổ chức trên các nền tảng Online và đã thông báo trên
                          Fanpage chính thức: Enghub For TOEIC.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border"></th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Nội dung học
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Yêu cầu đầu vào
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Cam kết đầu ra
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 1</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                Nền tảng TOEIC (0 - 300)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC Ngữ Pháp Cơ Bản</li>
                                <li>TOEIC Từ Vựng Cơ Bản</li>
                                <li>Từ Mất Gốc</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border"></td>
                            <td className="px-4 py-2 border">Không cam kết</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 2</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Trung Cấp (300 - 600)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 600+</li>
                                <li>Từ Vựng TOEIC Trung Cấp</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 300</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 120
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 600
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 3</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Chuyên Sâu (600 - 800+)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 800+</li>
                                <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 600</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 300
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 800
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p>
                        Học viên cần học hết toàn bộ lộ trình để đủ điều kiện
                        cam kết. Trong trường hợp Học viên đáp ứng các điều kiện
                        tại Mục I, II của cam kết này mà không đạt band điểm như
                        đúng mục tiêu đầu ra của khóa học, Enghub cam kết hoàn
                        lại 100% chi phí của khoá học không đạt đầu ra.
                      </p>
                      <p>
                        Đối với những trường hợp mua lộ trình từ hai chặng trở
                        lên, Học viên đi thi không đạt ở chặng học nào, Enghub
                        sẽ hoàn tiền ở chặng học đó và chặng học liền kề cao hơn
                        (nếu có), căn cứ theo Lộ trình mà học viên đã mua.
                      </p>

                      <div className="p-4 bg-gray-50 rounded-lg mt-4">
                        <p className="font-medium">Lưu ý: Không cam kết khi</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>
                            Học viên không đáp ứng một trong các nghĩa vụ/điều
                            kiện đã nêu trên, Enghub không có trách nhiệm đảm
                            bảo đầu ra cho Học viên, nhưng vẫn sẽ hỗ trợ tối đa
                            để Học viên đạt điểm số cao nhất có thể.
                          </li>
                          <li>
                            Học viên hoàn thành khóa học nhưng không đảm bảo
                            thời gian tham gia kỳ thi TOEIC hoặc quá thời hạn đề
                            xuất hoàn học phí theo các quy định tại Khoản 1, 3
                            và 4 Mục I.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <p>
                      Gửi thông tin theo tiêu đề: "Yêu cầu hoàn tiền - Tên chặng
                      học" tới email support@Enghub.com kèm thông tin như sau:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Thông tin tài khoản của Học viên đăng ký học tại Enghub.
                      </li>
                      <li>
                        Bản Scan kết quả thi chính thức TOEIC từ IIG và các giấy
                        tờ liên quan.
                      </li>
                    </ul>
                    <p>
                      Đội ngũ Enghub sẽ check lại toàn bộ thông tin và phản hồi
                      Học viên một cách chi tiết, đầy đủ nhất về việc Học viên
                      đã đáp ứng đủ điều kiện của Chính sách Cam kết hoàn tiền
                      hay chưa trong vòng 03 ngày làm việc.
                    </p>
                    <p>
                      Nếu đủ điều kiện hoàn tiền, số tiền được hoàn sẽ được trả
                      về tài khoản của Học viên trong vòng 30 ngày, kể từ ngày
                      Enghub xác nhận thông tin tới email của Học viên.
                    </p>
                    <p className="font-medium mt-4">
                      Chúc quý học viên có kết quả học tập thật tốt và hoàn
                      thành mục tiêu.
                    </p>
                    <p className="font-medium">Trân trọng cảm ơn!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOEIC 4 Skills Content */}
        {activeTab === "four-skills" && (
          <div className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold">
                  CAM KẾT ĐẦU RA TOEIC 4 KỸ NĂNG
                </h2>
                <p className="mt-2 text-gray-600">
                  Kính gửi các bạn học viên đăng ký các khóa học TOEIC của
                  Enghub.com
                </p>
              </div>
              <div className="p-6">
                <p className="mb-6">
                  Enghub cam kết đảm bảo đầu ra TOEIC 4 kỹ năng theo từng chặng
                  cho học viên như sau:
                </p>
                <div className="space-y-4">
                  <div className="space-y-4 mt-4">
                    <div>
                      <h3 className="font-medium">1. Chặng học áp dụng:</h3>
                      <div className="mt-2 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Mục tiêu
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">600 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">800 TOEIC LR</td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-2 text-sm italic">
                        *Lưu ý: Ở chặng Nền Tảng TOEIC (bao gồm khóa TOEIC Ngữ
                        Pháp Cơ Bản và TOEIC Từ Vựng Cơ Bản) trong các lộ trình
                        học sẽ không áp dụng cam kết đầu ra.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">2. Thời gian áp dụng:</h3>
                      <p>Bắt đầu từ ngày 06/11/2023 đến hết ngày 31/12/2025.</p>
                    </div>

                    <div>
                      <h3 className="font-medium">3. Yêu cầu đầu vào:</h3>
                      <p className="mb-2">
                        Học viên đăng ký các lộ trình học đã có kết quả thi
                        chính thức đạt yêu cầu đầu vào nói trên tại IIG tối đa
                        03 tháng trước khi đăng ký khoá học HOẶC đã làm bài kiểm
                        tra full test đầu vào đạt yêu cầu đầu vào tương ứng bảng
                        sau:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Chặng học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Nội dung học
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                                Yêu cầu đầu vào
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Trung Cấp
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 600+</li>
                                  <li>Từ Vựng TOEIC Trung Cấp</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 300</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 120
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">
                                TOEIC LR Chuyên Sâu
                              </td>
                              <td className="px-4 py-2 border">
                                <ul className="list-disc list-inside">
                                  <li>TOEIC LR 800+</li>
                                  <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                  <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                                </ul>
                              </td>
                              <td className="px-4 py-2 border">
                                <p>TOEIC Listening + Reading: 600</p>
                                <p className="text-sm">
                                  * Listening + Reading không có kĩ năng nào
                                  dưới TOEIC 300
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">4. Thời hạn thi TOEIC:</h3>
                      <p>
                        Áp dụng cho học viên tham dự kì thi do IIG tổ chức trong
                        vòng 01 tháng kể từ ngày kết thúc khóa học (Học viên
                        được coi là kết thúc khóa học nếu hoàn thành đầy đủ
                        nghĩa vụ ở mục II).
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium">
                        5. Thời hạn nhận thông tin xin hoàn phí:
                      </h3>
                      <p>
                        Tối đa 01 tháng kể từ ngày học viên nhận kết quả thi
                        TOEIC chính thức từ hội đồng thi, và trong khoảng thời
                        gian áp dụng cam kết theo Khoản 2 Mục I.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-4">
                    <p>
                      Học viên cần hoàn thành đầy đủ và đồng thời các nghĩa vụ
                      sau:
                    </p>

                    <div>
                      <h3 className="font-medium">
                        Về số lượng bài học, bài tập và test luyện đề:
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Học viên bắt buộc xem 100% các video bài giảng trên
                          Enghub.com từ đầu đến cuối video.
                        </li>
                        <li>
                          Làm đầy đủ 100% bài tập đi kèm và đạt số điểm tương
                          đương 80% cho mỗi bài tập.
                        </li>
                        <li>
                          Hoàn thành 100% số bài kiểm tra có trong khóa học và
                          đạt số điểm tương đương 80% cho mỗi bài kiểm tra.
                        </li>
                        <li>
                          (Lưu ý: Đối với bài kiểm tra định kỳ - progress test
                          và mini test, thời gian làm bài tối thiểu là 30 phút/1
                          bài. Các bài kiểm tra còn lại tối thiểu từ 60 phút/ 1
                          bài).
                        </li>
                        <li>
                          Học viên cần làm đề Full test (sử dụng code để kích
                          hoạt TP) trước khi đi thi ở mỗi lộ trình. Yêu cầu HS
                          làm bài nghiêm túc, đúng thời gian cho phép. Cụ thể
                          là:
                          <ul className="list-disc list-inside ml-6 mt-1">
                            <li>
                              Cuối chặng TOEIC LS Trung Cấp, HS cần làm 10 bài
                              Practice test trước khi đi thi.
                            </li>
                            <li>
                              Cuối chặng TOEIC LS Chuyên Sâu, HS cần làm 20 bài
                              Practice test trước khi đi thi.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-medium">Về thời lượng học:</h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2">
                        <li>
                          Trong suốt thời gian kể từ khi đăng ký học ở Enghub,
                          học viên cần tham gia học liên tục chương trình tối
                          thiểu 1 tiếng/ngày trong ít nhất 3 ngày/tuần.
                        </li>
                        <li>
                          Trong khoảng thời gian 02 tuần trước thời điểm chính
                          thức thi, học viên cần tham gia học tối thiểu 5
                          tiếng/tuần (tính toán dựa trên thời lượng xem video,
                          nộp bài tập và thời gian ở trên trang).
                        </li>
                        <li>
                          Khuyến khích tham gia đầy đủ các chương trình hỗ trợ
                          kiến thức dành riêng cho học viên Enghub, được thầy cô
                          tổ chức trên các nền tảng Online và đã thông báo trên
                          Fanpage chính thức: Enghub For TOEIC.
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border"></th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Nội dung học
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Yêu cầu đầu vào
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 border">
                              Cam kết đầu ra
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 1</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                Nền tảng TOEIC (0 - 300)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC Ngữ Pháp Cơ Bản</li>
                                <li>TOEIC Từ Vựng Cơ Bản</li>
                                <li>Từ Mất Gốc</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border"></td>
                            <td className="px-4 py-2 border">Không cam kết</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 2</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Trung Cấp (300 - 600)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 600+</li>
                                <li>Từ Vựng TOEIC Trung Cấp</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 300</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 120
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 600
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 border">Chặng 3</td>
                            <td className="px-4 py-2 border">
                              <p className="font-medium">
                                TOEIC LR Chuyên Sâu (600 - 800+)
                              </p>
                              <ul className="list-disc list-inside mt-1">
                                <li>TOEIC LR 800+</li>
                                <li>Từ Vựng TOEIC Chuyên Sâu</li>
                                <li>1000 Câu Luyện Đề TOEIC New Economy</li>
                              </ul>
                            </td>
                            <td className="px-4 py-2 border">
                              <p>TOEIC Listening + Reading: 600</p>
                              <p className="text-sm">
                                * Listening + Reading không có kĩ năng nào dưới
                                TOEIC 300
                              </p>
                            </td>
                            <td className="px-4 py-2 border font-medium">
                              TOEIC LR 800
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p>
                        Học viên cần học hết toàn bộ lộ trình để đủ điều kiện
                        cam kết. Trong trường hợp Học viên đáp ứng các điều kiện
                        tại Mục I, II của cam kết này mà không đạt band điểm như
                        đúng mục tiêu đầu ra của khóa học, Enghub cam kết hoàn
                        lại 100% chi phí của khoá học không đạt đầu ra.
                      </p>
                      <p>
                        Đối với những trường hợp mua lộ trình từ hai chặng trở
                        lên, Học viên đi thi không đạt ở chặng học nào, Enghub
                        sẽ hoàn tiền ở chặng học đó và chặng học liền kề cao hơn
                        (nếu có), căn cứ theo Lộ trình mà học viên đã mua.
                      </p>

                      <div className="p-4 bg-gray-50 rounded-lg mt-4">
                        <p className="font-medium">Lưu ý: Không cam kết khi</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>
                            Học viên không đáp ứng một trong các nghĩa vụ/điều
                            kiện đã nêu trên, Enghub không có trách nhiệm đảm
                            bảo đầu ra cho Học viên, nhưng vẫn sẽ hỗ trợ tối đa
                            để Học viên đạt điểm số cao nhất có thể.
                          </li>
                          <li>
                            Học viên hoàn thành khóa học nhưng không đảm bảo
                            thời gian tham gia kỳ thi TOEIC hoặc quá thời hạn đề
                            xuất hoàn học phí theo các quy định tại Khoản 1, 3
                            và 4 Mục I.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <p>
                      Gửi thông tin theo tiêu đề: "Yêu cầu hoàn tiền - Tên chặng
                      học" tới email support@Enghub.com kèm thông tin như sau:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Thông tin tài khoản của Học viên đăng ký học tại Enghub.
                      </li>
                      <li>
                        Bản Scan kết quả thi chính thức TOEIC từ IIG và các giấy
                        tờ liên quan.
                      </li>
                    </ul>
                    <p>
                      Đội ngũ Enghub sẽ check lại toàn bộ thông tin và phản hồi
                      Học viên một cách chi tiết, đầy đủ nhất về việc Học viên
                      đã đáp ứng đủ điều kiện của Chính sách Cam kết hoàn tiền
                      hay chưa trong vòng 03 ngày làm việc.
                    </p>
                    <p>
                      Nếu đủ điều kiện hoàn tiền, số tiền được hoàn sẽ được trả
                      về tài khoản của Học viên trong vòng 30 ngày, kể từ ngày
                      Enghub xác nhận thông tin tới email của Học viên.
                    </p>
                    <p className="font-medium mt-4">
                      Chúc quý học viên có kết quả học tập thật tốt và hoàn
                      thành mục tiêu.
                    </p>
                    <p className="font-medium">Trân trọng cảm ơn!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Output_commitment;
