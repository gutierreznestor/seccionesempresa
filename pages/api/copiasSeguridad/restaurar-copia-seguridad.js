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
