import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './home.css'; // Make sure you have this CSS file in the same folder

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/students" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Students</NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Courses</NavLink>
          </li>
          <li>
            <NavLink to="/results" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Results</NavLink>
          </li>
        </ul>
      </nav>
      {/* <main className="main-content"> */}
       
        
        <Outlet /> {/* This is where the route components will be rendered */}
      {/* </main> */}
    </div>
  );
};

export default HomePage;
