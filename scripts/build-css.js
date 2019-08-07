const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

async function sassRender(options) {
  return new Promise((resolve, reject) => {
    sass.render(options, (err, d) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(d.css.toString());
    });
  });
}

function writeCss(file, text) {
  fs.writeFileSync(file.replace('/crude-ui/src', '/crude-ui/lib'), text);
  fs.writeFileSync(file.replace('/crude-ui/src', '/crude-ui/es'), text);
}

function walkCss(dir) {
  dir = dir || '.';
  const directory = path.join(__dirname, '../src', dir);

  fs.readdirSync(directory)
    .forEach(async (file) => {
      const fullpath = path.join(directory, file);
      const stat = fs.statSync(fullpath);

      if (stat.isFile() && file.indexOf('.scss') > 0) {
        const sassText = fs.readFileSync(fullpath).toString();
        const cssText = await sassRender({ file: fullpath, data: sassText });

        const sassFile = path.resolve(directory, file);
        const cssFile = sassFile.replace(/.scss$/, '.css');

        writeCss(sassFile, sassText);

        postcss([autoprefixer()])
          .process(cssText)
          .then((result) => {
            writeCss(cssFile, result.css);
          })
          .catch(e => console.error(e));
      } else if (stat.isDirectory()) {
        const subdir = path.join(dir, file);
        walkCss(subdir);
      }
    });
}


function walkJs(dir) {
  dir = dir || '.';
  const directory = path.join(__dirname, dir);

  fs.readdirSync(directory)
    .forEach(async (file) => {
      const fullpath = path.join(directory, file);
      const stat = fs.statSync(fullpath);
      if (/style\/index.js$/.test(fullpath)) {
        const fileText = fs.readFileSync(fullpath).toString().replace(/.scss/g, '.css');
        fs.writeFileSync(fullpath.replace(/index.js$/, 'css.js'), fileText);
      } else if (stat.isDirectory()) {
        const subdir = path.join(dir, file);
        walkJs(subdir);
      }
    });
}

module.exports = () => {
  walkCss();
  walkJs('../lib');
  walkJs('../es');
};
