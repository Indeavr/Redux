import React, {Component} from 'react';
import {Link} from "./Link";
import {object} from 'prop-types';


export class FilterLink extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {filter, children} = this.props;
        const {store} = this.context;
        const state = store.getState();

        return (
            <Link active={filter === state.visibilityFilter}
                  onClick={() => {
                      store.dispatch({
                          type: "SET_VISIBILITY_FILTER",
                          filter
                      })
                  }}>
                {children}
            </Link>
        )
    }
}

FilterLink.contextTypes = {
    store: object
};