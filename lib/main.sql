DROP DATABASE IF EXISTS mainSeccionesEmpresa;

CREATE DATABASE mainSeccionesEmpresa;

USE mainSeccionesEmpresa;

CREATE TABLE IF NOT EXISTS empresas (
  Creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  DB VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO empresas(Nombre, DB) 
VALUES (?, ?);

SELECT DISTINCT idEmpresa, Creado, Nombre, DB
FROM empresas;
