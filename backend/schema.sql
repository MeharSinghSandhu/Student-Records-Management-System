-- Drop the tables if they exist to start fresh when this script runs
DROP TABLE IF EXISTS results;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  family_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL UNIQUE
);

-- Results Table
CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  score ENUM('A', 'B', 'C', 'D', 'E', 'F') NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
