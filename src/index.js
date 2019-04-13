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
// since stateKey and reducer have the same names we can ommit ":"
const todoApp = combineReducers({
    todos,
    visibilityFilter
});
  
// specify todoApp as store reducer
const store = createStore(todoApp);

//Todo App component
let nextTodoId = 0;
class App extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    render() {
        return (
            <div className="App">
                <input ref={this.input} />
                <button onClick={() => {
                        store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.current.value,
                        id: nextTodoId++
                    });
                    // this.input.current.value = "";
                }}>
                    Add todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                });
                            }}
                            className={todo.completed ? "todoCompleted" : "todoInProgress"}
                        >
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <App 
            todos={store.getState().todos}
        />, 
        document.getElementById('root')
    );
};

// makes render run each time store is changed
store.subscribe(render);
render();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
