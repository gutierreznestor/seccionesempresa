import makeDir from '../../../helpers/makeDir';

var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();


const handler = async (req, res) => {
  const { db } = req.body
  try {
    if (!db) {
      return res
        .status(400)
        .json({ errorMessage: 'Ingrese el nombre de la base' })
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const fileName = `${year}-${month}-${day}-${hour}-${minute}.sql`;
    const folderPath = `./backups/${db}`;
    const filePath = `./backups/${db}/${fileName}`;
    await makeDir(folderPath);
    tool.dumpDatabase({
      host: 'localhost',
      user: 'root',
      password: '',
      dumpPath: filePath,
      database: db,
    }, function (error, output, message, dumpFileName) {
      if (error instanceof Error) {
        return res
          .status(400)
          .json({ errorMessage: error.message })
      }
      return res
        .status(200)
        .json({
          message: 'Se generó una copia de seguridad.',
          fileName,
        });
    });
  } catch (e) {
    return res
      .status(400)
      .json({ errorMessage: e.message });
  }
}

export default handler;
