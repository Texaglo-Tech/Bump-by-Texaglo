/**
 * @prettier
 */

const configBuilder = require("./_config-builder")

const result = configBuilder(
  {
    minimize: true,
    mangle: true,
    sourcemaps: true,
    includeDependencies: false,
  },
  {
    entry: {
      "swagger-ui": ["./src/index.js"],
    },

    output: {
      globalObject: "this",
      library: {
        name: "SwaggerUICore",
        export: "default",
      },
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
  }
)

module.exports = result
