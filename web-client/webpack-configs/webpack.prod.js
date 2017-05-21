const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const webpack = require('webpack');

const GoogleClientId = '501020083536-tdo8aejmf3fe04a4a4lhlkbn838njo7t.apps.googleusercontent.com';

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'GOOGLE_CLIENT_ID': JSON.stringify(GoogleClientId),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
});
