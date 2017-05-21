const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');
const webpack = require('webpack');

const GoogleClientId = '501020083536-se0lj994gd36a6ue6bieuv36n8qrjr8f.apps.googleusercontent.com';

module.exports = Merge(CommonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'GOOGLE_CLIENT_ID': JSON.stringify(GoogleClientId)
    })
  ]
});
