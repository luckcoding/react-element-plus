const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const getConfig = require('./config');
const buildCss = require('./build-css');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '../components');

const libRoot = path.join(__dirname, '../lib');
const distRoot = path.join(__dirname, '../dist');
const esRoot = path.join(__dirname, '../es');

const clean = () => {
  fse.existsSync(libRoot) && fse.removeSync(libRoot);
  fse.existsSync(distRoot) && fse.removeSync(distRoot);
  fse.existsSync(esRoot) && fse.removeSync(esRoot);
};

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = cmd => execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = t => !targets.length || targets.includes(t);

const babel = (outDir, envName) => shell(
  `yarn babel ${srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`,
);
/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', async () => {
  await babel(libRoot, 'cjs');
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await babel(esRoot, 'esm');
});

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildDist = step(
  'browser distributable',
  () => new Promise((resolve, reject) => {
    webpack(
      [getConfig(distRoot, false), getConfig(distRoot, true)],
      async (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(err || stats.toJson().errors);
          return;
        }
        resolve();
      },
    );
  }),
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

clean();

Promise.all([
  has('lib') && buildLib(),
  has('es') && buildEsm(),
  has('dist') && buildDist(),
]).then(buildCss).catch((err) => {
  if (err) console.error(red(err.stack || err.toString()));
  process.exit(1);
});
