module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1"
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'app'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
