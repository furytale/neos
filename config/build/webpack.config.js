// This is an entry point for webpack. Here appropriate webpack config
// will be selected depending on --env param that passed to webpack CLI.
// e.g. `webpack --env=production`

function buildConfig(env) {
  const errorMsg = 'Please use environment variable to start/build application. e.g. `webpack --env=production`';

  if (!env) {
    throw new Error(errorMsg);
  } else {
    return require('./webpack.config.' + env + '.js')(env);
  }
}

module.exports = buildConfig;