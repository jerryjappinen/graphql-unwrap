const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, './'),

  setupFilesAfterEnv: [
    './spec/setup.js'
  ],

  coverageDirectory: '<rootDir>/coverage'
}
