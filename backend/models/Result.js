import pool from '../database.js';

class Result {
  static async findAll() {
    const [results] = await pool.query('SELECT * FROM detailed_results');
    return results;
  }

  static async findById(result_id) {
    const [results] = await pool.query('SELECT * FROM detailed_results WHERE result_id = ?', [result_id]);
    return results[0];
  }

  static async create({ course_name, student_name, score }) {
    try {
      // Fetch course_id based on course_name
      const courseQuery = 'SELECT id FROM courses WHERE course_name = ?';
      const [courses] = await pool.query(courseQuery, [course_name]);

      if (courses.length === 0) {
        throw new Error('Course not found');
      }
      const course_id = courses[0].id;

      // Fetch student_id based on student_name
      // Assuming student_name is stored as "first_name family_name" in student_name column
      const studentQuery = 'SELECT id FROM students WHERE CONCAT(first_name, " ", family_name) = ?';
      const [students] = await pool.query(studentQuery, [student_name]);
      if (students.length === 0) {
        throw new Error('Student not found');
      }
      const student_id = students[0].id;

      // Insert the new record into detailed_results
      const insertQuery = 'INSERT INTO detailed_results (course_id, course_name, student_id, student_name, score) VALUES (?, ?, ?, ?, ?)';
      await pool.query(insertQuery, [course_id, course_name, student_id, student_name, score]);

      // Fetch and return the newly created record
      // Note: Adjust according to how you want to fetch the newly created record, e.g., by the latest `result_id`
      const [newRecord] = await pool.query('SELECT * FROM detailed_results ORDER BY result_id DESC');
      return newRecord[0];
    } catch (error) {
      console.error('Error creating result:', error.message);
      throw error; // Rethrow the error or handle it as needed
    }
  }

  static async update(result_id, { course_id, course_name, student_id, student_name, score }) {
    await pool.query('UPDATE detailed_results SET course_id = ?, course_name = ?, student_id = ?, student_name = ?, score = ? WHERE result_id = ?', [course_id, course_name, student_id, student_name, score, result_id]);
    const [updatedRecord] = await pool.query('SELECT * FROM detailed_results WHERE result_id = ?', [result_id]);
    return updatedRecord[0];
  }

  static async delete(result_id) {
    await pool.query('DELETE FROM detailed_results WHERE result_id = ?', [result_id]);
  }
}

export default Result;
