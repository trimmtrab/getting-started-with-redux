import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

// maps store state to props of todo component
const mapStateToTodoListProps = (state, { match }) => ({
    todos: getVisibleTodos(state, match.params.filter || 'all'),
});

export default withRouter(connect(
    mapStateToTodoListProps,
    // when mapDispatchToProps props have the same arguments
    // as corresponding action creators
    // we can use configuration object instead
    { onTodoClick: toggleTodo }
)(TodoList));
