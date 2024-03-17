import Result from '../models/Result.js';

export const getAllResults = async (req, res) => {
  
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching results', error: err.message });
  }
};

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching result', error: err.message });
  }
};
// export const createCourse = async (req, res) => {
//   try {
//     const course = await Course.create(req.body);
//     res.status(201).json(course);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const createResult = async (req, res) => {
  try {
    // const { course_id, course_name, student_id, student_name, score } = req.body;
    const newResult = await Result.create(req.body);
    res.status(201).json(newResult);
  } catch (err) {
    console.log("caught you");
    res.status(500).json({ message: 'Error creating result', error: err.message });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { course_id, course_name, student_id, student_name, score } = req.body;
    const updatedResult = await Result.update(req.params.id, { course_id, course_name, student_id, student_name, score });
    if (updatedResult) {
      res.json(updatedResult);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating result', error: err.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const result = await Result.delete(req.params.id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting result', error: err.message });
  }
};

const resultController = {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult
};

export default resultController;
