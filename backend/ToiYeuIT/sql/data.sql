use ToiYeuIT;


INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 450+ Cơ Bản', 'Nền tảng từ vựng, ngữ pháp và kỹ năng làm bài cơ bản.', 'BASIC', 1200000.00, 1, 6, 'Phổ biến', 'LR');
INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 650+ Trung Cấp', 'Rèn luyện kỹ năng Part 3-4-5-6, chiến thuật xử lý câu hỏi.', 'INTERMEDIATE', 1800000.00, 1, 8, 'Bestseller', 'SW');
INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 800+ Nâng Cao', 'Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.', 'ADVANCED', 2400000.00, 1, 10, 'Premium', 'LR');
INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 750+ Cơ Bản', 'Nền tảng từ vựng, ngữ pháp và kỹ năng làm bài cơ bản.', 'BASIC', 1200000.00, 1, 6, 'Mới', 'SW');
INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 850+ Trung Cấp', 'Rèn luyện kỹ năng Part 3-4-5-6, chiến thuật xử lý câu hỏi.', 'INTERMEDIATE', 1800000.00, 1, 8, 'Đề xuất', 'LR');
INSERT INTO course (title, description, level, price, enabled, duration, tag, type) VALUES ('TOEIC 900+ Nâng Cao', 'Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.', 'ADVANCED', 2400000.00, 1, 10, 'VIP', 'SW');

INSERT INTO skill (name) VALUES ('LISTENING');
INSERT INTO skill (name) VALUES ('READING');
INSERT INTO skill (name) VALUES ('WRITING');
INSERT INTO skill (name) VALUES ('SPEAKING');



INSERT INTO lesson (lesson_id, course_id, title, description, order_index, video_url, materials_url) VALUES
(1, 1, 'Introduction to Nouns', 'Understanding common and proper nouns.', 1, 'https://www.youtube.com/embed/gleyKDvZ3x0', 'https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png'),
(2, 1, 'Verbs: The Action Words', 'Basics of verbs and their types.', 2, 'https://www.youtube.com/embed/gleyKDvZ3x0', 'https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png'),
(3, 1, 'Present Simple Tense', 'Forming and using the present simple tense.', 3, 'https://www.youtube.com/embed/gleyKDvZ3x0', 'https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png'),
(4, 2, 'Past Simple vs. Present Perfect', 'Distinguishing between past simple and present perfect usage.', 1, 'https://www.youtube.com/embed/gleyKDvZ3x0', 'https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png'),
(5, 2, 'Future Tenses Overview', 'Will, Be Going To, and Present Continuous for future.', 2, 'https://www.youtube.com/embed/gleyKDvZ3x0', 'https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png');



-- Grammar content for lessons
INSERT INTO grammar (grammar_id, lesson_id, title, content) VALUES
(1, 1, 'Nouns Explained', 'A noun is a word that names a person (e.g., teacher, Mary), a place (e.g., city, school), a thing (e.g., book, car), or an idea (e.g., freedom, happiness). Common nouns refer to general categories (e.g., dog, country). Proper nouns refer to specific names and are capitalized (e.g., Fido, France).'),
(2, 2, 'Understanding Verbs', 'Verbs are words that express action (e.g., run, eat, think) or a state of being (e.g., is, am, are, seem, feel). They are essential for forming sentences. Main verbs carry the primary meaning, while auxiliary verbs (helping verbs) like "be," "do," and "have" help form tenses, moods, and voices.'),
(3, 3, 'The Present Simple Tense', 'The present simple tense is used to describe habits, unchanging situations, general truths, and fixed arrangements. For most verbs, the base form is used. For third-person singular (he, she, it), an "-s" or "-es" is added. Example: I walk. She walks. They study. He studies.'),
(4, 4, 'Past Simple vs. Present Perfect Deep Dive', 'Past Simple (e.g., I visited Paris last year) is used for completed actions at a specific time in the past. Present Perfect (e.g., I have visited Paris) is used for actions completed at an unspecified time in the past, actions that started in the past and continue to the present, or past actions with present results. Key signal words for Past Simple: yesterday, last week, in 2010. Key signal words for Present Perfect: ever, never, already, yet, since, for.'),
(5, 5, 'Expressing the Future', '"Will" is often used for spontaneous decisions, predictions, and promises (e.g., I will help you). "Be going to" is used for plans and intentions (e.g., I am going to visit my aunt). Present Continuous (e.g., I am meeting John tomorrow) can be used for fixed future arrangements.');

-- Quiz questions for grammar sections

-- For Grammar ID 1 (Nouns Explained, Lesson ID 1)
INSERT INTO grammar_quiz (grammar_quiz_id, grammar_id, question_text, order_index) VALUES
(1, 1, 'Which of the following is a proper noun?', 1),
(2, 1, 'Identify the common noun in the sentence: "The cat sat on the mat."', 2);

-- For Grammar ID 2 (Understanding Verbs, Lesson ID 2)
INSERT INTO grammar_quiz (grammar_quiz_id, grammar_id, question_text, order_index) VALUES
(3, 2, 'Which word is an action verb: "She quickly reads the book."', 1),
(4, 2, 'Which of these is an auxiliary (helping) verb?', 2);

-- For Grammar ID 3 (The Present Simple Tense, Lesson ID 3)
INSERT INTO grammar_quiz (grammar_quiz_id, grammar_id, question_text, order_index) VALUES
(5, 3, 'Choose the correct present simple form: "He ___ (play) football every Saturday."', 1),
(6, 3, 'Which sentence uses the present simple tense correctly for a general truth?', 2);

-- For Grammar ID 4 (Past Simple vs. Present Perfect, Lesson ID 4)
INSERT INTO grammar_quiz (grammar_quiz_id, grammar_id, question_text, order_index) VALUES
(7, 4, 'Complete the sentence with the correct tense: "I ___ (see) that movie last week."', 1),
(8, 4, 'Complete the sentence: "She ___ (live) in London since 2010."', 2);

-- For Grammar ID 5 (Expressing the Future, Lesson ID 5)
INSERT INTO grammar_quiz (grammar_quiz_id, grammar_id, question_text, order_index) VALUES
(9, 5, 'Which form is best for a spontaneous decision: "The phone is ringing! I ___ get it."', 1),
(10, 5, 'They have decided on their holiday. They ___ (visit) Spain next month.', 2);


-- Options for quiz questions

-- Options for Grammar Quiz ID 1 (Proper Noun?)
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(1, 1, 'city', FALSE),
(2, 1, 'London', TRUE),
(3, 1, 'book', FALSE),
(4, 1, 'happiness', FALSE);

-- Options for Grammar Quiz ID 2 (Common Noun: "The cat sat on the mat.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(5, 2, 'The', FALSE),
(6, 2, 'cat', TRUE), -- Could also be 'mat', but 'cat' is a good primary example
(7, 2, 'sat', FALSE),
(8, 2, 'on', FALSE);

-- Options for Grammar Quiz ID 3 (Action verb: "She quickly reads the book.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(9, 3, 'quickly', FALSE),
(10, 3, 'reads', TRUE),
(11, 3, 'the', FALSE),
(12, 3, 'book', FALSE);

-- Options for Grammar Quiz ID 4 (Auxiliary verb?)
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(13, 4, 'run', FALSE),
(14, 4, 'eat', FALSE),
(15, 4, 'have (as in "have seen")', TRUE),
(16, 4, 'beautiful', FALSE);

-- Options for Grammar Quiz ID 5 ("He ___ (play) football every Saturday.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(17, 5, 'play', FALSE),
(18, 5, 'plays', TRUE),
(19, 5, 'playing', FALSE),
(20, 5, 'is playing', FALSE);

-- Options for Grammar Quiz ID 6 (Present simple for general truth)
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(21, 6, 'The sun rises in the east.', TRUE),
(22, 6, 'I am reading a book now.', FALSE),
(23, 6, 'She went to the market yesterday.', FALSE),
(24, 6, 'They will travel to Italy next year.', FALSE);

-- Options for Grammar Quiz ID 7 ("I ___ (see) that movie last week.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(25, 7, 'see', FALSE),
(26, 7, 'have seen', FALSE),
(27, 7, 'saw', TRUE),
(28, 7, 'am seeing', FALSE);

-- Options for Grammar Quiz ID 8 ("She ___ (live) in London since 2010.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(29, 8, 'lived', FALSE),
(30, 8, 'has lived', TRUE),
(31, 8, 'lives', FALSE),
(32, 8, 'is living', FALSE);

-- Options for Grammar Quiz ID 9 ("The phone is ringing! I ___ get it.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(33, 9, 'am going to', FALSE),
(34, 9, 'will', TRUE),
(35, 9, 'am', FALSE),
(36, 9, 'do', FALSE);

-- Options for Grammar Quiz ID 10 ("They ___ (visit) Spain next month.")
INSERT INTO quiz_option (option_id, grammar_quiz_id, option_text, is_correct) VALUES
(37, 10, 'will visit', FALSE), -- plausible but 'are going to visit' is better for pre-decided plans
(38, 10, 'are going to visit', TRUE),
(39, 10, 'visit', FALSE),
(40, 10, 'visited', FALSE);


-- User answers to track progress
/*
-- User 101 (John Doe)
INSERT INTO quiz_user_submission (user_id, question_id, selected_option_id) VALUES
(1, 1, 2), -- Correct (London)
(1, 2, 5), -- Incorrect (The)
(1, 5, 18); -- Correct (plays)

-- User 102 (Jane Smith)
INSERT INTO quiz_user_submission (user_id, question_id, selected_option_id) VALUES
(2, 1, 2), -- Correct (London)
(2, 3, 10), -- Correct (reads)
(2, 7, 27), -- Correct (saw)
(2, 8, 30); -- Correct (has lived)

-- User 103 (Learner Bob)
INSERT INTO quiz_user_submission (user_id, question_id, selected_option_id) VALUES
(3, 1, 1), -- Incorrect (city)
(3, 5, 17), -- Incorrect (play)
(3, 9, 34); -- Correct (will)
*/
# Test data
insert into test_collection (id, skill_id, description, title)
values  (1, 1, 'Listening Test Collection', 'Listening Tests'),
        (2, 2, 'Reading Test Collection', 'Reading Tests'),
        (3, 1, 'Listening Input Test Collection', 'Listening Test Đầu Vào'),
        (4, 2, 'Reading Input Test Collection', 'Reading Test Đầu Vào');

# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (1, 1, 'Test 1: Bộ Đề Thi TOEIC LISTENING Thực Ch', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (1, 2, 'Test 2: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (1, 3, 'Test 3: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 800+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (1, 4, 'Test 4: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 900+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (1, 5, 'Test TOEIC LISTENING đầu vào', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (2, 1, 'Test 1: Bộ Đề Thi TOEIC READING Thực Chiến Chuẩn Format 700+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (2, 2, 'Test 2: Bộ Đề Thi TOEIC READING Thực Chiến Chuẩn Format 800+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (2, 2, 'Test 2: Bộ Đề Thi TOEIC READING Thực Chiến Chuẩn Format 900+', true);
# INSERT INTO test (test_collection_id, indexx, title, enabled) VALUES (2, 3, 'Test TOEIC READING đầu vào', true);

insert into test (id, test_collection_id, indexx, title, enabled)
values  (1, 1, 1, 'Test 1: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true),
        (2, 1, 2, 'Test 2: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true),
        (3, 1, 3, 'Test 3: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true),
        (4, 1, 4, 'Test 4: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true),
        (5, 1, 4, 'Test 5: Bộ Đề Thi TOEIC LISTENING Thực Chiến Chuẩn Format 700+', true),
        (6, 3, 1, 'Test TOEIC LISTENING đầu vào', true),
        (7, 2, 1, 'Test 1: Bộ Đề Thi TOEIC READING Thực Chiến Chuẩn Format 700+', true),
        (8, 2, 2, 'Test 2: Bộ Đề Thi TOEIC READING Thực Chiến Chuẩn Format 700+', true),
        (9, 4, 1, 'Test TOEIC READING đầu vào', true);

INSERT INTO question_cluster (indexes, paragraph, part, test_id)
VALUES
    -- Listening Test 1: Part 3 (Questions 1-3), Part 4 (Questions 4-6)
    (1, NULL, 3, 1),
    (1, NULL, 4, 1),
    -- Listening Test 2: Part 3 (Questions 7-9), Part 4 (Questions 10-12)
    (2, NULL, 3, 2),
    (2, NULL, 4, 2),
    -- Listening Test 3: Part 3 (Questions 13-15), Part 4 (Questions 16-18)
    (3, NULL, 3, 3),
    (3, NULL, 4, 3),
    -- Listening Test 4: Part 3 (Questions 19-21), Part 4 (Questions 22-24)
    (4, NULL, 3, 4),
    (4, NULL, 4, 4),
    -- Listening Test 5: Part 3 (Questions 25-27), Part 4 (Questions 28-30)
    (5, NULL, 3, 5),
    (5, NULL, 4, 5),
    -- Listening Test 6: Part 3 (Questions 31-33), Part 4 (Questions 34-36)
    (6, NULL, 3, 6),
    (6, NULL, 4, 6),
    -- Reading Test 1: Part 6 (Questions 37-39), Part 7 (Questions 40-41)
    (1, 'refer to the following notice. The files on the office computer server need to be backed up tonight. Unfortunately, the cause of the error is unknown. Any files that have been deleted will be backed up tonight as well.', 6, 7),
    (1, 'refer to the following advertisement.Now Open Pedro’s Cantina \n755 Lincoln Avenue\nColumbia, South Carolina\nPhone : (571) 288-3219\nCome enjoy authentic Mexican cuisine and the best Margaritas in town!\nOn Friday and Saturday nights, we have live mariachi music from 8 P.M. until closing.\u00a0\u00a0Business Hours Tuesday - Thursday: 11:00 A.M. - 10:00 P.M.\nFriday and Saturday: 11:00 A.M. - 12:00 A.M.\nSunday: 12:00 P.M. - 9:00 P.M.\u00a0', 7, 7),
    -- Reading Test 2: Part 6 (Questions 42-45), Part 7 (Questions 46-47)
    (2, 'refer to the following e-mail.To: Steven Herzog (sherzog@artemis.com)From: Marie Swain (marieswain@astoriacity.org)Subject: Barton Public Park Art InitiativeDate: November 9\nDear Mr. Herzog,\n(139) ____our preliminary evaluation of your portfolio, we think you are well qualified to lead our art project. Your past work is contemporary and eye-catching, and it would definitely be a beautiful addition to the walls and buildings of Barton Public Park.\n(140) ____. It will be held at City Hall on November 20 at 3 P.M. During this time, you (141) ____ to describe your artistic vision and provide sketches of the pieces you propose to paint in the park.\nIf you''re unsuccessful on this occasion, we will consider (142) ____ for future art projects in Astoria City if a suitable assignment arises.\nIf you have any questions, please do not hesitate to e-mail me.\nRegards,\nMarie Swain\nParks and Recreation Department\nAstoria City Council', 6, 8),
    (2, 'refer to the following text message chain.  John Tylor    John Tylor  \n1:30 PM. Did you see Mike Bunders on the talk show last night?  Mary Ammon 1:33 P.M. No, I had some overtime work to do. John Tylor  1:34 P.M. He is such a funny guy. Mary Ammon  1:36 P.M. Right! He sure is a great comedian. I wish I had watched it.  John Tylor  1:37 P.M. Oh, in that case, you can see it tomorrow! I heard they’re rebroadcastingit at 9PM. on the same channel. Mary Ammon  1:38 P.M. Really? That’s great! I should write it down somewhere, in case I forget.  Send', 7, 8),
    -- Reading Test 3: Part 6 (Questions 48-51), Part 7 (Questions 52-54)
    (3, 'refer to the following letter.\nPeggy Shelton\n75 St. James Boulevard\nHorton, KS 66439\nDear Ms. Shelton,\nThis letter accompanies the replacement of the malfunctioning Nexal-360 blender from Nexal Manufacturing. We’re sorry that you had trouble with the original model you bought, but we’re confident that the enclosed device will be (143) ___.\nThe Nexal-360 blender will be a useful addition to your kitchen for years to come. For safety reasons, and to prevent damaging the plastic base, you should keep the device away from heat sources (144) ___toaster ovens, stoves, and furnaces. We have also included a bonus item for you. (145) ____. It is a blade specially designed for chopping ice in your blender. For information about changing from one blade to another, please (146) ___ the manual.\nThank you for being a Nexal Manufactoring customer!\nThe Nexal Manufactoring Team', 6, 9),
    (3, 'refer to the following letter.Hemingshire Antiques 142 St. Andrews Road, Fife, Scotland, KY16 APNDear Collectors,\nDue to an overwhelming supply of new items for sale, Hemingshire Antiques will be expanding its facilities. \u2014 [1] \u2014. The expansion will include extensive renovations to our showroom and storage space. \u2014 [2] \u2014.\nThese renovations will take about 6 weeks this fall. \u2014 [3] \u2014. As a result, the showroom will be closed from September 16th to November 1st. In the meantime, our online store will remain active to service our customers. \u2014 [4] \u2014. We encourage you to view our new inventory online at www.hemingshire.antiques.co.uk.\nStay tuned for an announcement regarding our grand re-opening sale in November.\nAlan Babcock,\nAlan Babcock\nOwner, Hemingshire Antiques\u00a0', 7, 9);

-- Insert Questions
-- Note: ques_id is auto-incremented, so it's omitted from the column list
INSERT INTO question (description, correct_ans, question_scope, question_type, audio_src, img_src, question_cluster_id)
VALUES
    -- Listening Test 1
    -- Part 1: Question 1 (ques_id = 1)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/20232131.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/366939888-1621582686070-part1-1.png', NULL),
    -- Part 2: Question 7 (ques_id = 2)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/87697273.mp3', NULL, NULL),
    -- Part 3: Questions 32-34 (Cluster 1, ques_id = 3-5)
    ('Who is Mr. Stevens?', '(B)An online shopper', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/68330772.mp3', NULL, 1),
    ('What is the man asked to do?', '(A)Give an invoice number', 'TEST', 'MULTICHOICE', NULL, NULL, 1),
    ('What will the man receive?', '(B)A lighting control device', 'TEST', 'MULTICHOICE', NULL, NULL, 1),
    -- Part 4: Questions 71-73 (Cluster 2, ques_id = 6-8)
    ('What is this message about?', '(B)A power outage', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/98151227.mp3', NULL, 2),
    ('When will the work probably be completed?', '(B)Tomorrow morning', 'TEST', 'MULTICHOICE', NULL, NULL, 2),
    ('When will the announcements be updated?', '(C)Every hour', 'TEST', 'MULTICHOICE', NULL, NULL, 2),
    -- Listening Test 2
    -- Part 1: Question 2 (ques_id = 9)
    (NULL, '(B)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/47882778.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/632208212-1621582700863-part1-2.png', NULL),
    -- Part 2: Question 8 (ques_id = 10)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/58579915.mp3', NULL, NULL),
    -- Part 3: Questions 35-37 (Cluster 3, ques_id = 11-13)
    ('Where does the man work?', '(D)At a library', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/37394953.mp3', NULL, 3),
    ('What does the woman want to do?', '(A)Research modern poets', 'TEST', 'MULTICHOICE', NULL, NULL, 3),
    ('What does the man offer to do?', '(A)Give a private tour', 'TEST', 'MULTICHOICE', NULL, NULL, 3),
    -- Part 4: Questions 74-76 (Cluster 4, ques_id = 14-16)
    ('What is the main purpose of the advertisement?', '(C)To mention a special sale', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/46912061.mp3', NULL, 4),
    ('What kind of business is being advertised?', '(A)A clothing store', 'TEST', 'MULTICHOICE', NULL, NULL, 4),
    ('What information is provided for the listeners?', '(C)Business hours', 'TEST', 'MULTICHOICE', NULL, NULL, 4),
    -- Listening Test 3
    -- Part 1: Question 3 (ques_id = 17)
    (NULL, '(D)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/13426208.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/208754229-1621582715465-part1-3.png', NULL),
    -- Part 2: Question 9 (ques_id = 18)
    (NULL, '(B)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/97707704.mp3', NULL, NULL),
    -- Part 3: Questions 38-40 (Cluster 5, ques_id = 19-21)
    ('Where is the conversation taking place?', '(B)At a fitness facility', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/36514920.mp3', NULL, 5),
    ('What is the man preparing for?', '(C)An upcoming marathon', 'TEST', 'MULTICHOICE', NULL, NULL, 5),
    ('What does the woman offer the man?', '(A)A class schedule', 'TEST', 'MULTICHOICE', NULL, NULL, 5),
    -- Part 4: Questions 77-79 (Cluster 6, ques_id = 22-24)
    ('What is the announcement mainly about?', '(A)Resurfacing a parking lot', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/74661097.mp3', NULL, 6),
    ('How long will the project last?', '(C)Three days', 'TEST', 'MULTICHOICE', NULL, NULL, 6),
    ('What should the employees do?', '(C)Use the alternate road', 'TEST', 'MULTICHOICE', NULL, NULL, 6),
    -- Listening Test 4
    -- Part 1: Question 4 (ques_id = 25)
    (NULL, '(D)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/56836982.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/670023583-1621582778561-part1-4.png', NULL),
    -- Part 2: Question 10 (ques_id = 26)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/11546840.mp3', NULL, NULL),
    -- Part 3: Questions 41-43 (Cluster 7, ques_id = 27-29)
    ('What problem is the man calling about?', '(D)A device is out of order.', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/45418686.mp3', NULL, 7),
    ('What does the woman say she will do?', '(B)Send a professional', 'TEST', 'MULTICHOICE', NULL, NULL, 7),
    ('What does the woman recommend doing?', '(B)Removing items from a machine', 'TEST', 'MULTICHOICE', NULL, NULL, 7),
    -- Part 4: Questions 80-82 (Cluster 8, ques_id = 30-32)
    ('Why is the woman calling?', '(A)To arrange the interview time', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/25840270.mp3', NULL, 8),
    ('What is the speaker’s occupation?', '(D)A hiring director', 'TEST', 'MULTICHOICE', NULL, NULL, 8),
    ('What does the woman ask the man to do?', '(D)Return a telephone call', 'TEST', 'MULTICHOICE', NULL, NULL, 8),
    -- Listening Test 5
    -- Part 1: Question 5 (ques_id = 33)
    (NULL, '(C)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/92256296.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/74925907-1621582797815-part1-5.png', NULL),
    -- Part 2: Question 11 (ques_id = 34)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/11385123.mp3', NULL, NULL),
    -- Part 3: Questions 44-46 (Cluster 9, ques_id = 35-37)
    ('Where will the woman make a transfer?', '(C)Birmingham', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/48601325.mp3', NULL, 9),
    ('What most likely is the man’s job?', '(A)Train attendant', 'TEST', 'MULTICHOICE', NULL, NULL, 9),
    ('What does the man offer to do?', '(D)Give the woman a map', 'TEST', 'MULTICHOICE', NULL, NULL, 9),
    -- Part 4: Questions 83-85 (Cluster 10, ques_id = 38-40)
    ('Why is this event being held?', '(D)To thank some customers', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/53037430.mp3', NULL, 10),
    ('Who is Glenn Cross?', '(B)A musician', 'TEST', 'MULTICHOICE', NULL, NULL, 10),
    ('What does the man mean when he says, “Once again, I would like to express my gratitude”?', '(C)The company had a successful year.', 'TEST', 'MULTICHOICE', NULL, NULL, 10),
    -- Listening Test 6
    -- Part 1: Question 6 (ques_id = 41)
    (NULL, '(A)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/9574740.mp3', 'https://estudyme.hoc102.com/legacy-data/kslearning/images/960073773-1621582820918-part1-6.png', NULL),
    -- Part 2: Question 12 (ques_id = 42)
    (NULL, '(C)', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/97067174.mp3', NULL, NULL),
    -- Part 3: Questions 47-49 (Cluster 11, ques_id = 43-45)
    ('Who most likely is the woman?', '(D)A product developer', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/90524118.mp3', NULL, 11),
    ('What problem does the woman mention?', '(A)The machine isn’t working properly.', 'TEST', 'MULTICHOICE', NULL, NULL, 11),
    ('What does the man suggest doing?', '(B)Consulting with more knowledgeable staff', 'TEST', 'MULTICHOICE', NULL, NULL, 11),
    -- Part 4: Questions 86-88 (Cluster 12, ques_id = 46-48)
    ('What is Success Makers mainly about?', '(A)Advice for business people', 'TEST', 'MULTICHOICE', 'https://storage.googleapis.com/estudyme/dev/2022/06/27/45885048.mp3', NULL, 12),
    ('What day is the program broadcast?', '(D)Thursday', 'TEST', 'MULTICHOICE', NULL, NULL, 12),
    ('Who is Lauri Hampner?', '(B)A restaurant manager', 'TEST', 'MULTICHOICE', NULL, NULL, 12),
    -- Reading Test 1
    -- Part 5: Question 101 (ques_id = 49)
    ('Please send ________ application and portfolio to the human resources department no later than July 31.', '(A)your', 'TEST', 'FILLING_BLANK', NULL, NULL, NULL),
    -- Part 6: Questions 136-138 (Cluster 13, ques_id = 50-52)
    (NULL, '(B)Unfortunately, the cause of the error is unknown.', 'TEST', 'MULTICHOICE', NULL, NULL, 13),
    (NULL, '(D)has been deleted', 'TEST', 'FILLING_BLANK', NULL, NULL, 13),
    (NULL, '(A) any', 'TEST', 'FILLING_BLANK', NULL, NULL, 13),
    -- Part 7: Questions 147-148 (Cluster 14, ques_id = 53-54)
    ('What is the announcement about?', '(C)A restaurant opening for business', 'TEST', 'MULTICHOICE', NULL, NULL, 14),
    ('What is suggested about Pedro’s Cantina?', '(A)It is closed on Mondays.', 'TEST', 'MULTICHOICE', NULL, NULL, 14),
    -- Reading Test 2
    -- Part 5: Question 102 (ques_id = 55)
    ('Consumers must carefully read the nutritional facts indicated_____the labels of food products they purchase.', '(D)on', 'TEST', 'FILLING_BLANK', NULL, NULL, NULL),
    -- Part 6: Questions 139-142 (Cluster 15, ques_id = 56-59)
    (NULL, '(D)Based on', 'TEST', 'FILLING_BLANK', NULL, NULL, 15),
    (NULL, '(C)As a shortlisted candidate, you will need to attend an interview.', 'TEST', 'MULTICHOICE', NULL, NULL, 15),
    (NULL, '(B)will be asked', 'TEST', 'FILLING_BLANK', NULL, NULL, 15),
    (NULL, '(D)you', 'TEST', 'FILLING_BLANK', NULL, NULL, 15),
    -- Part 7: Questions 149-150 (Cluster 16, ques_id = 60-61)
    ('Who is Mike Bunders?', '(A)An entertainer', 'TEST', 'MULTICHOICE', NULL, NULL, 16),
    ('At 1:38 P.M., what does Ms. Ammon mean when she writes, “That’s great!”?', '(B)She will watch the show tomorrow night.', 'TEST', 'MULTICHOICE', NULL, NULL, 16),
    -- Reading Test 3
    -- Part 5: Question 103 (ques_id = 62)
    ('Before Mr. Mosby became a supervisor, he was ______ a front desk receptionist at a hotel in Bali, Indonesia.', '(A)formerly', 'TEST', 'FILLING_BLANK', NULL, NULL, NULL),
    -- Part 6: Questions 143-146 (Cluster 17, ques_id = 63-66)
    (NULL, '(B) reliable', 'TEST', 'FILLING_BLANK', NULL, NULL, 17),
    (NULL, '(D) such as', 'TEST', 'FILLING_BLANK', NULL, NULL, 17),
    (NULL, '(A) This gift is a token of our appreciation for your patience.', 'TEST', 'MULTICHOICE', NULL, NULL, 17),
    (NULL, '(A) consult', 'TEST', 'FILLING_BLANK', NULL, NULL, 17),
    -- Part 7: Questions 151-153 (Cluster 18, ques_id = 67-69)
    ('What is the purpose of this letter?', '(C)To announce renovations', 'TEST', 'MULTICHOICE', NULL, NULL, 18),
    ('What is stated about the store?', '(B)It has products available online.', 'TEST', 'MULTICHOICE', NULL, NULL, 18),
    ('In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong?  “This will allow us to display more items in the showroom and keep more items in stock.”', '(B)[2]', 'TEST', 'MULTICHOICE', NULL, NULL, 18);

-- Insert Multichoice Details
INSERT INTO multichoice_detail (ques_id, answer_key, answer_description)
VALUES
    -- Listening Test 1
    -- Part 1: Question 1 (ques_id = 1)
    (1, 'A', '(A)'), (1, 'B', '(B)'), (1, 'C', '(C)'), (1, 'D', '(D)'),
    -- Part 2: Question 7 (ques_id = 2)
    (2, 'A', '(A)'), (2, 'B', '(B)'), (2, 'C', '(C)'),
    -- Part 3: Questions 32-34 (ques_id = 3-5)
    (3, 'A', '(A)A customer service agent'), (3, 'B', '(B)An online shopper'), (3, 'C', '(C)A lighting specialist'), (3, 'D', '(D)A corporate buyer'),
    (4, 'A', '(A)Give an invoice number'), (4, 'B', '(B)Confirm credit card details'), (4, 'C', '(C)Wait for a return phone call'), (4, 'D', '(D)Explain a complicated process'),
    (5, 'A', '(A)A full refund'), (5, 'B', '(B)A lighting control device'), (5, 'C', '(C)An apology letter'), (5, 'D', '(D)A new invoice'),
    -- Part 4: Questions 71-73 (ques_id = 6-8)
    (6, 'A', '(A)A road construction'), (6, 'B', '(B)A power outage'), (6, 'C', '(C)A weather report'), (6, 'D', '(D)A news program'),
    (7, 'A', '(A)Tonight'), (7, 'B', '(B)Tomorrow morning'), (7, 'C', '(C)Tomorrow night'), (7, 'D', '(D)Next week'),
    (8, 'A', '(A)Every 10 minutes'), (8, 'B', '(B)Every 30 minutes'), (8, 'C', '(C)Every hour'), (8, 'D', '(D)Every 2 hours'),
    -- Listening Test 2
    -- Part 1: Question 2 (ques_id = 9)
    (9, 'A', '(A)'), (9, 'B', '(B)'), (9, 'C', '(C)'), (9, 'D', '(D)'),
    -- Part 2: Question 8 (ques_id = 10)
    (10, 'A', '(A)'), (10, 'B', '(B)'), (10, 'C', '(C)'),
    -- Part 3: Questions 35-37 (ques_id = 11-13)
    (11, 'A', '(A)At a community center'), (11, 'B', '(B)At a museum'), (11, 'C', '(C)At a university'), (11, 'D', '(D)At a library'),
    (12, 'A', '(A)Research modern poets'), (12, 'B', '(B)Purchase a ticket'), (12, 'C', '(C)Conduct some experiments'), (12, 'D', '(D)Sign up for evening classes'),
    (13, 'A', '(A)Give a private tour'), (13, 'B', '(B)Provide a discount'), (13, 'C', '(C)Send her some materials'), (13, 'D', '(D)Contact a tour guide'),
    -- Part 4: Questions 74-76 (ques_id = 14-16)
    (14, 'A', '(A)To sell a store'), (14, 'B', '(B)To change the sales plan'), (14, 'C', '(C)To mention a special sale'), (14, 'D', '(D)To launch a new item'),
    (15, 'A', '(A)A clothing store'), (15, 'B', '(B)A cleaning appliance'), (15, 'C', '(C)A food market'), (15, 'D', '(D)A delivery service'),
    (16, 'A', '(A)A sales tax'), (16, 'B', '(B)An e-mail address'), (16, 'C', '(C)Business hours'), (16, 'D', '(D)Store location'),
    -- Listening Test 3
    -- Part 1: Question 3 (ques_id = 17)
    (17, 'A', '(A)'), (17, 'B', '(B)'), (17, 'C', '(C)'), (17, 'D', '(D)'),
    -- Part 2: Question 9 (ques_id = 18)
    (18, 'A', '(A)'), (18, 'B', '(B)'), (18, 'C', '(C)'),
    -- Part 3: Questions 38-40 (ques_id = 19-21)
    (19, 'A', '(A)At a park'), (19, 'B', '(B)At a fitness facility'), (19, 'C', '(C)At an institute'), (19, 'D', '(D)At a medical center'),
    (20, 'A', '(A)A football tryout'), (20, 'B', '(B)A basketball tournament'), (20, 'C', '(C)An upcoming marathon'), (20, 'D', '(D)A tennis competition'),
    (21, 'A', '(A)A class schedule'), (21, 'B', '(B)A private session'), (21, 'C', '(C)A free membership'), (21, 'D', '(D)Some used equipment'),
    -- Part 4: Questions 77-79 (ques_id = 22-24)
    (22, 'A', '(A)Resurfacing a parking lot'), (22, 'B', '(B)Opening a new highway'), (22, 'C', '(C)Renewal of a store'), (22, 'D', '(D)Closure of a subway station'),
    (23, 'A', '(A)One day'), (23, 'B', '(B)Two days'), (23, 'C', '(C)Three days'), (23, 'D', '(D)Five days'),
    (24, 'A', '(A)Come to work an hour early'), (24, 'B', '(B)Park on Country Boulevard'), (24, 'C', '(C)Use the alternate road'), (24, 'D', '(D)Take only the public transportation'),
    -- Listening Test 4
    -- Part 1: Question 4 (ques_id = 25)
    (25, 'A', '(A)'), (25, 'B', '(B)'), (25, 'C', '(C)'), (25, 'D', '(D)'),
    -- Part 2: Question 10 (ques_id = 26)
    (26, 'A', '(A)'), (26, 'B', '(B)'), (26, 'C', '(C)'),
    -- Part 3: Questions 41-43 (ques_id = 27-29)
    (27, 'A', '(A)A customer account has been canceled.'), (27, 'B', '(B)An appliance has not arrived.'), (27, 'C', '(C)A machine is missing some parts.'), (27, 'D', '(D)A device is out of order.'),
    (28, 'A', '(A)Contact the manufacturer'), (28, 'B', '(B)Send a professional'), (28, 'C', '(C)Replace the faulty item'), (28, 'D', '(D)Look online for a solution'),
    (29, 'A', '(A)Using different model'), (29, 'B', '(B)Removing items from a machine'), (29, 'C', '(C)Contacting a manufacturer’s helpline'), (29, 'D', '(D)Attempting a home repair'),
    -- Part 4: Questions 80-82 (ques_id = 30-32)
    (30, 'A', '(A)To arrange the interview time'), (30, 'B', '(B)To request an application form'), (30, 'C', '(C)To accept a job offer'), (30, 'D', '(D)To advertise a new hospital plan'),
    (31, 'A', '(A)An academic instructor'), (31, 'B', '(B)A secretary'), (31, 'C', '(C)A doctor'), (31, 'D', '(D)A hiring director'),
    (32, 'A', '(A)Fax some documents'), (32, 'B', '(B)Schedule an installation date'), (32, 'C', '(C)Order invitations'), (32, 'D', '(D)Return a telephone call'),
    -- Listening Test 5
    -- Part 1: Question 5 (ques_id = 33)
    (33, 'A', '(A)'), (33, 'B', '(B)'), (33, 'C', '(C)'), (33, 'D', '(D)'),
    -- Part 2: Question 11 (ques_id = 34)
    (34, 'A', '(A)'), (34, 'B', '(B)'), (34, 'C', '(C)'),
    -- Part 3: Questions 44-46 (ques_id = 35-37)
    (35, 'A', '(A)Coventry'), (35, 'B', '(B)Leicester'), (35, 'C', '(C)Birmingham'), (35, 'D', '(D)Sheffield'),
    (36, 'A', '(A)Train attendant'), (36, 'B', '(B)Bus driver'), (36, 'C', '(C)Cafe worker'), (36, 'D', '(D)Tour guide'),
    (37, 'A', '(A)Guide the woman to her seat'), (37, 'B', '(B)Announce the stop before arrival'), (37, 'C', '(C)Show the woman station signs'), (37, 'D', '(D)Give the woman a map'),
    -- Part 4: Questions 83-85 (ques_id = 38-40)
    (38, 'A', '(A)To introduce a newly-released album'), (38, 'B', '(B)To award some employees'), (38, 'C', '(C)To promote a new product'), (38, 'D', '(D)To thank some customers'),
    (39, 'A', '(A)A cook'), (39, 'B', '(B)A musician'), (39, 'C', '(C)A gift wrapper'), (39, 'D', '(D)A staff member'),
    (40, 'A', '(A)The company is a newly-established company.'), (40, 'B', '(B)The company has the most employees.'), (40, 'C', '(C)The company had a successful year.'), (40, 'D', '(D)The company produces famous singers.'),
    -- Listening Test 6
    -- Part 1: Question 6 (ques_id = 41)
    (41, 'A', '(A)'), (41, 'B', '(B)'), (41, 'C', '(C)'), (41, 'D', '(D)'),
    -- Part 2: Question 12 (ques_id = 42)
    (42, 'A', '(A)'), (42, 'B', '(B)'), (42, 'C', '(C)'),
    -- Part 3: Questions 47-49 (ques_id = 43-45)
    (43, 'A', '(A)A business consultant'), (43, 'B', '(B)A department manager'), (43, 'C', '(C)A senior engineer'), (43, 'D', '(D)A product developer'),
    (44, 'A', '(A)The machine isn’t working properly.'), (44, 'B', '(B)A piece has broken off.'), (44, 'C', '(C)She requires new batteries.'), (44, 'D', '(D)She wasn’t given enough time.'),
    (45, 'A', '(A)Starting the project over from the beginning'), (45, 'B', '(B)Consulting with more knowledgeable staff'), (45, 'C', '(C)Begin working on another project'), (45, 'D', '(D)Getting feedback from customers'),
    -- Part 4: Questions 86-88 (ques_id = 46-48)
    (46, 'A', '(A)Advice for business people'), (46, 'B', '(B)Finding jobs'), (46, 'C', '(C)Communication strategies'), (46, 'D', '(D)Managing restaurants'),
    (47, 'A', '(A)Monday'), (47, 'B', '(B)Tuesday'), (47, 'C', '(C)Wednesday'), (47, 'D', '(D)Thursday'),
    (48, 'A', '(A)A radio host'), (48, 'B', '(B)A restaurant manager'), (48, 'C', '(C)A business magazine columnist'), (48, 'D', '(D)A writer'),
    -- Reading Test 1
    -- Part 5: Question 101 (ques_id = 49)
    (49, 'A', '(A)your'), (49, 'B', '(B)yourself'), (49, 'C', '(C)you'), (49, 'D', '(D)yours'),
    -- Part 6: Questions 136-138 (ques_id = 50-52)
    (50, 'A', '(A)Fortunately, the mistake was easily fixed.'), (50, 'B', '(B)Unfortunately, the cause of the error is unknown.'), (50, 'C', '(C)Mistakenly, the wrong code was entered.'), (50, 'D', '(D)Surprisingly, the machine is still valid one.'),
    (51, 'A', '(A) has been deleting'), (51, 'B', '(B)be deleting'), (51, 'C', '(C)to be deleted'), (51, 'D', '(D)has been deleted'),
    (52, 'A', '(A) any'), (52, 'B', '(B)his'), (52, 'C', '(C)their'), (52, 'D', '(D)other'),
    -- Part 7: Questions 147-148 (ques_id = 53-54)
    (53, 'A', '(A)A trip to Mexico'), (53, 'B', '(B)Dishes that are being sold at a discount'), (53, 'C', '(C)A restaurant opening for business'), (53, 'D', '(D)Changes to a schedule'),
    (54, 'A', '(A)It is closed on Mondays.'), (54, 'B', '(B)It has locations throughout South Carolina.'), (54, 'C', '(C)It features live music daily.'), (54, 'D', '(D)It has a large kitchen staff.'),
    -- Reading Test 2
    -- Part 5: Question 102 (ques_id = 55)
    (55, 'A', '(A)of'), (55, 'B', '(B)as'), (55, 'C', '(C)next'), (55, 'D', '(D)on'),
    -- Part 6: Questions 139-142 (ques_id = 56-59)
    (56, 'A', '(A) Afterward'), (56, 'B', '(B)In order to'), (56, 'C', '(C)Consequently'), (56, 'D', '(D)Based on'),
    (57, 'A', '(A) The committee woud like to meet with you in person.'), (57, 'B', '(B)The hiring manager will review all portfolios next week.'), (57, 'C', '(C)As a shortlisted candidate, you will need to attend an interview.'), (57, 'D', '(D)Please submit three work-roated references beforehand.'),
    (58, 'A', '(A) were asked'), (58, 'B', '(B)will be asked'), (58, 'C', '(C)had asked'), (58, 'D', '(D)would have asked'),
    (59, 'A', '(A) ourselves'), (59, 'B', '(B)myself'), (59, 'C', '(C)us'), (59, 'D', '(D)you'),
    -- Part 7: Questions 149-150 (ques_id = 60-61)
    (60, 'A', '(A)An entertainer'), (60, 'B', '(B)A singer'), (60, 'C', '(C)A manager'), (60, 'D', '(D)A producer'),
    (61, 'A', '(A)She will call the broadcasting studio.'), (61, 'B', '(B)She will watch the show tomorrow night.'), (61, 'C', '(C)She will work overtime at 9 P.M.'), (61, 'D', '(D)She will give some information to him.'),
    -- Reading Test 3
    -- Part 5: Question 103 (ques_id = 62)
    (62, 'A', '(A)formerly'), (62, 'B', '(B)yet'), (62, 'C', '(C)fairly'), (62, 'D', '(D)anymore'),
    -- Part 6: Questions 143-146 (ques_id = 63-66)
    (63, 'A', '(A) portable'), (63, 'B', '(B) reliable'), (63, 'C', '(C) notable'), (63, 'D', '(D) approachable'),
    (64, 'A', '(A) much too'), (64, 'B', '(B) as well'), (64, 'C', '(C) of these'), (64, 'D', '(D) such as'),
    (65, 'A', '(A) This gift is a token of our appreciation for your patience.'), (65, 'B', '(B) The blade should be stored in a cabinet or on the countertop.'), (65, 'C', '(C) Be sure to follow all safety procedures as instructed.'), (65, 'D', '(D) It will be shipped immediately at no additional cost to you.'),
    (66, 'A', '(A) consult'), (66, 'B', '(B) correct'), (66, 'C', '(C) reuse'), (66, 'D', '(D) adapt'),
    -- Part 7: Questions 151-153 (ques_id = 67-69)
    (67, 'A', '(A)To offer discounted items'), (67, 'B', '(B)To recruit new employees'), (67, 'C', '(C)To announce renovations'), (67, 'D', '(D)To introduce new online features'),
    (68, 'A', '(A)It is temporarily moving to a new location.'), (68, 'B', '(B)It has products available online.'), (68, 'C', '(C)It sells items from around the world.'), (68, 'D', '(D)It will extend its hours during the fall.'),
    (69, 'A', '(A)[1]'), (69, 'B', '(B)[2]'), (69, 'C', '(C)[3]'), (69, 'D', '(D)[4]');

INSERT INTO test_detail (belong_to, question_id, part, indexx)
VALUES
    -- Listening Test 1 (test_id = 1)
    (1, 1, 1, 1),    -- Part 1: Question 1
    (1, 2, 2, 7),    -- Part 2: Question 7
    (1, 3, 3, 32),   -- Part 3: Questions 32-34
    (1, 4, 3, 33),
    (1, 5, 3, 34),
    (1, 6, 4, 71),   -- Part 4: Questions 71-73
    (1, 7, 4, 72),
    (1, 8, 4, 73),
    -- Listening Test 2 (test_id = 2)
    (2, 9, 1, 2),    -- Part 1: Question 2
    (2, 10, 2, 8),   -- Part 2: Question 8
    (2, 11, 3, 35),  -- Part 3: Questions 35-37
    (2, 12, 3, 36),
    (2, 13, 3, 37),
    (2, 14, 4, 74),  -- Part 4: Questions 74-76
    (2, 15, 4, 75),
    (2, 16, 4, 76),
    -- Listening Test 3 (test_id = 3)
    (3, 17, 1, 3),   -- Part 1: Question 3
    (3, 18, 2, 9),   -- Part 2: Question 9
    (3, 19, 3, 38),  -- Part 3: Questions 38-40
    (3, 20, 3, 39),
    (3, 21, 3, 40),
    (3, 22, 4, 77),  -- Part 4: Questions 77-79
    (3, 23, 4, 78),
    (3, 24, 4, 79),
    -- Listening Test 4 (test_id = 4)
    (4, 25, 1, 4),   -- Part 1: Question 4
    (4, 26, 2, 10),  -- Part 2: Question 10
    (4, 27, 3, 41),  -- Part 3: Questions 41-43
    (4, 28, 3, 42),
    (4, 29, 3, 43),
    (4, 30, 4, 80),  -- Part 4: Questions 80-82
    (4, 31, 4, 81),
    (4, 32, 4, 82),
    -- Listening Test 5 (test_id = 5)
    (5, 33, 1, 5),   -- Part 1: Question 5
    (5, 34, 2, 11),  -- Part 2: Question 11
    (5, 35, 3, 44),  -- Part 3: Questions 44-46
    (5, 36, 3, 45),
    (5, 37, 3, 46),
    (5, 38, 4, 83),  -- Part 4: Questions 83-85
    (5, 39, 4, 84),
    (5, 40, 4, 85),
    -- Listening Test 6 (test_id = 6)
    (6, 41, 1, 6),   -- Part 1: Question 6
    (6, 42, 2, 12),  -- Part 2: Question 12
    (6, 43, 3, 47),  -- Part 3: Questions 47-49
    (6, 44, 3, 48),
    (6, 45, 3, 49),
    (6, 46, 4, 86),  -- Part 4: Questions 86-88
    (6, 47, 4, 87),
    (6, 48, 4, 88),
    -- Reading Test 1 (test_id = 7)
    (7, 49, 5, 101), -- Part 5: Question 101
    (7, 50, 6, 136), -- Part 6: Questions 136-138
    (7, 51, 6, 137),
    (7, 52, 6, 138),
    (7, 53, 7, 147), -- Part 7: Questions 147-148
    (7, 54, 7, 148),
    -- Reading Test 2 (test_id = 8)
    (8, 55, 5, 102), -- Part 5: Question 102
    (8, 56, 6, 139), -- Part 6: Questions 139-142
    (8, 57, 6, 140),
    (8, 58, 6, 141),
    (8, 59, 6, 142),
    (8, 60, 7, 149), -- Part 7: Questions 149-150
    (8, 61, 7, 150),
    -- Reading Test 3 (test_id = 9)
    (9, 62, 5, 103), -- Part 5: Question 103
    (9, 63, 6, 143), -- Part 6: Questions 143-146
    (9, 64, 6, 144),
    (9, 65, 6, 145),
    (9, 66, 6, 146),
    (9, 67, 7, 151), -- Part 7: Questions 151-153
    (9, 68, 7, 152),
    (9, 69, 7, 153);
#
# INSERT INTO lessons (title, video_url, image_url, description, course_id, skill_id) VALUES
# ('Understanding Essay Structures', 'https://example.com/ielts-essay.mp4', 'https://example.com/ielts-essay.jpg', 'Learn different essay structures for IELTS Writing Task 2.', 1, 1),
# ('How to Write a Strong Thesis Statement', 'https://example.com/ielts-thesis.mp4', 'https://example.com/ielts-thesis.jpg', 'Tips for writing a clear and strong thesis statement.', 1, 1),
# ('Common Mistakes in IELTS Essays', 'https://example.com/ielts-mistakes.mp4', 'https://example.com/ielts-mistakes.jpg', 'Avoid these common mistakes in your IELTS Writing Task 2 response.', 1, 1),
# ('Listening for Main Ideas', 'https://example.com/toefl-main-idea.mp4', 'https://example.com/toefl-main-idea.jpg', 'How to identify the main ideas in TOEFL listening passages.', 2, 2),
# ('Note-Taking Strategies', 'https://example.com/toefl-notes.mp4', 'https://example.com/toefl-notes.jpg', 'Effective note-taking strategies for TOEFL listening sections.', 2, 2),
# ('Understanding Academic Lectures', 'https://example.com/toefl-lectures.mp4', 'https://example.com/toefl-lectures.jpg', 'How to follow and understand academic lectures in TOEFL.', 2, 2),
# ('Mastering Subject-Verb Agreement', 'https://example.com/grammar-sva.mp4', 'https://example.com/grammar-sva.jpg', 'Learn and practice subject-verb agreement rules.', 3, 3),
# ('Understanding Tenses in English', 'https://example.com/grammar-tenses.mp4', 'https://example.com/grammar-tenses.jpg', 'A complete guide to English tenses.', 3, 3),
# ('Common Grammar Mistakes', 'https://example.com/grammar-mistakes.mp4', 'https://example.com/grammar-mistakes.jpg', 'Avoid these common grammar mistakes in exams.', 3, 3),
# ('Skimming and Scanning Techniques', 'https://example.com/reading-techniques.mp4', 'https://example.com/reading-techniques.jpg', 'Learn how to read quickly and efficiently for exams.', 4, 4),
# ('How to Identify Key Information', 'https://example.com/reading-keyinfo.mp4', 'https://example.com/reading-keyinfo.jpg', 'Strategies for identifying key details in passages.', 4, 4),
# ('Improving Pronunciation and Fluency', 'https://example.com/speaking-pronunciation.mp4', 'https://example.com/speaking-pronunciation.jpg', 'Techniques to improve pronunciation and fluency.', 5, 5),
# ('Answering Common IELTS Speaking Questions', 'https://example.com/speaking-ielts.mp4', 'https://example.com/speaking-ielts.jpg', 'Learn how to respond to common IELTS Speaking topics.', 5, 5);
#
# INSERT INTO role (name) VALUES
# ('ADMIN'),
# ('STUDENT'),
# ('TEACHER'),
# ('USER');
#

## CREATE A WHOLE TEST
