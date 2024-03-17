// App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentsPage from './components/StudentsPage';
import CoursesPage from './components/CoursesPage';
import ResultPage from './components/ResultPage';
import './components/home.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={
            <div>
              <main className="main-content">
                <div className='header_area'><header className="main-header">STUDENT RESULTS MANAGER</header></div>
                <section className="app-description">The Student Results Manager is an intuitive, web-based application designed <br/>to streamline the management of academic records. This robust system allows <br/>educators and administrative staff to efficiently organize and maintain<br/> student grades, course enrollments, and result histories with ease.</section>
                <div className="buttons-container">
                  <NavLink to="/students" className="button-link">Students</NavLink>
                  <NavLink to="/courses" className="button-link">Courses</NavLink>
                  <NavLink to="/results" className="button-link">Results</NavLink>
                </div>
              </main>
            </div>
          } />
          <Route path="students" element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="results" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
