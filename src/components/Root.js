import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'

const Root = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <div>
            {/* path is an Express string */}
            <Route path='/:filter?' component={App} />
            </div>
        </BrowserRouter>
    </Provider>
);

export default Root;
