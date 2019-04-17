import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';
import './App.css';

//Todo App component
const App = () => (
    <div className="App">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default App;