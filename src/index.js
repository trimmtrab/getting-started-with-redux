import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import App from './components/App'
import todoApp from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
    todoApp,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
}, 1000));

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
