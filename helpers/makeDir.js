import fs from 'fs';

const makeDir = (root) => {
  return fs.promises.mkdir(root, { recursive: true })
}

export default makeDir;
