import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const { db } = req.query;

  const dirRelativeToPublicFolder = db;

  const dir = path.resolve('./backups', dirRelativeToPublicFolder);

  const filenames = fs.readdirSync(dir);

  res.statusCode = 200;
  res.json(filenames);
}