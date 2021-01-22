const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/js/index.js',
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src/'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-0'],
						plugins: [
							[
								'transform-runtime',
								{
									regenerator: true,
								},
							],
						],
					},
				},
			},
		],
	},

	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
	},

	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/index.html'),
				to: path.resolve(__dirname, 'build'),
			},
			{
				from: path.resolve(__dirname, 'content', '**', '*'),
				to: path.resolve(__dirname, 'build'),
			},
		]),
		new webpack.DefinePlugin({
			'typeof CANVAS_RENDERER': JSON.stringify(true),
			'typeof WEBGL_RENDERER': JSON.stringify(true),
		}),
	],
};
