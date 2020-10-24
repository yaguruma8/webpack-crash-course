const path = require('path')

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: outputPath
	},
	// ローダーの登録
	module: {
		rules: [
			{
				// test ローダーを適用するファイル（正規表現）
				test:/\.css$/,
				// use testで指定したファイルに適用するローダーの名前
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpe?g|png|gif|swg|ico)$/i,
				loader: 'url-loader',
				// url-loaderにfile-loaderを適用する場合はoptions
				options: {
					// ファイルサイズの上限（これ以上はファイルとして扱う）
					limit: 2048,
					// 画像ファイルのパスの設定
					name: './images/[name].[ext]'
					}
			}
		]
	},
	// webpack-dev-server --openでブラウザが起動するディレクトリを指定
	devServer: {
		contentBase: outputPath
	}
}
