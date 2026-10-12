// Optimization of the illustrations: `npm run illustrations:optimize`. Two decimals: with one, the large curves move
// (the rim of the plate in ready.svg came out thicker on one side). With two, a render at 720px differs from the
// source in a few dozen pixels of 5 million. The view box stays, so the SVG scales to any size.
module.exports = {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
  ],
};
