const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: './client/src/app.jsx',
  output: {
    path: path.join(__dirname, 'client', 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public/index.html'),
    }),
  ],
  devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'client', 'public'),
    publicPath: '/dist/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  mode: process.env.NODE_ENV || 'development',
});
