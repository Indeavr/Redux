import v4 from 'uuid/v4';
import * as api from '../api';

export const addTodo = (text) => ({
    type: "ADD_TODO",
    text: text,
    id: v4()
});

export const toggleTodo = (id) => ({
    type: "TOGGLE_TODO",
    id
});

const receiveTodos = (filter, response) => ({
    type: "RECEIVE_TODOS",
    filter,
    response
});

export const fetchTodos = (filter) =>
    api.fetchTodosFromApi(filter).then(response =>
        receiveTodos(filter, response)
    );
