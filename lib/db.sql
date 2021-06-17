DROP DATABASE IF EXISTS empresa;

CREATE DATABASE empresa;

USE empresa;

CREATE TABLE IF NOT EXISTS secciones_empresa (
  Actualizado 
    TIMESTAMP 
    NOT NULL 
    DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Descripcion TEXT,
  idSeccionEmpresa INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL
);

INSERT INTO secciones_empresa (Nombre) VALUES 
  ('Dirección'), 
  ('Administración'),
  ('Ventas'),
  ('Producción');

CREATE TABLE IF NOT EXISTS empleados (
  Actualizado 
    TIMESTAMP 
    NOT NULL 
    DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,
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
  Actualizado TIMESTAMP NOT NULL 
    DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,
  Apellido VARCHAR(50) NOT NULL,
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Usuario VARCHAR(50) UNIQUE NOT NULL,
  Password VARCHAR(64) NOT NULL
);

INSERT INTO usuarios (Usuario, Nombre, Apellido, Password) VALUES
  ('admin', 'Facundo', 'Lisandro', 'admin'),
  ('auditor', 'Stella', 'Ramos', 'auditor'),
  ('supervisor', 'Agustina', 'Taborda', 'supervisor'),
  ('test', 'Paulo', 'Ayala', 'test');

CREATE TABLE IF NOT EXISTS perfiles (
  Actualizado TIMESTAMP NOT NULL 
    DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,
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

INSERT INTO usuarios_tiene_perfiles (idUsuario) VALUES
  (4);