var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  const { DB } = req.body;
  try {
    await query(
      `
      INSERT INTO secciones_empresa (Nombre) VALUES
      (?), (?), (?), (?);
      `,
      ['Dirección', 'Administración', 'Ventas', 'Producción'],
      DB,
    );
    await query(
      `
      INSERT INTO secciones_empresa (Nombre) VALUES
      (?), (?), (?), (?);
      `,
      ['Dirección', 'Administración', 'Ventas', 'Producción'],
      DB,
    );
    await query(
      `
      INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
        (?, ?, ?, ?);
      `,
      ['admin', 'Facundo', 'Lisandro', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'],
      DB,
    );
    await query(
      `
      INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
        (?, ?, ?, ?);
      `,
      ['auditor', 'Stella', 'Ramos', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'],
      DB,
    );
    await query(
      `
      INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
        (?, ?, ?, ?);
      `,
      ['supervisor', 'Agustina', 'Taborda', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'],
      DB,
    );
    await query(
      `
      INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
        (?, ?, ?, ?);
      `,
      ['test', 'Paulo', 'Ayala', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'],
      DB,
    );
    return await res.status(201).json({
      message: 'Datos agregados correctamente.'
    })
  } catch (error) {
    return await res.status(400).json({ errorMessage: error.message })
  }
};

export default handler;