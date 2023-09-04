/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: 'com.brainshaker95.update_test',
  productName: 'Update Test',
  icon: 'static/logo.png',
  asar: false,
  directories: {
    output: 'dist',
  },
  files: [
    'src/electron/main.cjs',
    'src/electron/preload.cjs',
    'src/electron/update.cjs',
    {
      from: 'build',
      to: '',
    },
    {
      from: 'resources/app',
      to: '',
    },
  ],
};
