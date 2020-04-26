module.exports = {

  setupFiles: [
    "./tests/setup.js"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js", "json", "jsx", "ts", "tsx", "node", "vue"
  ],

  transform: {
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "vue-jest",
    // process js with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },

   transformIgnorePatterns: [
     "/node_modules/(?!vuetify|vue-map-chart)"
   ],

  preset: '@vue/cli-plugin-unit-jest'
}
