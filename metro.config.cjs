
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  alias: {
    '@': __dirname,
  },
  sourceExts: [...config.resolver.sourceExts, 'cjs', 'mjs'],
};

module.exports = config;
