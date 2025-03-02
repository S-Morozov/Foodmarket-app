// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Настроим алиас для @
config.resolver = {
  ...config.resolver,
  alias: {
    '@': __dirname, // Update to point to your src or main directory
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs', 'mjs'],
};

module.exports = config;
