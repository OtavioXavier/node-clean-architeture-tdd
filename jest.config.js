module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/src/**/*.js', '**/src/main/**'],
  watchPathIgnorePatterns: ['globalConfig', 'node_modules'],
  preset: '@shelf/jest-mongodb'
}
