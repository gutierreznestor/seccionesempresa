import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const { db, fileName } = req.query;

  const dirRelativeToPublicFolder = `${db}/${fileName}`;

  const dir = path.resolve('./backups', dirRelativeToPublicFolder);

  const dataSql = fs.readFileSync(dir, 'utf-8').toString().replace(/\r|\n/g, '');
  res.status(200).json({ data: dataSql });
}