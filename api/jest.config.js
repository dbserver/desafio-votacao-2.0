/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/integration/testSetup.ts'],
  maxWorkers: 1
};