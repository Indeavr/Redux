import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from "../actions/index";

let nextTodoId = 0;
const _AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input type="text" ref={node => input = node}/>
            <button onClick={() => {
                dispatch(addTodo(input.value));
                input.value = "";
            }}>
                Add
            </button>
        </div>
    )
};

export const AddTodo = connect()(_AddTodo);