import pool from '../database.js';

class Course {
  static async findAll() {
    const [results] = await pool.query('SELECT * FROM courses');
    return results;
  }

  static async findById(id) {
    const [results] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    return results[0];
  }

  static async create(data) {
    const [result] = await pool.query('INSERT INTO courses SET ?', [data]);
    const [newRecord] = await pool.query('SELECT * FROM courses WHERE id = ?', [result.insertId]);
    return newRecord[0];
  }

  static async update(id, data) {
    await pool.query('UPDATE courses SET ? WHERE id = ?', [data, id]);
    const [updatedRecord] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
    return updatedRecord[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM courses WHERE id = ?', [id]);
  }
}

export default Course;
