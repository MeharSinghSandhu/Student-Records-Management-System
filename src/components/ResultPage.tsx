import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './results.css';

type Course = {
  id: number;
  course_name: string;
};

type Student = {
  id: number;
  first_name: string;
  family_name: string;
};

type Result = {
  course_name: string; // Changed to string to match the course_name
  student_name: string; // Renamed to match the post request body
  score: string;
};

const ResultPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState('');

  useEffect(() => {
    // Fetch courses
    axios.get('http://localhost:3001/api/courses').then(response => setCourses(response.data));
    
    // Fetch students
    axios.get('http://localhost:3001/api/students').then(response => setStudents(response.data));
    
    // Fetch detailed results
    axios.get('http://localhost:3001/api/results').then(response => setResults(response.data));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCourseId && selectedStudentId) {
      const courseName = courses.find(course => course.id === selectedCourseId)?.course_name;
      const student = students.find(student => student.id === selectedStudentId);
      const studentName = student ? `${student.first_name} ${student.family_name}` : '';

      try {
        const response = await axios.post('http://localhost:3001/api/results', {
          course_name: courseName,
          student_name: studentName,
          score: selectedScore,
        });
        
        console.log(response.data);
        setResults([...results, response.data]); // Make sure the server response has course_name and student_name
        setSelectedCourseId(null);
        setSelectedStudentId(null);
        setSelectedScore('');
        alert('Result added successfully!');
      } catch (error) {
        console.error('Error adding result', error);
      }
    } else {
      alert('Please select both a course and a student.');
    }
  };

  return (
    <div className="page-layout">
      <div className="form-container">
        <h1>Results</h1>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedCourseId ?? ''}
            onChange={e => setSelectedCourseId(Number(e.target.value))}
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
          <select
            value={selectedStudentId ?? ''}
            onChange={e => setSelectedStudentId(Number(e.target.value))}
            required
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.family_name}
              </option>
            ))}
          </select>
          <select
            value={selectedScore}
            onChange={e => setSelectedScore(e.target.value)}
            required
          >
            <option value="">Select Score</option>
            {['A', 'B', 'C', 'D', 'E', 'F'].map(score => (
              <option key={score} value={score}>
                {score}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="list-container">
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Student</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.course_name}</td>
                <td>{result.student_name}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPage;
