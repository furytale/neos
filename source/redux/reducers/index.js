import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// app reducers
import neo from './neo';

const rootReducer = combineReducers({
  router: routerReducer,
  neo
});

export default rootReducer;
