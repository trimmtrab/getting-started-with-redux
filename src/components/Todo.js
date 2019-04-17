import React from 'react';
import './Todo.css';

const Todo = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        className={completed ? "todoCompleted" : "todoInProgress"}
    >
        {text}
    </li>    
);

export default Todo;
