CREATE DATABASE IF NOT EXISTS uniHub;
USE uniHub;

CREATE TABLE IF NOT EXISTS user_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  hash_algorithm VARCHAR(255) NOT NULL,
  confirmationCode VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS professor_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255), 
  classes JSON,
  university VARCHAR(255) DEFAULT 'Koc University',
  photo_reference VARCHAR(255) DEFAULT 'default_photo.jpg'
);

CREATE TABLE IF NOT EXISTS review_table (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  prof_id INT,
  review_text TEXT,
  rating INT,
  user_id INT,
  class VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prof_id) REFERENCES professor_table(id),
  FOREIGN KEY (user_id) REFERENCES user_table(id)
);

-- Insert statements for professor_table
INSERT INTO professor_table (full_name, classes) VALUES ('John Smith', '["MATH203", "CALC201"]');
INSERT INTO professor_table (full_name, classes) VALUES ('Emily Johnson', '["PHYS101", "CHEM202"]');
INSERT INTO professor_table (full_name, classes) VALUES ('David Williams', '["CSCI301", "DAN101"]');
INSERT INTO professor_table (full_name, classes) VALUES ('Sarah Brown', '["HIST301", "POLI202"]');
INSERT INTO professor_table (full_name, classes) VALUES ('Michael Davis', '["ENGL101", "LIT205"]');

-- Insert statements for review_table
INSERT INTO review_table (prof_id, review_text, rating, user_id, class) VALUES (1, 'Great professor!', 5, 1, 'MATH203');
INSERT INTO review_table (prof_id, review_text, rating, user_id, class) VALUES (2, 'Awesome teacher!', 4, 2, 'PHYS101');
INSERT INTO review_table (prof_id, review_text, rating, user_id, class) VALUES (3, 'Very knowledgeable', 4, 3, 'CSCI301');
INSERT INTO review_table (prof_id, review_text, rating, user_id, class) VALUES (4, 'Passionate about the subject', 3, 4, 'HIST301');
INSERT INTO review_table (prof_id, review_text, rating, user_id, class) VALUES (5, 'Engaging lectures', 5, 5, 'ENGL101');




