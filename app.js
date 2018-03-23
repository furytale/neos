// Important import related to HMR. It have to be at the
// very top of the application source code.
import 'react-hot-loader/patch';

// Babel polyfill. Make our app working in IE10+
// Has to be at the very beginning of the bandle.

// Core styles file. It contains variables, mixins, reset.
import 'theme/theme.styl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Special AppContainer to make HMR work
import { AppContainer } from 'react-hot-loader';

// React and ReactDOM instances
import React from 'react';
import ReactDOM from 'react-dom';

import App from './source/AppRouter';
const isDevelopment = (process.env.NODE_ENV === 'development');

// From this place our app start loading;
// In development mode HMR activated using react-hot-loader
const render = (Component: Object) => {
  ReactDOM.render(
    <div id='app-container'>
      {isDevelopment ? (
        <MuiThemeProvider>
          <AppContainer>
              <Component />
          </AppContainer>
        </MuiThemeProvider>
      ) : (
        <MuiThemeProvider>
          <Component />
        </MuiThemeProvider>
      )}
    </div>,
    document.getElementById('neo-app'));
};

render(App);

// Hot Module Replacement API
if (module.hot && isDevelopment) {
  module.hot.accept('./source/AppRouter', () => {
    render(App);
  });
}
