const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const pkg = require('./package.json');
const libraryName = pkg.name;

module.exports = (env, options) => {
  const isDevMode = (options.mode !== 'production');

  const commonConfig = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: libraryName + (isDevMode ? '.js' : '.min.js'),
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
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
            MiniCssExtractPlugin.loader,
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
      new MiniCssExtractPlugin({
        filename: libraryName + (isDevMode ? '.css' : '.min.css'),
      }),
    ],
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js']
    }
  }

  const devConfig = {
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
    ],
  }

  return isDevMode ? merge(commonConfig, devConfig) : merge(commonConfig, productionConfig);
}