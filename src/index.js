import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Counter} from './Counter';
import registerServiceWorker from './registerServiceWorker';
// import { combineReducers} from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import {TodoApp} from "./TodoApp";

// reducers
const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
            break;
        case"TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
            break;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state,
                todo(undefined, action)
            ];
            break;
        case"TOGGLE_TODO":
            return state.map(t => todo(t, action));
            break;
        default:
            return state;
    }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
            break;
        default:
            return state;
    }
};
//
// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// };

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](
                state[key],
                action
            );
            return nextState;
        }, {});
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener())
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener)
        };
    };

    dispatch({});

    return {
        getState,
        dispatch,
        subscribe
    }
};

const store = createStore(todoApp);

const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos} store={store}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
registerServiceWorker();

console.log(store.getState());

// const testAddTodo = () => {
//     const stateBefore = [];
//     const action = {
//         type: "ADD_TODO",
//         id: 0,
//         text: 'GJ Dan'
//     };
//     const stateAfter = [
//         {
//             id: 0,
//             text: "GJ Dan",
//             completed: false
//         }
//     ];
//
//     deepFreeze(stateBefore);
//     deepFreeze(action);
//
//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// };
//
// testAddTodo();

console.log("All tests passed !");


