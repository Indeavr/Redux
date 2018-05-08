import React from 'react';
import {TodoApp} from "./TodoApp";
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';

export const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/:filter?" component={TodoApp}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)