var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      // Needed for the css-loader to load Bootstrap's css.
      {
        test: /\.(woff|woff2)$/,
        loader:"url?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ],
  },
  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]),
  stats: { colors: true }
};

