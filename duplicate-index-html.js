// seravo server doesn't support proper paths for SPAs
// so need to copy the index.html folder all over the place

const fs = require('fs-extra');
const index = fs.readFileSync('build/index.html');

const dirs = [
  'build/articles',
  'build/about',
  'build/downloads',
  'build/stories',
]
  .concat(
    // there are thirty-one articles
    new Array(31).fill(null, 0, 31).map((_, i) => 'build/articles/' + (i + 1)),
  )
  .concat(
    new Array(31).fill(null, 0, 31).map((_, i) => 'build/stories/' + (i + 1)),
  );

dirs.forEach(dir => {
  fs.mkdirpSync(dir);
  fs.writeFileSync(dir + '/index.html', index);
});
