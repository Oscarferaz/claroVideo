/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {
  coverageProvider: "v8",
  testEnvironment: 'jest-environment-jsdom', 
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Para JavaScript
  },
  setupFilesAfterEnv: ['./setupTests.js'],
};

export default config;
