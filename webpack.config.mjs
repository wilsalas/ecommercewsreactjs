import 'dotenv/config';
import webpack from 'webpack';
import * as path from 'path';
import { merge } from 'webpack-merge';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import appConfig from './app.config.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commonConfig = {
  target: ['web', 'es5'],
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: 'fonts/OpenSans/[name].[ext]',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash]-[name].[ext]',
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
          fallback: {
            crypto: false,
          },
        },
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      url: false,
    },
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        appName: appConfig.name,
        appSelector: appConfig.appSelector,
      },
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) }),
  ],
};

const developmentConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    compress: true,
    port: appConfig.dev.port,
    historyApiFallback: true,
  },
};

const productionConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default (env, { mode }) => {
  const allowedModes = {
    [developmentConfig.mode]: developmentConfig,
    [productionConfig.mode]: productionConfig,
  };
  if (!allowedModes[mode]) {
    throw new Error(`Unsupported mode: ${mode}`);
  }
  return merge(commonConfig, allowedModes[mode]);
};
