const { resolve: resolvePath } = require('path');

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './app/view/index.js',
    output: {
        filename: 'main.js',
        path: resolvePath('public/js'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new BundleAnalyzerPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    watch: true,
};
