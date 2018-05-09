import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TodoList} from "./TodoList";
import {toggleTodo, fetchTodos} from "../actions";
import {withRouter} from "react-router-dom"
import {getVisibleTodos} from "../reducers/todos";
import {oneOf, func} from 'prop-types';

class _VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    };

    render() {
        const {toggleTodo, ...rest} = this.props;

        return (
            <TodoList onTodoClicked={toggleTodo} {...rest}/>
        )
    }
};

_VisibleTodoList.propTypes = {
    filter: oneOf(["all", "active", "completed"]).isRequired,
    fetchTodos: func.isRequired,
    toggleTodo: func.isRequired
};


const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';

    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
};

const VisibleTodoList = withRouter(connect(
    mapStateToProps,
    {toggleTodo, fetchTodos}
)(_VisibleTodoList));


export default VisibleTodoList;


// const mapDispatchToProps = (dispatch) => ({
//     onTodoClicked(id) {
//         dispatch(toggleTodo(id))
//     }
// });

// dispatch toggleTodo