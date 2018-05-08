import React from 'react';
import {connect} from 'react-redux';
import {TodoList} from "./TodoList";
import {toggleTodo} from "../actions";
import {withRouter} from "react-router-dom"

const getVisibleTodos = (todos, visibilityFilter) => {
    switch (visibilityFilter) {
        case "all":
            return todos;
            break;
        case "active":
            return todos.filter((todo) => !todo.completed);
            break;
        case "completed":
            return todos.filter((todo) => todo.completed);
            break;
        default:
            return todos;
    }
};

const mapStateToProps = (state, {match}) => ({
    todos: getVisibleTodos(
        state.todos,
        match.params.filter || "all"
    )
});
// const mapDispatchToProps = (dispatch) => ({
//     onTodoClicked(id) {
//         dispatch(toggleTodo(id))
//     }
// });

export const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    {onTodoClicked: toggleTodo}
)(TodoList));
