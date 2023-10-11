CREATE DATABASE IF NOT EXISTS uniHub;
USE uniHub;

CREATE TABLE IF NOT EXISTS user_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  hash_algorithm VARCHAR(255) NOT NULL,
  email_confirmed BOOLEAN
);

CREATE TABLE IF NOT EXISTS professor_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255), 
  class VARCHAR(50),
  university VARCHAR(255), 
  photo_reference VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS review_table (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  prof_id INT,
  review_text TEXT,
  rating INT,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (prof_id) REFERENCES professor_table(id),
  FOREIGN KEY (user_id) REFERENCES user_table(id)
);

INSERT INTO professor_table (full_name, class, university, photo_reference)
VALUES
  ('Professor 1', 'math203', 'Koc University', 'default'),
  ('Professor 2', 'turk201', 'Koc University', 'default'),
  ('Professor 3', 'comp100', 'Koc University', 'default');

INSERT INTO review_table (prof_id, review_text, rating, user_id)
VALUES
  (1, 'Great professor!', 5, 1),
  (2, 'Average professor.', 3, 2),
  (3, 'Excellent teacher!', 5, 3);



