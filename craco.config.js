const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  reactScriptsVersion: "react-scripts",
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ["node_modules", "src/assets"],
        },
      },
    },
    postcss: {
      plugins: [require("postcss-rtl")()],
    },
  },
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/common"),
      "@layouts": path.resolve(__dirname, "src/components/layouts"),
      "@store": path.resolve(__dirname, "src/redux"),
      "@styles": path.resolve(__dirname, "src/assets/scss"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@utils": path.resolve(__dirname, "src/utility/Utils"),
      "@hooks": path.resolve(__dirname, "src/utility/hooks"),
    },
    configure: (webpackConfig, { env, paths }) => {
      if (process.env.NODE_ENV === "production") {
        webpackConfig.plugins.push(
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify("production"),
            },
          }),
          new webpack.optimize.OccurrenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks,
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                passes: 2,
                toplevel: true,
                dead_code: true,
              },
              mangle: true,
              toplevel: false,
              keep_fnames: false,
              comments: false,
              parallel: true,
              output: {
                comments: false,
              },
            },
          }),
          new TerserPlugin(),
          new CssMinimizerPlugin({
            parallel: true,
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          })
        );
      }
      console.log(webpackConfig);
      return webpackConfig;
    },
  },
};
