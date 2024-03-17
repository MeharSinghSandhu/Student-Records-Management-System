import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './courses.css';

type Course = {
  id: number;
  course_name: string;
};

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState('');

  // Function to fetch courses from the backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  // Function to submit a new course to the backend
  const submitCourse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (courseName) {
      try {
        console.log("submit course entered");
        const response = await axios.post('http://localhost:3001/api/courses', { course_name: courseName });
        setCourses([...courses, response.data]);
        setCourseName(''); // Clear the input after successful submission
        // Display a notification here if necessary
      } catch (error) {
        console.error('Error adding course', error);
      }
    } else {
      alert('Please enter a course name.');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
// ... (The rest of your component code)

return (
  <div className="page-container">
    
    <div className="courses-content">
      <div className="form-container">
      <h1>COURSES</h1>
        <form onSubmit={submitCourse}>
          <label>
            Course Name:
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="list-container">
        <h2>Course List</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.course_name}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ...

};

export default CoursesPage;