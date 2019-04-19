import { connect } from 'react-redux';
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
const mapStateToTodoListProps = (state, ownProps) => ({
    todos: getVisibleTodods(
        state.todos,
        ownProps.filter
    )
});

// maps dispatch method of store to props of todo component
const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id));
    }
});

export default connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);
