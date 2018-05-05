import registerServiceWorker from "./registerServiceWorker";
import ReactDOM from "react-dom";

const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
            break;
        case "DECREMENT":
            return state - 1;
            break;
        default:
            return state;
            break;
    }
    return state;
};

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

const store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}
                 onIncrement={() => {
                     store.dispatch({
                         type: "INCREMENT"
                     })
                 }}
                 onDecrement={() => {
                     store.dispatch({
                         type: "DECREMENT"
                     })
                 }}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

registerServiceWorker();

const toggleTodo = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
};

console.log("All tests passed !");


// const addCounter = (list) => {
//     return [...list, 0]
// };
//
// const removeCounter = (list, index) => {
//     return [
//         ...list.slice(0, index),
//         ...list.slice(index + 1)
//     ];
// };
//
// // tests
// const testAddCounter = () => {
//     const listBefore = [],
//         listAfter = [0];
//
//     deepFreeze(listBefore);
//
//     expect(
//         addCounter(listBefore)
//     ).toEqual(listAfter);
// };
//
// const testRemoveCounter = () => {
//     const listBefore = [0, 10, 20];
//     const listAfter = [0, 20];
//
//     deepFreeze(listBefore);
//
//     expect(
//         removeCounter(listBefore, 1)
//     ).toEqual(listAfter);
// };
//
// testAddCounter();
// testRemoveCounter();
