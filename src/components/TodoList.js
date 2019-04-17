import React from 'react';
import Todo from './Todo';
import './TodoList.css';

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul className="TodoList">
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

export default TodoList;
