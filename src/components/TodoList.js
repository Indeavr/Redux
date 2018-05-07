import React from 'react';
import {Todo} from "./Todo";

export const TodoList = ({todos, onTodoClicked}) => {
    return (
        <ul>
            {todos.map((todo) =>
                <Todo key={todo.id}
                      {...todo}
                      onClick={() => onTodoClicked(todo.id)}
                />
            )}
        </ul>
    )
};