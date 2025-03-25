const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
}

module.exports = createJestConfig(customJestConfig)
