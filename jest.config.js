export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Handle styling, to be removed once css files are removed
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!src/*.d.ts'],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
