// const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      // "crypto": require.resolve("crypto-browserify")
    }
  }
};
