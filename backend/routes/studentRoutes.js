import express from 'express';
const router = express.Router();

import studentController from '../controllers/studentController.js'; 

// GET all students
router.get('/', studentController.getAllStudents);

// GET a single student by ID
router.get('/:id', studentController.getStudentById);

// POST a new student
router.post('/', studentController.createStudent);

// PUT updated info for a student
router.put('/:id', studentController.updateStudent);

// DELETE a student
router.delete('/:id', studentController.deleteStudent);


export default router;