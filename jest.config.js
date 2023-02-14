// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/shared/**/*.ts(x)?',
    '!src/shared/assets/**',
    //  '!src/shared/pages/**',
    '!src/shared/themes/**',
    //  '!src/shared/**/types/**',
    '!src/shared/**/styles.ts'
  ],

  moduleNameMapper: {
    '@/mocks': '<rootDir>/src/__test__/mocks',
    '@/providers': '<rootDir>/src/__test__/providers',
    '@/components': '<rootDir>/src/shared/components',
    '@/themes': '<rootDir>/src/shared/themes',
    '@/contexts': '<rootDir>/src/shared/contexts',
    // '@/config/(.*)$': '<rootDir>/src/shared/config/$1',
    '@/layouts': '<rootDir>/src/shared/layouts',
    '@/services': '<rootDir>/src/shared/services',
    '@/hooks': '<rootDir>/src/shared/hooks',
    // '@/utils': '<rootDir>/src/shared/utils',
    // '@/slices/(.*)$': '<rootDir>/src/shared/slices/$1'
  },
  testEnvironment: 'jest-environment-jsdom'
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)