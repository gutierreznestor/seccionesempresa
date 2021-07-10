import mysqldump from 'mysqldump';
import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { db } = req.body
  try {
    if (!db) {
      return res
        .status(400)
        .json({ errorMessage: 'Ingrese el nombre de la base' })
    }

    const date = new Date();
    const filename = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes();

    const result = await mysqldump({
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: db,
      },
      dumpToFile: `./backups/${db}/${filename}.sql`,
    });

    return res.json(result)
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler;
