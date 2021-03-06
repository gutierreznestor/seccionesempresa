DROP DATABASE IF EXISTS empresa;

CREATE DATABASE empresa;

USE empresa;

CREATE TABLE IF NOT EXISTS secciones_empresa (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Descripcion TEXT,
  idSeccionEmpresa INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO secciones_empresa (Nombre) VALUES 
  ('Dirección'), 
  ('Administración'),
  ('Ventas'),
  ('Producción');

CREATE TABLE IF NOT EXISTS empleados (
  Apellido VARCHAR(50) NOT NULL,
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  idSeccionEmpresa INT NOT NULL,
  Nombre VARCHAR(50) NOT NULL
);

ALTER TABLE empleados 
  ADD FOREIGN KEY (idSeccionEmpresa)
  REFERENCES secciones_empresa(idSeccionEmpresa);

INSERT INTO empleados (Nombre, Apellido, idSeccionEmpresa) VALUES
  ('Fernando', 'Gomez', 1),
  ('Victoria', 'Martinez', 2),
  ('Marcelo', 'Fuentes', 4),
  ('Martina', 'Suarez', 1),
  ('Paula', 'Sanchez', 3),
  ('Maximiliano', 'Ortiz', 2),
  ('Diana', 'Lamas', 3);

CREATE TABLE IF NOT EXISTS usuarios (
  Apellido VARCHAR(50) NOT NULL,
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Usuario VARCHAR(50) UNIQUE NOT NULL,
  Password VARCHAR(64) NOT NULL
);

INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
  ('admin', 'Facundo', 'Lisandro', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'),
  ('auditor', 'Stella', 'Ramos', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'),
  ('supervisor', 'Agustina', 'Taborda', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'),
  ('test', 'Paulo', 'Ayala', '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji');

CREATE TABLE IF NOT EXISTS perfiles (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idPerfil INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL
);

INSERT INTO perfiles (Nombre) VALUES
  ('admin'),
  ('auditor'),
  ('supervisor'),
  ('SIN ASIGNAR');

CREATE TABLE IF NOT EXISTS usuarios_tiene_perfiles (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idPerfil INT NOT NULL DEFAULT 4,
  idUsuario INT NOT NULL,
  idUsuarioPerfil INT AUTO_INCREMENT PRIMARY KEY
);

ALTER TABLE usuarios_tiene_perfiles 
  ADD FOREIGN KEY (idUsuario)
  REFERENCES usuarios(idUsuario);

ALTER TABLE usuarios_tiene_perfiles 
  ADD FOREIGN KEY (idPerfil)
  REFERENCES perfiles(idPerfil);

INSERT INTO usuarios_tiene_perfiles (idUsuario, idPerfil) VALUES
  (1, 1),
  (2, 2),
  (3, 3);

CREATE TABLE IF NOT EXISTS logs_usuarios (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idLogUsuario INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  Operacion VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE logs_usuarios 
  ADD FOREIGN KEY (idUsuario)
  REFERENCES usuarios(idUsuario);


CREATE TABLE IF NOT EXISTS logs_empleados (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idLogEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  Operacion VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE logs_empleados 
  ADD FOREIGN KEY (idUsuario)
  REFERENCES usuarios(idUsuario);

CREATE TABLE IF NOT EXISTS logs_secciones_empresa (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idLogSeccionEmpresa INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  Operacion VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE logs_secciones_empresa 
  ADD FOREIGN KEY (idUsuario)
  REFERENCES usuarios(idUsuario);

CREATE TABLE IF NOT EXISTS logs_perfiles (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idLogPerfil INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  Operacion VARCHAR(50) NOT NULL,
  Descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE logs_perfiles 
  ADD FOREIGN KEY (idUsuario)
  REFERENCES usuarios(idUsuario);

CREATE TABLE IF NOT EXISTS plan_cuentas (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CodigoPlan VARCHAR(20) UNIQUE NOT NULL,
  idPlanCuenta INT AUTO_INCREMENT PRIMARY KEY,
  Nivel INT,
  Nombre VARCHAR(35) NOT NULL,
  Tipo INT
);

INSERT INTO plan_cuentas (CodigoPlan, Nivel, Nombre, Tipo) VALUES
  ('1', 1, 'ACTIVO', 0),
  ('1.01', 2, 'ACTIVO CORRIENTE', 0),
  ('1.01.01', 3, 'DISPONIBILIDADES', 0),
  ('1.01.02', 3, 'CUENTAS POR COBRAR ', 0);
  