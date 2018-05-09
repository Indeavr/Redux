import {createStore, applyMiddleware} from "redux";
import todos from "./reducers/todos";
import promiseMiddleware from 'redux-promise';
import {createLogger} from 'redux-logger';

export const configureStrore = () => {
    const middlewares = [promiseMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todos,
        applyMiddleware(...middlewares)
    );
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

const applyMiddlewareMine = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    })
};

const loggerMine = (store) => (next) => {
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);

        return returnValue;
    }
};

const promiseSupportMine = (store) => (next) => (action) => {
    if (typeof action.then === "function") {
        return action.then(next);
    }

    return next(action);
};