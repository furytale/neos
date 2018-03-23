/* eslint-disable */
import { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { default as store, history } from './AppStore';
import NeoContainer from './components/containers/App';

// Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
if (module.hot) {
  module.hot.accept('./redux/reducers', () =>
    store.replaceReducer(require('./redux/reducers').default)
  );
}

class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact={true} component={NeoContainer} history={history}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default AppRouter;
/* eslint-enable */
