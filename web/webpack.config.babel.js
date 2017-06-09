import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import path from 'path';

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

function devtool(env) {
  if (env === DEVELOPMENT) {
    return 'cheap-module-eval-source-map';
  }
  if (env === PRODUCTION) {
    return 'source-map';
  }
  return 'source-map';
}

const entry = {
  app: './src/app/index',
};

function entryHtmls() {
  return Object.keys(entry).map((key) => {
    const name = key === 'app' ? 'index' : key;
    return new HtmlWebpackPlugin({
      template: 'src/template/index.hbs',
      chunks: [key],
      filename: `../${name}.html`,
      alwaysWriteToDisk: true,
    });
  });
}

// Define the plugins for the webpack pipeline
function plugins(env) {
  const define = { 'process.env': { NODE_ENV: JSON.stringify(env) } };

  const config = [
    new webpack.DefinePlugin(define),
    new webpack.NoEmitOnErrorsPlugin(),
  ];
  entryHtmls().forEach(e => config.push(e));
  config.push(new HtmlWebpackHarddiskPlugin());

  // Remove the commond vendor code from all modules and move it into the vendors.js chunk
  config.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
  }));
  return config;
}

// Webpack dev server settings for local development environment
const devServer = {
  proxy: {
    '/api': 'http://localhost:3000',
  },
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  port: 7000,
  publicPath: '/js',
  historyApiFallback: true,
  hot: true,
  https: false,
  noInfo: true,
};

// Configure webpack
export default () => {
  // Need to set a ENV for the build ('development', 'production')
  const ENV = process.env.ENV || 'development';
  return {
    entry,
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: '[name].bundle.js',
      publicPath: '/js/',
    },
    module: {
      rules: [
        {
          // Enable loading of code using JSX and ES2016
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: [
              ['es2015', { modules: false }],
              'react',
              'flow',
            ],
            plugins: [
              'transform-class-properties',
            ],
          },
        },
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src'),
      ],
      extensions: ['.js', '.jsx'],
    },
    devtool: devtool(ENV),
    target: 'web',
    stats: 'minimal',
    devServer,
    plugins: plugins(),
  };
};
