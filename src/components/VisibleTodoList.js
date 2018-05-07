import React, {Component} from 'react';
import {TodoList} from "./TodoList";
import {object} from 'prop-types';

const getVisibleTodos = (todos, visibilityFilter) => {
    switch (visibilityFilter) {
        case "SHOW_ALL":
            return todos;
            break;
        case "SHOW_ACTIVE":
            return todos.filter((todo) => !todo.completed);
            break;
        case "SHOW_COMPLETED":
            return todos.filter((todo) => todo.completed);
            break;
    }
};

export class VisibleTodoList extends Component {
    componentDidMount() {
        const {store} = this.context;

        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();

        return (
            <TodoList
                todos={getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                )}
                onTodoClicked={id => {
                    store.dispatch({
                        type: "TOGGLE_TODO",
                        id
                    })
                }}
            >

            </TodoList>
        )
    }
};

VisibleTodoList.contextTypes = {
    store: object
};