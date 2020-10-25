const path = require('path');
// プラグインの読み込み
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			// mjs, js, jsxの拡張子をトランスパイル
		        test: /\.m?jsx?$/,
			// トランスパイルの対象から除外
		        exclude: /node_modules/,
		        use: {
				 loader: "babel-loader",
			 options: {
				// プリセットは通常のバベルとreactを使う場合はjsx用にreactのプリセットも追加
				// ローダーと同様に後ろから実行されるのでまずjsxを変換->ES2015+を変換の順
				presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				// test ローダーを適用するファイル（正規表現）
				test:/\.(sc|c)ss$/,
				// use testで指定したファイルに適用するローダーの名前
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
			},
			{
				test:/\.html$/,
				loader: 'html-loader'
			}
		]
	},
	// webpack-dev-server --openでブラウザが起動するディレクトリを指定
	devServer: {
		contentBase: outputPath
	},
	// プラグインの設定
	plugins: [
		new HtmlWebpackPlugin({
			// 雛形のHTMLのパス
			template: './src/index.html',
			// 最終的に出力するファイル名
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			// 出力するファイル名 name=デフォルトではmain hash=バンドル時にユニークなhashをつける
			filename: './[name].[hash].css'
		}),
	]
}
