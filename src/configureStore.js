import {loadState, saveState} from "./localStorage";
import throttle from "lodash/throttle";
import {createStore} from "redux";
import {todoApp} from "./reducers";

export const configureStrore = () => {
    const persistedState = loadState();

    const store = createStore(
        todoApp,
        persistedState
    );

    store.subscribe(throttle(() => {
            saveState({
                todos: store.getState().todos
            })
        }, 1000)
    );

    return store;
};

const createStoreMine = (reducer) => {
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
