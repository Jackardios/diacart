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
    entry: ['./example/index.js'],
    output: {
      path: path.resolve(__dirname, 'example-build'),
      filename: 'build.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
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
          use: [
            {
              loader: "html-loader",
              options: { minimize: !isDevMode }
            }
          ]
        },
        {
          test: /\.art$/,
          loader: "art-template-loader",
          options: {
            // art-template options (if necessary)
            // @see https://github.com/aui/art-template
            minimize: !isDevMode,
            htmlMinifierOptions: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                // automatically merged at runtime: rules.map(rule => rule.test)
                ignoreCustomFragments: []
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([
        'example-build',
      ]),
    ],
  }

  const devConfig = {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        filename: "index.html",
        template: "./example/index.html",
      }),
      new HtmlWebPackPlugin({
        filename: "cart.html",
        template: "./example/cart.html",
      }),
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
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new MiniCssExtractPlugin({
        filename: 'diamodal.css',
      }),
    ],
  }

  return isDevMode ? merge(commonConfig, devConfig) : merge(commonConfig, productionConfig);
}