import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: __dirname,
});

const config: Config = {
  rootDir: __dirname,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^lucide-react$": "<rootDir>/node_modules/lucide-react/dist/cjs/lucide-react.js",
  },
  setupFiles: ["<rootDir>/jest.polyfill.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./src/engine/**/*.ts": {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};

export default createJestConfig(config);
