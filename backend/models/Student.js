import pool from '../database.js';

class Student {
  static async findAll() {
    const [results] = await pool.query('SELECT * FROM students');
    return results;
  }

  static async findById(id) {
    const [results] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return results[0];
  }

  static async create(data) {
    const [result] = await pool.query('INSERT INTO students SET ?', [data]);
    const [newRecord] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
    return newRecord[0];
  }

  static async update(id, data) {
    await pool.query('UPDATE students SET ? WHERE id = ?', [data, id]);
    const [updatedRecord] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    return updatedRecord[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
  }
}

export default Student;
