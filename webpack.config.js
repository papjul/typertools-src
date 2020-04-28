const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const postcssCssnano = require('cssnano');


const defaultConfig = {
    entry: {
        index: ['./app_src/index.jsx']
    },
    output: {
        path: __dirname + '/app/',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

const devConfig = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash']
                    }
                }
            }, {
                test: /\.css$/,
                use: {
                    loader: 'file-loader'
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: [
                                postcssPresetEnv(), 
                                autoprefixer()
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.(gif|png|jpe?g|svg)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|otf|ttf)?$/,
                loader: 'base64-inline-loader'
            }
        ]
    },
    plugins: [
        new LodashWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './app_src/index.html'
        }),
        new MiniCssExtractPlugin()
    ]
};


const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash']
                    }
                }
            }, {
                test: /\.css$/,
                use: {
                    loader: 'file-loader'
                }
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                postcssPresetEnv(),
                                postcssCssnano(),
                                autoprefixer()
                            ]
                        }
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(gif|png|jpe?g|svg)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|otf|ttf)?$/,
                loader: 'base64-inline-loader'
            }
        ]
    },
    plugins: [
        new LodashWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './app_src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new MiniCssExtractPlugin()
    ]
};

function webpackOpt(env, argv) {
    const envConfig = (argv.mode === 'development') ? devConfig : prodConfig;
    return Object.assign({}, defaultConfig, envConfig);
}

module.exports = webpackOpt;