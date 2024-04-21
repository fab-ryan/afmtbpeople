// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'svg',
];

module.exports = config;
