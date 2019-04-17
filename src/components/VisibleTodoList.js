import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions/index';

const getVisibleTodods = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            )
    }
};

// maps store state to props of todo component
const mapStateToTodoListProps = (state) => ({
    todos: getVisibleTodods(
        state.todos,
        state.visibilityFilter
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
