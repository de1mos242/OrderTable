module.exports = function (buildenv) {
  return require(`./webpack-configs/webpack.${buildenv}.js`);
};
