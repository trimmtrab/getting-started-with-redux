import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

// define component to use lifecycle hook
class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const { filter, fetchTodos } = this.props; 
        fetchTodos(filter);
    }

    render() {
        const { toggleTodo, ...rest } = this.props; 
        return (
            <TodoList 
                {...rest} 
                onTodoClick={toggleTodo}
            />
        );
    }
}

// maps store state to props of todo component
const mapStateToTodoListProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    };
};

export default withRouter(connect(
    mapStateToTodoListProps,
    actions
)(VisibleTodoList));
