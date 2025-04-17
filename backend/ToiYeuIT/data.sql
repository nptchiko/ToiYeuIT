INSERT INTO skill (name) VALUES
                             ('Writing'),
                             ('Listening'),
                             ('Grammar'),
                             ('Reading'),
                             ('Speaking');

INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 450+ Cơ Bản', 'Nền tảng từ vựng, ngữ pháp và kỹ năng làm bài cơ bản.', 'BASIC', 1200000.00, 1, 6, 'Phổ biến');
INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 650+ Trung Cấp', 'Rèn luyện kỹ năng Part 3-4-5-6, chiến thuật xử lý câu hỏi.', 'INTERMEDIATE', 1800000.00, 1, 8, 'Bestseller');
INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 800+ Nâng Cao', 'Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.', 'ADVANCED', 2400000.00, 1, 10, 'Premium');
INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 750+ Cơ Bản', 'Nền tảng từ vựng, ngữ pháp và kỹ năng làm bài cơ bản.', 'BASIC', 1200000.00, 1, 6, 'Mới');
INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 850+ Trung Cấp', 'Rèn luyện kỹ năng Part 3-4-5-6, chiến thuật xử lý câu hỏi.', 'INTERMEDIATE', 1800000.00, 1, 8, 'Đề xuất');
INSERT INTO ToiYeuIT.course (title, description, level, price, enabled, duration, tag) VALUES ('TOEIC 900+ Nâng Cao', 'Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.', 'ADVANCED', 2400000.00, 1, 10, 'VIP');

INSERT INTO `question` (`ques_id`, `description`, `correct_ans`, `question_scope`, `question_type`, `audio_src`, `img_src`) VALUES (1, 'Câu hỏi 1.', '(D)', 'TEST', 'MULTIPLECHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/30449101.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/418922160-1620725865601-pic1.png');
INSERT INTO `multichoice_detail` (`ques_id`, `key`, `answer_description`) VALUES (1, 'A', '(A)');

INSERT INTO lessons (title, video_url, image_url, description, course_id, skill_id) VALUES
('Understanding Essay Structures', 'https://example.com/ielts-essay.mp4', 'https://example.com/ielts-essay.jpg', 'Learn different essay structures for IELTS Writing Task 2.', 1, 1),
('How to Write a Strong Thesis Statement', 'https://example.com/ielts-thesis.mp4', 'https://example.com/ielts-thesis.jpg', 'Tips for writing a clear and strong thesis statement.', 1, 1),
('Common Mistakes in IELTS Essays', 'https://example.com/ielts-mistakes.mp4', 'https://example.com/ielts-mistakes.jpg', 'Avoid these common mistakes in your IELTS Writing Task 2 response.', 1, 1),
('Listening for Main Ideas', 'https://example.com/toefl-main-idea.mp4', 'https://example.com/toefl-main-idea.jpg', 'How to identify the main ideas in TOEFL listening passages.', 2, 2),
('Note-Taking Strategies', 'https://example.com/toefl-notes.mp4', 'https://example.com/toefl-notes.jpg', 'Effective note-taking strategies for TOEFL listening sections.', 2, 2),
('Understanding Academic Lectures', 'https://example.com/toefl-lectures.mp4', 'https://example.com/toefl-lectures.jpg', 'How to follow and understand academic lectures in TOEFL.', 2, 2),
('Mastering Subject-Verb Agreement', 'https://example.com/grammar-sva.mp4', 'https://example.com/grammar-sva.jpg', 'Learn and practice subject-verb agreement rules.', 3, 3),
('Understanding Tenses in English', 'https://example.com/grammar-tenses.mp4', 'https://example.com/grammar-tenses.jpg', 'A complete guide to English tenses.', 3, 3),
('Common Grammar Mistakes', 'https://example.com/grammar-mistakes.mp4', 'https://example.com/grammar-mistakes.jpg', 'Avoid these common grammar mistakes in exams.', 3, 3),
('Skimming and Scanning Techniques', 'https://example.com/reading-techniques.mp4', 'https://example.com/reading-techniques.jpg', 'Learn how to read quickly and efficiently for exams.', 4, 4),
('How to Identify Key Information', 'https://example.com/reading-keyinfo.mp4', 'https://example.com/reading-keyinfo.jpg', 'Strategies for identifying key details in passages.', 4, 4),
('Improving Pronunciation and Fluency', 'https://example.com/speaking-pronunciation.mp4', 'https://example.com/speaking-pronunciation.jpg', 'Techniques to improve pronunciation and fluency.', 5, 5),
('Answering Common IELTS Speaking Questions', 'https://example.com/speaking-ielts.mp4', 'https://example.com/speaking-ielts.jpg', 'Learn how to respond to common IELTS Speaking topics.', 5, 5);

INSERT INTO role (name) VALUES
('ADMIN'),
('STUDENT'),
('TEACHER'),
('USER');
