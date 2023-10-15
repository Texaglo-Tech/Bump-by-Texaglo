/**
 * @prettier
 */

const path = require("path")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {
  HtmlWebpackSkipAssetsPlugin,
} = require("html-webpack-skip-assets-plugin")

const configBuilder = require("./_config-builder")
const styleConfig = require("./stylesheets")

const projectBasePath = path.join(__dirname, "../")
const isDevelopment = process.env.NODE_ENV !== "production"

const devConfig = configBuilder(
  {
    minimize: false,
    mangle: false,
    sourcemaps: true,
    includeDependencies: true,
  },
  {
    mode: "development",
    entry: {
      "swagger-ui-bundle": ["./src/core/index.js"],
      "swagger-ui-standalone-preset": [
        "./src/standalone/presets/standalone/index.js",
      ],
      "swagger-ui": "./src/style/main.scss",
      vendors: ["react-refresh/runtime"],
    },

    performance: {
      hints: false,
    },   

    output: {
      filename: "[name].js",
      chunkFilename: "[id].js",
      library: {
        name: "[name]",
        export: "default",
      },
      publicPath: "/",
    },

    devServer: {
      allowedHosts: "all", // for development within VMs
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
      port: 3200,
      host: "0.0.0.0",
      hot: true,
      static: {
        directory: path.resolve(projectBasePath, "dev-helpers"),
        publicPath: "/",
      },
      client: {
        logging: "info",
        progress: true,
      },
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.join(projectBasePath, "src"),
            path.join(projectBasePath, "node_modules", "object-assign-deep"),
          ],
          loader: "babel-loader",
          options: {
            retainLines: true,
            cacheDirectory: true,
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        // Additional configuration to handle *.css files
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(txt|yaml)$/,
          type: "asset/source",
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          type: "asset/inline",
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false, // disable the behaviour
          },
        },
      ],
    },

    resolve: {
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        "assert": require.resolve("assert"),
        "url": require.resolve("url")
      } 
    },

    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin({ library: "[name]" }),
      new HtmlWebpackPlugin({
        template: path.join(projectBasePath, "dev-helpers", "index.html"),
      }),
      new HtmlWebpackSkipAssetsPlugin({
        skipAssets: [/swagger-ui\.js/],
      }),
    ].filter(Boolean),

    optimization: {
      runtimeChunk: "single", // for multiple entry points using ReactRefreshWebpackPlugin
    },
  }
)

// mix in the style config's plugins and loader rules

devConfig.plugins = [...devConfig.plugins, ...styleConfig.plugins]

devConfig.module.rules = [
  ...devConfig.module.rules,
  ...styleConfig.module.rules,
]

module.exports = devConfig
