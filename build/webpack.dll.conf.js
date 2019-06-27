const path = require('path')
const webpack = require('webpack')
let json = require('../package.json').dependencies
delete json.vue
delete json['vue-swiper-component']
json =  Object.keys(json)
json.push('vue/dist/vue.esm.js')

module.exports = {
  entry: {
    vendor: json
  },
  output: {
    path: path.join(__dirname, '../public/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}
