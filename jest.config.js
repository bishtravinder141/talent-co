let config = "";
export default config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "^.+\\.(jpg|jpeg)$": "identity-obj-proxy",
  },
  setupFiles: ["jest-google-maps-mock"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};