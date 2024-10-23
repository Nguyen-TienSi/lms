// src/pages/TeacherExercise.js
import React, { useState } from 'react';
import AssignmentForm from '../../components/AssignmentForm';
import AssignmentList from '../../components/AssignmentList';

const TeacherExercise = () => {
    const [assignments, setAssignments] = useState([]);

    const addAssignment = (assignment) => {
        setAssignments([...assignments, assignment]);
    };

    return (
        <div>
            <h1>Trang giao bài tập</h1>
            <AssignmentForm onAddAssignment={addAssignment} />
            <AssignmentList assignments={assignments} />
        </div>
    );
};

export default TeacherExercise;
