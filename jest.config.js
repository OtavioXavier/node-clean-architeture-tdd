const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['**/*src/**/*.js'],
  watchPathIgnorePatterns: ['globalConfig', 'node_modules'],
  preset: '@shelf/jest-mongodb'
}

export default config
