var path = require('path');

module.exports = {
    entry: "./client/entry.js",
    output: {
        path: path.resolve(__dirname + '/client/'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            },
            {
              test : /\.jsx?/,
              exclude: /(node_modules|bower_components)/,
              loader : 'babel'
            }
        ]
    }
};