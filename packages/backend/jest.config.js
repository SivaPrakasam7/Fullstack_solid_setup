/* eslint-disable @typescript-eslint/no-require-imports */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ['<rootDir>'],
    testTimeout: 50000,
};
