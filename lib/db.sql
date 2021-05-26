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
