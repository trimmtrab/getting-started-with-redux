import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Component } from 'react';
import { Provider, connect } from 'react-redux';

const MyContext = React.createContext();

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

// action creators
// return objects that will be called with dispatch
// ===============
let nextTodoId = 0;
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    };
};

const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    };
};
// ===============

// specifies only appearance of link
const Link = ({
    active,
    children,
    onClick
}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href="#"
        onClick={onClick}
        >
            {children}
        </a>
    );
};

// ownProps = props that we will pass to container returned from connect
const mapStateToLinkProps = (
    state,
    ownProps
) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}
const mapDispatchToLinkProps = (
    dispatch,
    ownProps
 ) => {
    return {
        onClick: () => {
            dispatch(
                setVisibilityFilter(ownProps.filter)
            );
        }
    };
 }
 const FilterLink = connect(
     mapStateToLinkProps,
     mapDispatchToLinkProps
 )(Link);

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL'>
            All
        </FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'>
            Active
        </FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'>
            Completed
        </FilterLink>
    </p>
);

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

let AddTodo = ({ dispatch }) => {
    const input = React.useRef(null);
    return (
        <div>
            <input ref={input} />
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.current.value = '';
            }}>
                Add todo
            </button>            
        </div>
    );
};
// no 1st argument means there's no need to subscribe to the store
// no 2nd argument means it is equal to
// dispatch => {
//     return { dispatch };
// }
AddTodo = connect()(AddTodo);

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

// maps store state to props of todo component
const mapStateToTodoListProps = (state) => {
    return {
        todos: getVisibleTodods(
            state.todos,
            state.visibilityFilter
        )
    };
};
// maps dispatch method of store to props of todo component
const mapDispatchToTodoListProps = (dispatch) => {
    return {
        onTodoClick: (id) =>
            dispatch(toggleTodo(id))
    };
};
const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);

//Todo App component
const TodoApp = () => (
    <div className="App">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
    </Provider>,
    document.getElementById('root')
);

//prevents auto-reloading when saving
if (module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
