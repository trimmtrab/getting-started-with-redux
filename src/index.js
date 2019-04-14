import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Component } from 'react';

// reducer for a single todo element
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};
  
// reducer for todos list
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            );
        default:
            return state;
    }
};
  
// reducer for visibility filter 
const visibilityFilter = (state = 'SHOW_ALL', action) => { 
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}
  
// reducer for todos list and visibility filter
// { stateKey : reducer }
// stateKey and reducer have the same names so we can ommit ":"
// ================
// our store state:
// {todos: [...], visibilityFilter: "..."}
// at todos reducer state will be [...]
// at visibilityFilter reducer state will be "..."
// but action is the same for both of them
const todoApp = combineReducers({
    todos,
    visibilityFilter
});
  
// specify todoApp as store reducer
// redux runs dummy actions with undefined state to populate it
const store = createStore(todoApp);

// filter link component
const FilterLink = ({
    filter,
    currentFilter,
    children,
    onClick
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }

    return (
        <a href="#"
        onClick={e => {
            e.preventDefault();
            onClick(filter);
        }}
        >
            {children}
        </a>
    );
};

const Footer = ({
    visibilityFilter,
    onFilterClick
}) => (
    <p>
        Show:
        {' '}
        <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            Completed
        </FilterLink>
    </p>    
)

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

const TodoList = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
);

const AddTodo = ({
    onAddClick
}) => {
    const input = React.useRef(null);

    return (
        <div>
            <input ref={input} />
            <button onClick={() => {
                onAddClick(input.current.value)
                input.current.value = '';
            }}>
                Add todo
            </button>            
        </div>
    );
};

const getVisibleTodods = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            )
    }
}

//Todo App component
let nextTodoId = 0;
const TodoApp = ({
    todos,
    visibilityFilter
}) => (
    <div className="App">
        <AddTodo 
            onAddClick={text =>
                store.dispatch({
                    type: 'ADD_TODO',
                    text,
                    id: nextTodoId++
                })
            }
        />
        <TodoList
            todos={
                getVisibleTodods(
                    todos,
                    visibilityFilter
                )
            }
            onTodoClick={id =>
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })
            }
        />
        <Footer
            visibilityFilter={visibilityFilter}
            onFilterClick={filter =>
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                })
            }
        />
    </div>
);

const render = () => { 
    ReactDOM.render(
        <TodoApp 
            {...store.getState()}
        />, 
        document.getElementById('root')
    );
};

// makes render run each time store is changed
store.subscribe(render);
render();

//prevents auto-reloading when saving
if (module.hot) {
    module.hot.accept();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
