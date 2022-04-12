// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')

const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const config = {
    target: ['web', 'es5'],
    mode: isProduction ? 'production' : 'development',
    devtool: false,
    devServer: {
        open: true,
        host: 'localhost'
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['vendor.bundle.js']
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 100,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /([/\\]node_modules[/\\]|[/\\]dev[/\\]vendor[/\\])/,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: { sourceMap: false }
                    }
                ]
            }
        ]
    }
}

const calendarConfig = {
    ...config,
    name: 'calendarConfig',
    entry: { Calendar: './src/calendar/main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: 'Calendar'
    }
}

const bookingConfig = {
    ...config,
    name: 'bookingConfig',
    entry: { Booking: './src/booking/main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}

module.exports = () => [calendarConfig, bookingConfig]
