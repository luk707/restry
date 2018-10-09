import * as babel from "@babel/core";
import fs from "fs";
import path from "path";
import glob from "./util/glob";
import babelConfig from "./babel-config";

export default async ({ srcDir = "src", libDir = "lib" }) => {
  const matches = await glob(`${srcDir}/**/*.js`, {
    ignore: ["**/__tests__/**", "**/*.test.js"]
  });
  await Promise.all(
    matches.map(match =>
      babel
        .transformFileAsync(match, babelConfig({ srcDir }))
        .then(({ code }) => {
          const destination = path.join(libDir, path.relative(srcDir, match));
          console.log(`${match} -> ${destination}`);
          console.log(code);
        })
    )
  );
};
