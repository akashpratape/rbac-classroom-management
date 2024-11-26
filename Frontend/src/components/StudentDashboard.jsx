import React, { useEffect, useState } from "react";
import api from "../axios";

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  // Fetch students' data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.students);
      } catch (err) {
        setError("Failed to fetch student data");
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Classroom</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
