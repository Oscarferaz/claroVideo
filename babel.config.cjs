module.exports = {
  presets: [
    '@babel/preset-env', 
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ],
  // Si necesitas otros ajustes o plugins, añádelos aquí.
};
