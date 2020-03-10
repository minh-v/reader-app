//configure to use presets so we don't need to specify every time
const presets = [["@babel/preset-env"]];
const plugins = [["@babel/plugin-transform-runtime"]];

//export config object
module.exports = { presets, plugins };
