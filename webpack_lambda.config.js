// webpack.config.js
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    mode: 'production',
    node: false,
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    performance: {
        // Turn off size warnings for entry points
        hints: false,
    },
    plugins: [
        new LoadablePlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/public/*',
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/,
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    node: '12',
                                },
                            },
                        ],
                    ],
                },
            },
        ],
    },
};
