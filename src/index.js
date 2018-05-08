import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {configureStrore} from "./configureStore";
import {Root} from "./components/Root";

const store = configureStrore();

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
);

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


