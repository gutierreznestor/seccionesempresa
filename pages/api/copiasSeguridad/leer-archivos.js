import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const { db } = req.query;

  const dirRelativeToPublicFolder = db;
  try {
    const dir = path.resolve('./backups', dirRelativeToPublicFolder);
    const filenames = fs.readdirSync(dir);
    res.status(200).json(filenames);
  } catch (error) {
    res.status(404).json({ errorMessage: 'No se encontró la carpeta o no se realizaron copias de seguridad' });
  }
}