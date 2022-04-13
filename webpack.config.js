// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const config = {
    target: ['web', 'es5'],
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
        host: 'localhost'
    },
    plugins: [new LodashModuleReplacementPlugin()],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
            }
        ]
    }
}

const core = {
    ...config,
    name: 'Core',
    entry: { fp: './src/main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
    }
}

module.exports = () => [core]
