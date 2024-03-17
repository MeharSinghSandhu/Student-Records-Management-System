import pool from '../database.js';

class Result {
  static async findAll() {
    // Assuming 'detailed_results' is the name of your new view or table
    const query = `SELECT * FROM detailed_results`;
    const [results] = await pool.query(query);
    console.log(results)
    return results;
  }

  static async findById(id) {
    const query = `SELECT * FROM detailed_results WHERE result_id = ?`;
    const [result] = await pool.query(query, [id]);
    return result[0];
  }

  static async create({ course_name, student_name, score }) {
    // Assuming the 'create' operation should insert into the 'results' table
    // And that the 'course_name' and 'student_name' are used to find their respective IDs
    const courseQuery = `SELECT id FROM courses WHERE course_name = ?`;
    const [course] = await pool.query(courseQuery, [course_name]);

    const studentQuery = `SELECT id FROM students WHERE CONCAT(first_name, ' ', family_name) = ?`;
    const [student] = await pool.query(studentQuery, [student_name]);

    if (!course.length || !student.length) {
      throw new Error('Course or student not found');
    }

    const insertQuery = `INSERT INTO detailed_results (student_id, course_id, score) VALUES (?, ?, ?)`;
    const [insertResult] = await pool.query(insertQuery, [student[0].id, course[0].id, score]);

    const newRecordQuery = `SELECT * FROM detailed_results WHERE result_id = ?`;
    const [newRecord] = await pool.query(newRecordQuery, [insertResult.insertId]);
    return newRecord[0];
  }

  static async update(id, { course_name, student_name, score }) {
    // This needs the same logic as 'create' to get IDs from names
    const courseQuery = `SELECT id FROM courses WHERE course_name = ?`;
    const [course] = await pool.query(courseQuery, [course_name]);

    const studentQuery = `SELECT id FROM students WHERE CONCAT(first_name, ' ', family_name) = ?`;
    const [student] = await pool.query(studentQuery, [student_name]);

    if (!course.length || !student.length) {
      throw new Error('Course or student not found');
    }

    const updateQuery = `UPDATE detailed_results SET student_id = ?, course_id = ?, score = ? WHERE id = ?`;
    await pool.query(updateQuery, [student[0].id, course[0].id, score, id]);

    const updatedRecordQuery = `SELECT * FROM detailed_results WHERE result_id = ?`;
    const [updatedRecord] = await pool.query(updatedRecordQuery, [id]);
    return updatedRecord[0];
  }

  static async delete(id) {
    const deleteQuery = `DELETE FROM detailed_results WHERE id = ?`;
    await pool.query(deleteQuery, [id]);
  }
}

export default Result;
