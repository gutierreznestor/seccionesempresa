import searchText from '../../../helpers/searchText';

var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();

const handler = async (req, res) => {
  const { db, fileName } = req.body;
  try {
    if (!db) {
      return res
        .status(400)
        .json({ errorMessage: 'Ingrese el nombre de la base' })
    }
    if (!fileName) {
      return res.status(400).json({ errorMessage: 'Ingrese el nombre del archivo sql' });
    }
    const filePath = `./backups/${db}/${fileName}`;
    const currentDb = `Database: ${db}`;
    const match = await searchText(filePath, currentDb);
    if (match === 0) {
      return res.status(400).json({ errorMessage: 'No se puede restaurar una base distinta a la actual.' });
    }
    tool.restoreDatabase({
      host: 'localhost',
      user: 'root',
      password: '',
      sqlFilePath: filePath,
      database: db,
    }, function (error, output, message) {
      if (error instanceof Error) {
        return res.status(400).json({ errorMessage: error.message })
      }
    });
    return res.status(200).json({
      message: 'La copia de seguridad se restauró correctamente.',
      fileName,
    });
  } catch (e) {
    res.status(400).json({ errorMessage: e.message })
  }
}

export default handler;
