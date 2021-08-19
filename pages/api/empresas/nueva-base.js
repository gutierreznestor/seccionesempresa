var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  try {
    const { DB } = req.body;
    const result = await query(
      `
      CREATE DATABASE ${DB};
      `,
    );
    return await res.status(201).json(result)
  } catch (error) {
    const message = error.message.includes('ER_DB_CREATE_EXISTS') ? `Ya existe una base con ese nombre.` : 'No se pudo editar el usuario.';
    return await res.status(400).json({ errorMessage: message })
  }
};

export default handler;