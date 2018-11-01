const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
  const isDevMode = (options.mode !== 'production');

  const commonConfig = {
    entry: {
      diacart: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'diacart.[hash].js'
    },
    module: {
      rules: [{
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader",
            options: {
              minimize: true
            }
          }]
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin([
        'dist',
        'build'
      ]),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    ],
  }

  const devConfig = {
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'source-map',
    devServer: {
      hot: true,
      compress: true,
      port: 9000
    }
  };

  const productionConfig = {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        },
        chunks: "all"
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'diacart.[hash].css',
      }),
    ],
  }

  return isDevMode ? merge(commonConfig, devConfig) : merge(commonConfig, productionConfig);
}