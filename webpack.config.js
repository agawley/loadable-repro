const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    plugins: [
        new LoadablePlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!browserconfig.xml', '!site.webmanifest'],
            verbose: true,
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            //Fixes bug in react-spring used by nivo
            {
                test: /react-spring/,
                sideEffects: true,
            },
        ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, 'src/public'),
        publicPath: '/public/',
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
};
