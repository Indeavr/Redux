import React from 'react';
import {AddTodo} from "./components/AddTodo";
import {Footer} from "./components/Footer";
import {VisibleTodoList} from "./components/VisibleTodoList";

export const TodoApp = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
)
