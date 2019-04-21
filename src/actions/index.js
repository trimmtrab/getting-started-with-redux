import { v4 } from 'node-uuid';
import * as api from '../api';

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

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    response,
    filter
});

export const fetchTodos = (filter) => 
    api.fetchTodos(filter).then(response => 
        receiveTodos(filter, response)
    );
