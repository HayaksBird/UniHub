CREATE DATABASE IF NOT EXISTS unihub;
USE unihub;

DROP TABLE IF EXISTS professor_course;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS professor;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS sessions;

CREATE TABLE IF NOT EXISTS user (
id INT AUTO_INCREMENT PRIMARY KEY,
user_type ENUM('regular', 'oauth2') NOT NULL,
oauth_id VARCHAR(255),
username VARCHAR(255),
email VARCHAR(255) NOT NULL,
password VARCHAR(255),
salt VARCHAR(255),
hash_algorithm VARCHAR(255),
confirmationCode VARCHAR(255),
access_token VARCHAR(255),
refresh_token VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS sessions (
session_id VARCHAR(255) NOT NULL,
expires BIGINT NOT NULL,
data TEXT,
PRIMARY KEY (session_id)
);

CREATE TABLE IF NOT EXISTS professor (
id INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255),
university VARCHAR(255) DEFAULT 'Koc University',
photo_reference VARCHAR(255) DEFAULT 'default_photo.jpg'
);

CREATE TABLE IF NOT EXISTS course (
id INT AUTO_INCREMENT PRIMARY KEY,
course_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS review (
id INT AUTO_INCREMENT PRIMARY KEY,
professor_id INT,
review_text TEXT,
rating INT,
user_id INT,
course_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (professor_id) REFERENCES professor(id),
FOREIGN KEY (user_id) REFERENCES user(id),
FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE professor_course (
professor_id INT,
course_id INT,
PRIMARY KEY (professor_id, course_id),
FOREIGN KEY (professor_id) REFERENCES professor(id),
FOREIGN KEY (course_id) REFERENCES course(id)
);

-- Insert statements for user_table
INSERT INTO user (username, email, password, salt, hash_algorithm, confirmationCode)
VALUES
('johndoe123', 'johndoe123@example.com', 'password1', 'salt1', 'SHA256', NULL),
('emily.smith', 'emily.smith@example.com', 'password2', 'salt2', 'SHA256', NULL),
('david.will', 'david.will@example.com', 'password3', 'salt3', 'SHA256', NULL),
('sarah_brown', 'sarah.brown@example.com', 'password4', 'salt4', 'SHA256', NULL),
('michael.davis', 'michael.davis@example.com', 'password5', 'salt5', 'SHA256', NULL);

-- Insert statements for professor_table
INSERT INTO professor (full_name) VALUES ('John Smith');
INSERT INTO professor (full_name) VALUES ('Emily Johnson');
INSERT INTO professor (full_name) VALUES ('David Williams');
INSERT INTO professor (full_name) VALUES ('Sarah Brown');
INSERT INTO professor (full_name) VALUES ('Michael Davis');

-- Insert statements for class_table
INSERT INTO course (course_name) VALUES ('MATH203');
INSERT INTO course (course_name) VALUES ('CALC201');
INSERT INTO course (course_name) VALUES ('PHYS101');
INSERT INTO course (course_name) VALUES ('CHEM202');
INSERT INTO course (course_name) VALUES ('CSCI301');
INSERT INTO course (course_name) VALUES ('DAN101');
INSERT INTO course (course_name) VALUES ('HIST301');
INSERT INTO course (course_name) VALUES ('POLI202');
INSERT INTO course (course_name) VALUES ('ENGL101');
INSERT INTO course (course_name) VALUES ('LIT205');

-- Insert into join table
INSERT INTO professor_course (professor_id, course_id)
VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 1),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);

-- Insert statements for review_table
INSERT INTO review (professor_id, review_text, rating, user_id, course_id) VALUES (1, 'Great professor!', 5, 1, 1);
INSERT INTO review (professor_id, review_text, rating, user_id, course_id) VALUES (2, 'Awesome teacher!', 4, 2, 3);
INSERT INTO review (professor_id, review_text, rating, user_id, course_id) VALUES (3, 'Very knowledgeable', 4, 3, 5);
INSERT INTO review (professor_id, review_text, rating, user_id, course_id) VALUES (4, 'Passionate about the subject', 3, 4, 7);
INSERT INTO review (professor_id, review_text, rating, user_id, course_id) VALUES (5, 'Engaging lectures', 5, 5, 9);
