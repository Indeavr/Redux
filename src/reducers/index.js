// import {combineReducers} from "redux";
// import todos from "./todos";
// import * as fromTodos from './todos';
//
// const todoApp = combineReducers({
//     todos,
// });
//
// export default todoApp;
//
// export const getVisibleTodos = (state, filter) => {
//     return fromTodos.getVisibleTodos(state.todos, filter);
// };
//
//
//


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

