const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: ["./event/src/index.js"],

  output: {
    filename: "event.js",
    path: path.join(__dirname, "../", "build"),
  },

  resolve: {
    extensions: [".js", ".json"],
    modules: ["node_modules"],
  },

  plugins: [new MinifyPlugin({}, {})],

  module: {
    loaders: [
      {
        test: /\.(js)?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
};
