import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const packageJson = require('./package.json');
const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);

function globals() {
  return {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
}

function baseConfig() {
  return {
    input: 'src/index.js',
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: 'dist/crudeui.css' // 输出路径
      }),
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/env',
            {
              loose: true,
              shippedProposals: true,
              modules: false,
              targets: {
                ie: 9
              }
            }
          ],
          '@babel/react'
        ]
      })
    ]
  };
}

function baseUmdConfig(minified) {
  const config = Object.assign(baseConfig(), {
    external: peerDependencies,
  });
  config.plugins.push(replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));

  if (minified) {
    config.plugins.push(minify({ comments: false }));
  }

  return config;
}

const libConfig = baseConfig();
libConfig.external = peerDependencies.concat(dependencies);
libConfig.output = [
  { sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.cjs.js', format: 'cjs' },
  { sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.es.js', format: 'es' },
];

const umdFullConfig = baseUmdConfig(false);
umdFullConfig.output = [
  { globals: globals(), sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.full.js', format: 'umd' },
];

const missingGlobals = peerDependencies.filter(dep => !(dep in globals()));
if (missingGlobals.length) {
  console.error('All peer dependencies need to be mentioned in globals, please update rollup.config.js.');
  console.error('Missing: ' + missingGlobals.join(', '));
  console.error('Aborting build.');
  process.exit(1);
}

const umdFullConfigMin = baseUmdConfig(true);
umdFullConfigMin.output = [
  { globals: globals(), sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.full.min.js', format: 'umd' },
];

const external = umdFullConfig.external.slice();

const allGlobals = Object.assign({}, globals(), {});

const umdConfig = baseUmdConfig(false);
umdConfig.external = external;
umdConfig.output = [
  { globals: allGlobals, sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.js', format: 'umd' },
];

const umdConfigMin = baseUmdConfig(true);
umdConfigMin.external = external;
umdConfigMin.output = [
  { globals: allGlobals, sourcemap: true, name: 'Crudeui', file: 'dist/crudeui.min.js', format: 'umd' },
];

export default [
  libConfig,
  umdFullConfig,
  umdFullConfigMin,
  umdConfig,
  umdConfigMin,
];