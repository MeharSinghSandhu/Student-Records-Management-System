import express from 'express';
import cors from 'cors';
import pool from './database.js';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

const app = express();

// Enable all CORS requests
app.use(cors());

app.use(express.json()); // for parsing application/json

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Student Management API');
  });
  
app.use('/api/students', studentRoutes);

app.use('/api/courses', courseRoutes);

app.use('/api/results', resultRoutes); 

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
