const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const production = {
	mode: 'production',
	// devtool: false,
	devtool: 'hidden-source-map',
	performance: {
		hints: false,
	},
	plugins: [new CleanWebpackPlugin()],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
		runtimeChunk: false,
	},
};

module.exports = () => {
	return merge(common, production);
};
