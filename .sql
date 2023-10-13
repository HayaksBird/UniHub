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

INSERT INTO user_table (id, username, email, password, salt, hash_algorithm, confirmationCode)
VALUES 
  (1, 'Mikhail', 'poop@gmail.com', '$2b$06$ZW/ce/UUES3PEOOKckwGkO/5nGabnVibEncePKPvwmu4Ic4GSBnzW', '$2b$06$ZW/ce/UUES3PEOOKckwGkO', 'bcrypt', NULL);
  (2, 'XT3RM1NATOR', 'mikashamshidov1@gmail.com', '$2b$06$fuOCdUEgcpMy8uvnjbCNru3rT6abNdEFaJAq54H4V/hGOjB3JGUDi', '$2b$06$fuOCdUEgcpMy8uvnjbCNru', 'bcrypt', NULL);
  (3, 'XT3RM1NATORr', 'mikashamshidov2@gmail.com', '$2b$06$gn7FXYQ5UsRyteqwne3ZfuJ2aM.3ez/GdVR7hakCdQDTdV1.mwjZq', '$2b$06$gn7FXYQ5UsRyteqwne3Zfu', 'bcrypt', NULL);



