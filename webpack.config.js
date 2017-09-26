const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const I18nPlugin = require("i18n-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");



var languages = {
    "ec": require("./src/site-config/ec.json"),
    "mx": require("./src/site-config/mx.json")
};


var getOutPuts = function () {
    var outputs = Object.keys(languages).map(function(language) {
        return {
            name: language,
            entry: {
                app: './src/app.tsx'
            },
            output: {
                path: path.resolve(__dirname, "dist/js"),
                filename: language + ".[name].bundle.js"
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: "ts-loader"
                    },
                    {
                        test: /\.(png|svg|jpg|gif)$/,
                        use: [
                            {
                                // loader: 'file-loader?name=../images/[name].[ext]'
                                loader: 'file-loader?name=../images/[name].[ext]'
                            }
                        ]
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        use: [
                            {
                                loader: 'file-loader?name=../fonts/[name].[ext]'
                            }
                        ]
                    }
                ]
            },
            plugins: [
                    new I18nPlugin(
                        languages[language], {functionName: '___'}
                    ),
                    new HtmlWebpackPlugin({
                        title: 'TypeScript i18n config '+language,
                        filename: '../index_'+language+'.html',
                        template: 'src/template.html'
                    }),
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),
                    // new webpack.optimize.UglifyJsPlugin()
                ]
        };
    });
    outputs.unshift({
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, "dist/js"),
            filename: "[name].bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.scss/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader"
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    includePaths: ["./src/scss"]
                                }
                            }]
                    })
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader?name=../images/[name].[ext]'
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader?name=../fonts/[name].[ext]'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Multibancos ',
                filename: '../index.html',
                template: 'src/template.html'
            }),
            new ExtractTextPlugin({
                filename:  (getPath)=>{
                    return getPath('../css/[name].css').replace('css/js', 'css')
                },
                disable: false
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            // new webpack.optimize.UglifyJsPlugin()

        ],
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
    });
    return outputs;
}

module.exports = getOutPuts;