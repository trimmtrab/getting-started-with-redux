import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';
import './App.css';

//Todo App component
const App = ({ match }) => (
    <div className="App">
        <AddTodo />
        <VisibleTodoList
            filter={match.params.filter || 'all'}
        />
        <Footer />
    </div>
);

export default App;
