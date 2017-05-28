var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

// This var disables the extraction when in development
const extractSass = new extractTextPlugin({
    //filename: "[name].[contenthash].css", // This generates a name with the same name of entry down below and a random hash
    filename: "generatedStyle.css", // this is the name of the css generated file that will be called in index.html as a link
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            //scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            scss: extractSass.extract({
              use: 'css-loader!sass-loader',
              fallback: 'vue-style-loader'
            }),
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
          // other vue-loader options go here
        }
      },
      // This part of code is to trying to use an static .css or .scss file into modules
      // but at this time it doesnt work, 
      {
        test: /\.scss$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            scss: extractSass.extract({
              use: 'css-loader!sass-loader',
              fallback: 'style-loader'
            }),
          }
        }
        // test: /\.scss$/,
        // use: extractSass.extract({
        //   fallback: 'vue-style-loader',
        //   // use: 'css-loader!sass-loader',
        //   use: [{
        //     loader: "css-loader"
        //   }, {
        //     loader: "sass-loader"
        //   }]
        // })
        // loader: extractTextPlugin.extract(
        //     'style-loader', // backup loader when not building .css
        //     'css-loader!sass-loader' // loaders to preprocess css
        //   )
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  },
  plugins: [
    extractSass
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
