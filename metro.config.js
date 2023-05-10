/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    extraNodeModules: {
      '@App': `${__dirname}/app`,
      '@Api': `${__dirname}/app/api`,
      '@Assets': `${__dirname}/app/assets`,
      '@Components': `${__dirname}/app/components`,
      '@Utils': `${__dirname}/app/utils`,
      '@Context': `${__dirname}/app/context`,
      '@Hooks': `${__dirname}/app/hooks`,
      '@Features': `${__dirname}/app/features`,
      '@Screens': `${__dirname}/app/screens`,
      '@Store': `${__dirname}/app/store`,
      '@Navigations': `${__dirname}/app/navigations`,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}
