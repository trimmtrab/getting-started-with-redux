import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/index';

let AddTodo = ({ dispatch }) => {
    const input = React.useRef(null);
    return (
        <div>
            <input ref={input} />
            <button onClick={() => {
                dispatch(addTodo(input.current.value));
                input.current.value = '';
            }}>
                Add todo
            </button>            
        </div>
    );
};
// no 1st argument means there's no need to subscribe to the store
// no 2nd argument means it is equal to
// dispatch => {
//     return { dispatch };
// }
export default connect()(AddTodo);
