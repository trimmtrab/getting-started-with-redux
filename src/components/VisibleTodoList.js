import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';
import { fetchTodos } from '../api';

// define component to use lifecycle hook
class VisibleTodoList extends Component {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos => {
            console.log(this.props.filter, todos);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            fetchTodos(this.props.filter).then(todos => {
                console.log(this.props.filter, todos);
            })
        }
    }

    render() {
        return <TodoList {...this.props} />;
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
    // when mapDispatchToProps props have the same arguments
    // as corresponding action creators
    // we can use configuration object instead
    { onTodoClick: toggleTodo }
)(VisibleTodoList));
