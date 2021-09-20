var MysqlTools = require('mysql-tools');
var tool = new MysqlTools();

import { query } from '../../../lib/db';

const handler = async (req, res) => {
  try {
    const { DB } = req.body;
    await query(
      `
      CREATE TABLE IF NOT EXISTS secciones_empresa (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        Descripcion TEXT,
        idSeccionEmpresa INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS empleados (
        Apellido VARCHAR(50) NOT NULL,
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
        idSeccionEmpresa INT NOT NULL,
        Nombre VARCHAR(50) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE empleados 
      ADD FOREIGN KEY (idSeccionEmpresa)
      REFERENCES secciones_empresa(idSeccionEmpresa);
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS usuarios (
        Apellido VARCHAR(50) NOT NULL,
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idUsuario INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL,
        Usuario VARCHAR(50) UNIQUE NOT NULL,
        Password VARCHAR(64) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS perfiles (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idPerfil INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS usuarios_tiene_perfiles (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idPerfil INT NOT NULL DEFAULT 4,
        idUsuario INT NOT NULL,
        idUsuarioPerfil INT AUTO_INCREMENT PRIMARY KEY
      );
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS logs_usuarios (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idLogUsuario INT AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT NOT NULL,
        Operacion VARCHAR(50) NOT NULL,
        Descripcion VARCHAR(200) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE logs_usuarios 
      ADD FOREIGN KEY (idUsuario)
      REFERENCES usuarios(idUsuario);
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS logs_empleados (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idLogEmpleado INT AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT NOT NULL,
        Operacion VARCHAR(50) NOT NULL,
        Descripcion VARCHAR(200) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE logs_empleados 
      ADD FOREIGN KEY (idUsuario)
      REFERENCES usuarios(idUsuario);
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS logs_secciones_empresa (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idLogSeccionEmpresa INT AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT NOT NULL,
        Operacion VARCHAR(50) NOT NULL,
        Descripcion VARCHAR(200) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE logs_secciones_empresa 
      ADD FOREIGN KEY (idUsuario)
      REFERENCES usuarios(idUsuario);
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS logs_perfiles (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        idLogPerfil INT AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT NOT NULL,
        Operacion VARCHAR(50) NOT NULL,
        Descripcion VARCHAR(200) NOT NULL
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE logs_perfiles 
      ADD FOREIGN KEY (idUsuario)
      REFERENCES usuarios(idUsuario);
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS plan_cuentas (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CodigoPlan VARCHAR(20) UNIQUE NOT NULL,
        idPlanCuenta INT AUTO_INCREMENT PRIMARY KEY,
        Nivel INT,
        Nombre VARCHAR(35) NOT NULL,
        Tipo INT
      );
      `,
      null,
      DB,
    );
    await query(
      `
      CREATE TABLE IF NOT EXISTS asientos (
        Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        Numero INT ,
        TipoAsiento INT,
        Renglon INT NOT NULL,
        idPlanCuenta INT NOT NULL,
        FechaVencimiento DATE,
        FechaOperacion DATE,
        Comprobante VARCHAR(20),
        DebeHaber INT,
        Importe FLOAT NOT NULL,
        Leyenda VARCHAR(30),
        OkCarga INT,
        Registrado INT,
        PRIMARY KEY (Numero, Renglon)
      );
      `,
      null,
      DB,
    );
    await query(
      `
      ALTER TABLE asientos 
      ADD FOREIGN KEY (idPlanCuenta)
      REFERENCES plan_cuentas(idPlanCuenta);
      `,
      null,
      DB,
    );
    return await res.status(201).json({ message: 'Tablas creadas correcamente.' })
  } catch (error) {
    const message = error.message.includes('ER_DB_CREATE_EXISTS') ? `Ya existe una base con ese nombre.` : error.message;
    return await res.status(400).json({ errorMessage: message })
  }
};

export default handler;