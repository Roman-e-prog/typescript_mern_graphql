import type {Config} from 'jest';
const config:Config = {
    verbose:true,
    preset: 'ts-jest',
    transform: {
        "^.+\\.ts$": "ts-jest",
        "^.+\\.tsx$": "ts-jest", 
        "^.+\\.js$": "babel-jest", 
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy" //for css imports jest not handles out of the box
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      moduleDirectories: ['node_modules', '<rootDir>/', 'src'],
      collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
      moduleFileExtensions: ['js', 'mjs', 'ts', 'tsx'],
      clearMocks: true,
};

export default config;