#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import { exec } from "child_process";
import path from "path";
import build from "./build";

const mainDefinitions = [{ name: "command", defaultOption: true }];

const mainOptions = commandLineArgs(mainDefinitions, {
  stopAtFirstUnknown: true
});

const argv = mainOptions._unknown || [];

switch (mainOptions.command) {
  case "build":
    const buildDefinitions = [];
    const buildOptions = commandLineArgs(buildDefinitions, { argv });
    const startTime = new Date().getTime();
    build(buildOptions)
      .then(() => {
        console.log(`Succeeded in ${new Date().getTime() - startTime}ms`);
      })
      .catch(err => {
        console.trace(err);
        console.log(`Failed in ${new Date().getTime() - startTime}ms`);
      });
    break;
  case "node":
    const nodeDefinitions = [
      { name: "file", defaultOption: true, defaultValue: "src/index.js" }
    ];
    const nodeOptions = commandLineArgs(nodeDefinitions, { argv });
    const command = `node -r restry-scripts "${nodeOptions.file}"`;
    console.log(`restry-scripts development\n\t${command}`);
    exec(
      // "echo $HOME"
      command
    );
    break;
  default:
    console.log(`Unknown command '${mainOptions.command}'`);
    break;
}
