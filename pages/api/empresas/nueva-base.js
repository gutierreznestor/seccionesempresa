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
      null,
      null,
    );
    res.status(201).json(result)
  } catch (error) {
    const message = error.message.includes('ER_DB_CREATE_EXISTS') ?
      `Ya existe una base con ese nombre.` :
      error.message;
    res.status(400).json({ errorMessage: message })
  }
};

export default handler;