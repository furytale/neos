import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import rootReducer from './redux/reducers';

export const history = createHistory();
const routerMiddleWare = routerMiddleware(history);

// Enable redux-dev-tools in development mode
// and disable them in production.
const composeEnhancers = (process.env.NODE_ENV === 'development') ? composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
}) : compose;

export default createStore(rootReducer, composeEnhancers(
  applyMiddleware(...routerMiddleWare),
  applyMiddleware(thunkMiddleware),
  applyMiddleware(promiseMiddleware()),
  applyMiddleware(logger)
));
