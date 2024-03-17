import Student from '../models/Student.js';
import pool from '../database.js';

export const getAllStudents = async (req, res, next) => {
    try {
        console.log('getting all students')
        const [results] = await pool.query('SELECT * FROM Students');
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

export const getStudentById = async (req, res, next) => {
    try {
        const [results] = await pool.query('SELECT * FROM Students WHERE id = ?', [req.params.id]);
        res.json(results[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

export const createStudent = async (req, res, next) => {
    try {
        const { first_name, family_name, date_of_birth } = req.body;
        const [result] = await pool.query('INSERT INTO Students (first_name, family_name, date_of_birth) VALUES (?, ?, ?)', [first_name, family_name, date_of_birth]);
        res.status(201).json({ id: result.insertId, first_name, family_name, date_of_birth });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

export const updateStudent = async (req, res, next) => {
    try {
        const { first_name, family_name, date_of_birth } = req.body;
        await pool.query('UPDATE Students SET first_name = ?, family_name = ?, date_of_birth = ? WHERE id = ?', [first_name, family_name, date_of_birth, req.params.id]);
        res.json({ id: req.params.id, first_name, family_name, date_of_birth });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

export const deleteStudent = async (req, res, next) => {
    try {
        await pool.query('DELETE FROM Students WHERE id = ?', [req.params.id]);
        res.status(204).end();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

const studentController = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent    
  };
  
export default studentController;