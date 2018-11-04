const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app/assets/js/App.js',
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './app/assets/js')
    }
}