const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'client'),
  },
  module: {
    rules: [
    ],
  },
};