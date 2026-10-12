// Optimization of the illustrations: `npm run illustrations:optimize`. One decimal is enough at 720px and the art is
// the same pixel for pixel (checked at 360 and 720). The view box stays, so the SVG scales to any size.
module.exports = {
  multipass: true,
  floatPrecision: 1,
  plugins: [
    { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
  ],
};
