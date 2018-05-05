import React, {Component} from 'react';

let nextTodoId = 0;

export class TodoApp extends Component {
    render() {
        return (
            <div>
                <input type="text" ref={node => {
                    this.input = node;
                }}/>
                <button onClick={() => {
                    this.props.store.dispatch({
                        type: "ADD_TODO",
                        text: this.input.value,
                        id: nextTodoId++
                    })
                    this.input.value = "";
                }}>
                    Add
                </button>
                <ul>
                    {this.props.todos.map((todo) => {
                        return (<li key={todo.id}>
                            {todo.text}
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}
