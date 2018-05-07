import React from 'react';
import {object} from 'prop-types';

let nextTodoId = 0;
export const AddTodo = (props, {store}) => {
    let input;

    return (
        <div>
            <input type="text" ref={node => input = node}/>
            <button onClick={() => {
                store.dispatch({
                    type: "ADD_TODO",
                    text: input.value,
                    id: nextTodoId++
                });
                input.value = "";
            }}>
                Add
            </button>
        </div>
    )
};

AddTodo.contextTypes = {
    store: object
};