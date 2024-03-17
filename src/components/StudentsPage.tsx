import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './student.css';

type Student = {
  id: number;
  first_name: string;
  family_name: string;
  date_of_birth: string;
};

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    };

    fetchStudents();
  }, []);

  const submitStudent = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName || !familyName || !dateOfBirth) {
      alert('All fields must be filled.');
      return;
    }

    const birthDate = new Date(dateOfBirth);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    if (Math.abs(ageDate.getUTCFullYear() - 1970) < 10) {
      alert('Student must be at least 10 years old.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/students', {
        first_name: firstName,
        family_name: familyName,
        date_of_birth: dateOfBirth
      });
      setStudents([...students, response.data]);
      setFirstName('');
      setFamilyName('');
      setDateOfBirth('');
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div className="students-page-layout">
      <div className="form-container">
        <h1>ADD STUDENT</h1>
        <form onSubmit={submitStudent} className="student-form">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="Family Name"
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="students-list-container">
        <h2>STUDENT LIST</h2>
        <ul className="students-list">
          {students.map((student) => (
            <li key={student.id}>
              {student.first_name} {student.family_name} - Born on {student.date_of_birth}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentsPage;
