// seravo server doesn't support proper paths for SPAs
// so need to copy the index.html folder all over the place

const fs = require('fs-extra');
const index = fs.readFileSync('build/index.html');
const stories = './src/data/stories.csv';

const storiesCount = fs
  .readFileSync(stories, 'utf8')
  .split('\n')
  .reduce((curr, line) => {
    const id = parseInt(line.split(',')[0]);
    if (!isNaN(id) && id > curr) {
      return id;
    }
    return curr;
  }, 0);

const dirs = [
  'build/articles',
  'build/about',
  'build/downloads',
  'build/stories',
]
  .concat(
    new Array(storiesCount)
      .fill(null, 0, storiesCount)
      .map((_, i) => 'build/articles/' + (i + 1)),
  )
  .concat(
    new Array(storiesCount)
      .fill(null, 0, storiesCount)
      .map((_, i) => 'build/stories/' + (i + 1)),
  );

dirs.forEach(dir => {
  fs.mkdirpSync(dir);
  fs.writeFileSync(dir + '/index.html', index);
});
