const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  {VueLoaderPlugin}  = require('vue-loader');
// import aa from './src/main'
module.exports = {
    entry: path.resolve(__dirname,'./src/main.js'),
    //输出口
    output: {
        filename: 'bundle.js',
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 打包前清理 dist 文件夹
        clean: true,
        //自定义输出文件名发送到输出目录，也可以在rules中使用generator，generator优先级比assetmoudlefilename高
        assetModuleFilename: 'images/[contenthash][ext][query]'
        }, 

             // 配置资源文件
    module: {
        rules: [
            //asset/resource 发送一个单独的文件并导出 URL
            { test: /\.(png|jpg|gif)/i,type: 'asset/resource'},
            //asset/source 导出资源的源代码。
            // { test: /\.txt/,type: 'asset/source'},
            { test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']}
                }
              },
            //    {// 添加这个json，解决如上的报错问题
            //     test: /\.less$/,
            //     use: ['style-loader','css-loader', 'less-loader']
            // }, 
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'less-loader'
                ]
              }
        ],
    },

     //插件
     plugins: [
        // 实例化 html-webpack-plugin 插件
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'./public/index.html'), // 打包生成的文件的模板
        filename: 'app.html', // 打包生成的文件名称。默认为index.html
        // 设置所有资源文件注入模板的位置。可以设置的值true|'head'|'body'|false，默认值为 true
        hash: true,
        inject: true
            }),
            new VueLoaderPlugin()
        ],
        devServer: {
            //将 dist 目录下的文件作为 web 服务的根目录
            static: './dist',
            },
             // 在开发模式下追踪代码
        // devtool: 'inline-source-map',
       
    //    lintOnsave:false,
        //开发模式
        mode: 'development'
    }