import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App'
import todoApp from './reducers/index';

const persistedState = {
    todos: [{
        id: '0',
        text: 'Welcome Back',
        completed: false,
    }],
};
const store = createStore(
    todoApp,
    persistedState
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

//prevents auto-reloading when saving
if (module.hot) {
    module.hot.accept();
}
