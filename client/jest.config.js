module.exports = {
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/test/styleMock.js',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder },
    testEnvironmentOptions: {
        customExportConditions: [''],
    },
}