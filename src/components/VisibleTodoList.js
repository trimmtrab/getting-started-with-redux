import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/index';

const getVisibleTodods = (
    todos,
    filter
) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(
                t => t.completed
            );
        case 'active':
            return todos.filter(
                t => !t.completed
            )
    }
};

// maps store state to props of todo component
const mapStateToTodoListProps = (state, { match }) => ({
    todos: getVisibleTodods(state.todos, match.params.filter || 'all'),
});

export default withRouter(connect(
    mapStateToTodoListProps,
    // when mapDispatchToProps props have the same arguments
    // as corresponding action creators
    // we can use configuration object instead
    { onTodoClick: toggleTodo }
)(TodoList));
