import { createConfigItem } from "@babel/core";
import envPreset from "@babel/preset-env";
import objectRestSpreadPlugin from "@babel/plugin-proposal-object-rest-spread";
import transformAsyncToGeneratorPlugin from "@babel/plugin-transform-async-to-generator";
import transformRuntimePlugin from "@babel/plugin-transform-runtime";

export default () => ({
  presets: [createConfigItem(envPreset)],
  plugins: [
    createConfigItem(objectRestSpreadPlugin),
    createConfigItem(transformAsyncToGeneratorPlugin),
    createConfigItem(transformRuntimePlugin)
  ]
});
