import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Component } from 'react';

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

// container component for link component
class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    static contextType = MyContext;

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={(event) => {
                    event.preventDefault();
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}
            >
                {props.children}
            </Link>
        );
    }
}

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

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    static contextType = MyContext;

    render() {
        // const input = React.useRef(null);
        const input = this.input;
        const { store } = this.context;
        return (
            <div>
                <input ref={input} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: input.current.value,
                        id: nextTodoId++
                    });
                    input.current.value = '';
                }}>
                    Add todo
                </button>            
            </div>
        );
    }
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

class VisibleTodoList extends Component {
    componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    static contextType = MyContext;

    render() {
        const props = this.props;
        const { store } = this.context;
        const state = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodods(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })
                }
            />
        );
    }
}

//Todo App component
let nextTodoId = 0;
const TodoApp = () => (
    <div className="App">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

// class Provider extends Component {
//     render() {
//         return this.props.children;
//     }
// }

ReactDOM.render(
    // <Provider store={createStore(todoApp)}>
    <MyContext.Provider value={{store: createStore(todoApp)}}>
        <TodoApp />
    </MyContext.Provider>,
    // </Provider>,
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
