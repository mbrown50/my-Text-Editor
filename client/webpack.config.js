const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// Require the GenerateSW class of the WorkBoxPlugin 
const WorkboxPlugin = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. - done
// added Webpack Plugin, MiniCssExtractPlugin - done, extra
// TODO: Add CSS loaders and babel to webpack. - done

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    devServer: {
      // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
      hot: 'only',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new WorkboxPlugin.GenerateSW({
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        // Define runtime caching rules.
        runtimeCaching: [{
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          // Apply a cache-first strategy.
          handler: 'CacheFirst',

          options: {
            // Use a custom cache name.
            cacheName: 'images',

            // Only cache 2 images.
            expiration: {
              maxEntries: 2,
            },
          },
        },
        ],
      }),
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        /*
        icons: [
          {
            src: path.resolve('assets/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        */
      }),
      new HtmlWebpackPlugin({
        title: 'Hot Module Reloading',
        template: './index.html',
      }),
      new MiniCssExtractPlugin(),
      /*new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }), 
      */
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
};
