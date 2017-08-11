var webpack = require('webpack')

var config = {
    entry:{bundle:'./src/js/app.js'},
    output: {
        path: __dirname + '/out',
        publicPath:'',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader', 
                exclude: /node_modules/,
                query: {
                    presets:['react','es2015']
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    }
};

module.exports = config;
