import { v4 } from 'node-uuid';

// action creators
// return objects that will be called with dispatch

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});
