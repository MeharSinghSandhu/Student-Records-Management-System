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
  course: string;
  student: string;
  score: string;
};

const ResultPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');
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
    try {
      // Send course and student names instead of IDs
      const response = await axios.post('http://localhost:3001/api/results', {
        course_name: selectedCourseName,
        student_name: selectedStudentName,
        score: selectedScore,
      });
      
      console.log(response.data);
      setResults([...results, response.data]);
      setSelectedCourseName('');
      setSelectedStudentName('');
      setSelectedScore('');
      alert('Result added successfully!');
    } catch (error) {
      console.error('Error adding result', error);
    }
  };

  return (
    <div className="page-layout">
      <div className="form-container">
        <h1>Results</h1>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedCourseName}
            onChange={e => setSelectedCourseName(e.target.options[e.target.selectedIndex].text)}
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.course_name}>
                {course.course_name}
              </option>
            ))}
          </select>
          <select
            value={selectedStudentName}
            onChange={e => setSelectedStudentName(e.target.options[e.target.selectedIndex].text)}
            required
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={`${student.first_name} ${student.family_name}`}>
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
                <td>{result.course}</td>
                <td>{result.student}</td>
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
