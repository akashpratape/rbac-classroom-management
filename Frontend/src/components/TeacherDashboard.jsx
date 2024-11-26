import React, { useEffect, useState } from "react";
import api from "../axios";

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", email: "", classroom: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch students' data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/teacher/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.students);
      } catch (err) {
        setError("Failed to fetch student data");
      }
    };
    fetchStudents();
  }, []);

  // Start editing a student
  const handleEdit = (student) => {
    setEditingStudentId(student.id);
    setEditedStudent({ name: student.name, email: student.email, classroom: student.classroom });
  };

  // Handle changes to edited student fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited student
  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(`/teacher/edit-student/${id}`, editedStudent, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the local state
      setStudents((prev) =>
        prev.map((student) => (student.id === id ? { ...student, ...editedStudent } : student))
      );
      setSuccessMessage(response.data.message);
      setEditingStudentId(null);
    } catch (err) {
      setError("Failed to update student");
    }
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                {editingStudentId === student.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedStudent.name}
                    onChange={handleChange}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editingStudentId === student.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editedStudent.email}
                    onChange={handleChange}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {editingStudentId === student.id ? (
                  <input
                    type="text"
                    name="classroom"
                    value={editedStudent.classroom}
                    onChange={handleChange}
                  />
                ) : (
                  student.classroom
                )}
              </td>
              <td>
                {editingStudentId === student.id ? (
                  <button onClick={() => handleSave(student.id)}>Done</button>
                ) : (
                  <button onClick={() => handleEdit(student)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherDashboard;
