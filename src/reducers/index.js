import {combineReducers} from "redux";
import {todos} from "./todos";

export const todoApp = combineReducers({
    todos,
});


const combineReducersMine = (reducers) => {
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

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// };

