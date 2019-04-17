import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

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

export default todoApp;
