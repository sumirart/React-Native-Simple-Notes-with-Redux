import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';

const middlewares = [];
// middleware react navigation
const reactNavigation = createReactNavigationReduxMiddleware(
    'root',
    state => state.router,
);
middlewares.push(reactNavigation);

// middlewares logger
const logger = createLogger();
middlewares.push(logger);

export default middlewares;