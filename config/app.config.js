/// This file contains all app related configuration
// Split the configuration into the different environments

const config = {
  "development": {
    apiURL: 'https://api.nasa.gov/neo/rest/v1/feed',
    apiKey: 'SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl',
    apiProtocol: window.location.protocol,
  },
  "production": {
    apiURL: 'https://api.nasa.gov/neo/rest/v1/feed',
    apiKey: 'SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl',
    apiProtocol: 'https:',
  }
};

module.exports = config[process.env.NODE_ENV];