// custom.webpack.config.ts
import * as webpack from 'webpack';
// @ts-ignore
import ResourceHintWebpackPlugin from 'resource-hints-webpack-plugin';
import SriPlugin from 'webpack-subresource-integrity';

import * as dotenv from 'dotenv';

dotenv.config();

export default {
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      REST_API_ENTRYPOINT: process.env.REST_API_ENTRYPOINT
    }),
    new SriPlugin({
      hashFuncNames: [ 'sha256' ],
      enabled: process.env.NODE_ENV === 'production'
    }),
    new ResourceHintWebpackPlugin()
  ]
} as unknown as webpack.Configuration;
