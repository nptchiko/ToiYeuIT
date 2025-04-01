INSERT INTO skill (name) VALUES
                             ('Writing'),
                             ('Listening'),
                             ('Grammar'),
                             ('Reading'),
                             ('Speaking');
INSERT INTO course
    (title, description, level, price, enabled, duration) VALUES
    ('IELTS Writing Task 2', 'Master essay writing for the IELTS exam.', 'INTERMEDIATE', 49.99, TRUE, 30),
    ('TOEFL Listening Practice', 'Improve your listening skills for the TOEFL test.', 'ADVANCED', 59.99, TRUE, 40),
    ('Grammar for Competitive Exams', 'Essential grammar rules and practice exercises.', 'BASIC', 39.99, TRUE, 25),
    ('Reading Comprehension for Exams', 'Techniques to improve reading speed and understanding.', 'INTERMEDIATE', 45.99, TRUE, 35),
    ('Speaking Fluency for IELTS & TOEFL', 'Develop fluency and confidence in English speaking.', 'ADVANCED', 69.99, TRUE, 50);


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
