const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

let apiHost;
let websocketHost;

const setupAPI = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			apiHost = 'http://192.168.33.10';
			break;
		case 'development':
			apiHost = 'https://dev-api.ticketless.fi';
			break;
		case 'demo':
			apiHost = 'https://api-demo.ticketless.fi';
			break;
		case 'staging':
			apiHost = 'https://api-staging.ticketless.fi';
			break;
		case 'production':
			apiHost = 'https://api.ticketless.fi';
			break;
		default:
			apiHost = 'http://192.168.33.10';
			break;
	}
};

const setupWebsocket = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			websocketHost = '192.168.33.10:3000';
			break;
		case 'development':
			websocketHost = 'https://dev-socket.ticketless.fi';
			break;
		case 'production':
			websocketHost = 'https://socket.ticketless.fi';
			break;
		default:
			websocketHost = '192.168.33.10:3000';
			break;
	}
};

setupAPI();
setupWebsocket();

const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(`isDevelopment: ${isDevelopment}`);
console.log('ENVIRONMENT IS: ' + process.env.NODE_ENV);

module.exports = {
	entry: {
		app: './src/index.tsx',
	},
	output: {
		filename: '[name].bundle.[contenthash].js',
		chunkFilename: '[name].chunk.bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	stats: 'errors-warnings',
	resolve: {
		extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
		alias: {
			'@api': path.resolve(__dirname, 'src/api'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@src': path.resolve(__dirname, 'src'),
			'@views': path.resolve(__dirname, 'src/views'),
		},
	},
	module: {
		rules: [
			{
				// Include ts, tsx, js, and jsx files.
				test: /\.tsx?$/,
				exclude: [
					/node_modules/,
					path.resolve(__dirname, 'static'),
					/sw\.js$/,
					/service-worker\.js$/,
				],
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(s*)css$/,
				include: /node_modules/,
				use: [
					isDevelopment
						? {
								loader: 'style-loader',
								options: {
									esModule: false,
								},
						  }
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									esModule: false,
								},
						  },
					'css-loader',
				],
			},
			{
				test: /\.(s*)css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
							// only enable hot in development
							// hmr: process.env.NODE_ENV === "local",
							// if hmr does not work, this is a forceful method.
							// reloadAll: true
						},
					},
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name]-[hash].[ext]',
							outputPath: 'img/', // file pack output path, is relative path for `dist`
							publicPath: '/img/', // css file will use, is absolute path for server
						},
					},
				],
			},
		],
	},
	plugins: [
		new NodePolyfillPlugin(),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
				mode: 'write-references',
			},
		}),
		new HtmlWebpackPlugin({
			title: 'Production',
			template: './src/index.html',
			hash: true,
			showErrors: false,
			environment: JSON.stringify(process.env.NODE_ENV),
		}),
		/* new WorkerPlugin(), */
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename:
				process.env.NODE_ENV === 'local' ? '[name].css' : '[name].css',
			chunkFilename:
				process.env.NODE_ENV === 'local' ? '[name].css' : '[name].css',
		}),
		new webpack.DefinePlugin({
			API_BASE_URL: JSON.stringify(apiHost),
			WEBSOCKET_URL: JSON.stringify(websocketHost),
			ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'public',
					to: 'public',
					noErrorOnMissing: true,
				},
			],
		}),
		new ESLintPlugin({
			extensions: ['ts', 'tsx'],
			exclude: ['node_modules'],
		}),
	],
};
