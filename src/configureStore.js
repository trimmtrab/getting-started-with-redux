import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
    // pass midlewares in order in which action propogates through the middlewares
    const middlewares = [promise];
    
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
}

export default configureStore;
