import express from 'express';
import courseController from '../controllers/courseController.js';

const router = express.Router();


// GET all courses
router.get('/', courseController.getAllCourses);

// GET a single course by ID
router.get('/:id', courseController.getCourseById);

// POST a new course
router.post('/', courseController.createCourse);

// PUT updated info for a course
router.put('/:id', courseController.updateCourse);

// DELETE a course
router.delete('/:id', courseController.deleteCourse);

export default router;
