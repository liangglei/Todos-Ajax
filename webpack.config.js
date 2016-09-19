/**
 * Created by gavingliang on 2016/08/30.
 * 开发环境打包文件配置
 */
var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js'); //使用压缩版的react否则v15会弹出警告
var pathToReactDom=path.resolve(node_modules,'react-dom/dist/react-dom.min.js');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
	//插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common','common.min.js'),//将公用文件打包,
        new webpack.NoErrorsPlugin(),//允许错误不打断程序
		new webpack.optimize.UglifyJsPlugin({ //压缩文件
			  compress: {
				warnings: false
			  }
             })
    ],
	
    //页面入口文件配置
    entry:{
       //'webpack/hot/dev-server', 
       //app:path.resolve(__dirname,'app/app.js'),
	   index2:path.resolve(__dirname,'app/index.js')
     },

    //文件输出配置
    output:{
        path: path.resolve(__dirname,'dev'),
        filename: '[name].min.js'
    },
	
    devServer: {
        inline: true,
        port: 7777  //配置webpack-dev-server端口
    },

    module: {
        //加载器配置
        loaders: [
            {   test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['es2015','react']
                } 
            },
			{test: /\.less/, loader: 'style!css!less'},
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
              //imag&font
			{ test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader?limit=8192'},
			{ test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192'}
        ],
        //noParse: [pathToReact,pathToReactDom] //不解析压缩版
    },
    resolve: {
                //查找module的根目录
        //root: 'E:/github/flux-example/app', //绝对路径
             
        extensions: ['', '.js', '.json', '.scss'],//可以省略不写后缀名
           
        alias: {   //模块别名定义，方便后续直接引用别名
            //AppStore : 'js/stores/AppStores.js',
            //ActionType : 'js/actions/ActionType.js',
            //AppAction : 'js/actions/AppAction.js',
          //  'react': pathToReact,  //定义别名，通过引入压缩版避免警告
          //  'react-dom':pathToReactDom,
        }
    }
};