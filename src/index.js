import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);

//prevents auto-reloading when saving
if (module.hot) {
    module.hot.accept();
}
