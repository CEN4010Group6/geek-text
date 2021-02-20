// custom.webpack.config.ts
import * as webpack from 'webpack';
// @ts-ignore
import ResourceHintWebpackPlugin from 'resource-hints-webpack-plugin';
import SriPlugin from 'webpack-subresource-integrity';
import DotenvPlugin from 'dotenv-webpack';

export default {
  plugins: [
    new DotenvPlugin({
      safe: true,
      systemvars: true
    }),
    new SriPlugin({
      hashFuncNames: [ 'sha256' ],
      enabled: process.env.NODE_ENV === 'production'
    }),
    new ResourceHintWebpackPlugin()
  ]
} as unknown as webpack.Configuration;
