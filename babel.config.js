module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-auto-route/plugin', { appDirectory: 'src' }],    
    'react-native-reanimated/plugin',
  ],
};
