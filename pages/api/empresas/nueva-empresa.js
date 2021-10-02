var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  try {
    const { empresa, DB } = req.body;
    const result = await query(
      `
      INSERT INTO empresas(Nombre, DB) 
      VALUES (?, ?);
      `,
      [empresa, DB],
      'mainseccionesempresa',
    );
    return res.status(201).json(result)
  } catch (error) {
    return res.status(400).json({ errorMessage: error.message })
  }
};

export default handler;