const path = require('path');

module.exports = {
  resolve: {
    fallback: {"fs": false},
    fallback: { "stream": require.resolve("stream/") },
    fallback: { "string_decoder": require.resolve("string_decoder/") },
    fallback: { "net": require.resolve("net/") },
    fallback: { "tls": require.resolve("tls/") },
    fallback: { "url": require.resolve("url/") },
    fallback: { "assert": require.resolve("assert/") },
    fallback: { "buffer": require.resolve("buffer/") },
    fallback: { "crypto": require.resolve("crypto-browserify") },
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jp[e]?g$|\.png$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
        ],
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};