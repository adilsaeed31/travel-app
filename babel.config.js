module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@App': 'app',
          '@Api': 'app/api',
          '@Assets': 'app/assets',
          '@Components': 'app/components',
          '@Utils': 'app/utils',
          '@Context': 'app/context',
          '@Hooks': 'app/hooks',
          '@Features': 'app/features',
          '@Screens': 'app/screens',
          '@Navigations': 'app/navigations',
          '@Store': 'app/store',
        },
      },
    ],
  ],
}
