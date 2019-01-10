import * as babel from "@babel/core";
import fs from "fs";
import path from "path";
import babelConfig from "../babel-config";
import glob from "./util/glob";
import exec from "./util/exec";

export default async ({ srcDir = "src", libDir = "lib" }) => {
  const matches = await glob(`${srcDir}/**/*.js`, {
    ignore: ["**/__tests__/**", "**/*.test.js"]
  });
  await exec(`mkdir -p ${libDir}`);
  await Promise.all(
    matches.map(match => {
      const destination = path.join(libDir, path.relative(srcDir, match));
      babel
        .transformFileAsync(match, babelConfig)
        .then(
          ({ code }) =>
            new Promise(resolve => {
              fs.writeFile(destination, code, err => {
                if (err) {
                  console.log(`${match} -> ${destination} FAILED`);
                  console.log(err);
                  resolve();
                  return;
                }
                resolve();
                console.log(`${match} -> ${destination}`);
              });
            })
        )
        .catch(err => {
          // Log the error for the use to debug
          console.error(err.message);
        });
    })
  );
};
