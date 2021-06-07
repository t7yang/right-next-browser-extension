module.exports = {
  verbose: true,
  sourceDir: './src',
  run: {
    firefox: 'firefoxdeveloperedition',
    target: ['firefox-desktop'],
    startUrl: ['about:debugging#/runtime/this-firefox'],
  },
};
