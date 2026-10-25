// PEDS GitHub Pages deploy helper
// Usage:
//   npm run build
//   npm run deploy -- <branch> [subpath]
//   e.g. npm run deploy -- main          -> served at https://<user>.github.io/<repo>/
//        npm run deploy -- main peds      -> served at https://<user>.github.io/<repo>/peds/
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const branch = process.argv[2] ?? "main";
const subpath = process.argv[3] ?? "";
const repoRoot = process.cwd();
const distDir = path.resolve(repoRoot, "dist");

const distOut = path.join(distDir, subpath);

if (subpath) {
  if (fs.existsSync(distOut)) fs.rmSync(distOut, { recursive: true, force: true });
  fs.mkdirSync(distOut, { recursive: true });
  for (const entry of fs.readdirSync(distDir)) {
    const src = path.join(distDir, entry);
    const dst = path.join(distOut, entry);
    if (fs.statSync(src).isDirectory()) {
      fs.cpSync(src, dst, { recursive: true });
    } else {
      fs.copyFileSync(src, dst);
    }
  }
}

process.chdir(subpath ? distOut : distDir);
execSync("npx gh-pages -d . -b " + branch + " --no-git", { stdio: "inherit", env: { ...process.env, GH_BRANCH: branch } });
