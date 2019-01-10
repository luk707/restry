module.exports = {
  presets: ["@babel/env"],
  plugins: [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "@babel/transform-async-to-generator",
    "@babel/transform-runtime"
  ]
};
