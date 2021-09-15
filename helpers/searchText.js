import fs from 'fs';

const searchText = (filePath, text) => {
  const file = fs.readFileSync(filePath, 'utf8');
  const regExp = new RegExp(text, 'g');
  const matches = file.match(regExp);
  return matches ? matches.length : 0;
};

export default searchText;
