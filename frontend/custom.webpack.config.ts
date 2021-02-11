// custom.webpack.config.ts

import * as webpack from 'webpack';
import TerserWebpackPlugin from 'terser-webpack-plugin';
// @ts-ignore
import ResourceHintWebpackPlugin from 'resource-hints-webpack-plugin';
import SriPlugin from 'webpack-subresource-integrity';

export default {
  output: {
    chunkFilename: '[id].js',
    crossOriginLoading: 'anonymous'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /node_modules/,
      })
    ],
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      REST_API_ENTRYPOINT: process.env.REST_API_ENTRYPOINT || '/api'
    }),
    new SriPlugin({
      hashFuncNames: [ 'sha256' ],
      enabled: process.env.NODE_ENV === 'production'
    }),
    new ResourceHintWebpackPlugin()
  ]
} as unknown as webpack.Configuration;
