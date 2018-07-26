module.exports = {
  mode: 'development',
  // entry: "./dev/js/index.js",
  entry: ['babel-polyfill', './dev/js/index.js'],
  output: {
    path: __dirname + '/public/js',
    filename: 'home.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins:[ 'transform-object-rest-spread' ]
        }
      }
    ]
  }
};
