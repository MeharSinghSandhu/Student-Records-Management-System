import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config(); // This will load .env file

// Create a pool to manage connections
const pool = mysql.createPool({ // You should call createPool on the mysql object
  host: "localhost",
  user: "root",
  password: "Icandothis@2407",
  database: "student_management_system",
  multipleStatements: true // Enable the execution of multiple statements if needed
//   DB_HOST="localhost"
// DB_USER="root"
// DB_PASS="Icandothis@2407"
// DB_NAME="student_management_system"
// PORT=3001
});

export default pool;
