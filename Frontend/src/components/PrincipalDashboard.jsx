import React, { useEffect, useState } from "react";
import axios from "../axios";
import "../index.css"

function PrincipalDashboard() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [editMode, setEditMode] = useState({}); // Tracks which row is in edit mode
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("/principal/dashboard", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(response => {
                setTeachers(response.data.teachers);
                setStudents(response.data.students);
            })
            .catch(() => setError("Failed to fetch data."));
    }, []);

    const handleEditClick = (id, type) => {
        setEditMode({ id, type }); // Enable edit mode for the specified row
    };

    const handleDoneClick = (id, type, updates) => {
        const endpoint = `/principal/edit-user/${id}`;
        axios
            .put(endpoint, updates, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(() => {
                alert("User updated successfully!");

                // Update local state after saving changes
                if (type === "teacher") {
                    setTeachers(prev =>
                        prev.map(teacher =>
                            teacher.id === id ? { ...teacher, ...updates } : teacher
                        )
                    );
                } else if (type === "student") {
                    setStudents(prev =>
                        prev.map(student =>
                            student.id === id ? { ...student, ...updates } : student
                        )
                    );
                }

                setEditMode({}); // Exit edit mode
            })
            .catch(() => alert("Failed to update user."));
    };

    const renderActions = (id, type, user) => {
        if (editMode.id === id && editMode.type === type) {
            return (
                <button
                    onClick={() =>
                        handleDoneClick(id, type, {
                            name: user.name,
                            email: user.email,
                            subject: user.subject,
                            classroom: user.classroom,
                        })
                    }
                >
                    Done
                </button>
            );
        }
        return <button onClick={() => handleEditClick(id, type)}>Edit</button>;
    };

    const handleInputChange = (e, id, field, type) => {
        const value = e.target.value;

        if (type === "teacher") {
            setTeachers(prev =>
                prev.map(teacher =>
                    teacher.id === id ? { ...teacher, [field]: value } : teacher
                )
            );
        } else if (type === "student") {
            setStudents(prev =>
                prev.map(student =>
                    student.id === id ? { ...student, [field]: value } : student
                )
            );
        }
    };

    return (
        <div className="table-container">
            <h1 className="heading">Principal's Dashboard</h1>
            {error && <p>{error}</p>}

            <h2 className="sub-heading">Teachers</h2>
            <table border="1">
                <thead>
                    <tr className="tb-heading">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>
                                {editMode.id === teacher.id && editMode.type === "teacher" ? (
                                    <input
                                        type="text"
                                        value={teacher.name}
                                        onChange={e =>
                                            handleInputChange(e, teacher.id, "name", "teacher")
                                        }
                                    />
                                ) : (
                                    teacher.name
                                )}
                            </td>
                            <td>
                                {editMode.id === teacher.id && editMode.type === "teacher" ? (
                                    <input
                                        type="email"
                                        value={teacher.email}
                                        onChange={e =>
                                            handleInputChange(e, teacher.id, "email", "teacher")
                                        }
                                    />
                                ) : (
                                    teacher.email
                                )}
                            </td>
                            <td>
                                {editMode.id === teacher.id && editMode.type === "teacher" ? (
                                    <input
                                        type="text"
                                        value={teacher.subject}
                                        onChange={e =>
                                            handleInputChange(e, teacher.id, "subject", "teacher")
                                        }
                                    />
                                ) : (
                                    teacher.subject
                                )}
                            </td>
                            <td>{renderActions(teacher.id, "teacher", teacher)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="sub-heading">Students</h2>
            <table border="1">
                <thead>
                    <tr className="tb-heading">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Classroom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>
                                {editMode.id === student.id && editMode.type === "student" ? (
                                    <input
                                        type="text"
                                        value={student.name}
                                        onChange={e =>
                                            handleInputChange(e, student.id, "name", "student")
                                        }
                                    />
                                ) : (
                                    student.name
                                )}
                            </td>
                            <td>
                                {editMode.id === student.id && editMode.type === "student" ? (
                                    <input
                                        type="email"
                                        value={student.email}
                                        onChange={e =>
                                            handleInputChange(e, student.id, "email", "student")
                                        }
                                    />
                                ) : (
                                    student.email
                                )}
                            </td>
                            <td>
                                {editMode.id === student.id && editMode.type === "student" ? (
                                    <input
                                        type="text"
                                        value={student.classroom}
                                        onChange={e =>
                                            handleInputChange(e, student.id, "classroom", "student")
                                        }
                                    />
                                ) : (
                                    student.classroom
                                )}
                            </td>
                            <td>{renderActions(student.id, "student", student)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrincipalDashboard;

