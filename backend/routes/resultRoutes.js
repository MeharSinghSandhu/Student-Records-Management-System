import express from 'express';

const router = express.Router();

import resultController from '../controllers/resultController.js';



// GET all results
router.get('/', resultController.getAllResults);

// GET a single result by ID
router.get('/:id', resultController.getResultById);

// POST a new result
router.post('/', resultController.createResult);

// PUT updated info for a result
router.put('/:id', resultController.updateResult);

// DELETE a result
router.delete('/:id', resultController.deleteResult);

export default router;
