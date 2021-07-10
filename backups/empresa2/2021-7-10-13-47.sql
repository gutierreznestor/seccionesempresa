/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empleados` (
  `Apellido` varchar(50) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `idSeccionEmpresa` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `idSeccionEmpresa` (`idSeccionEmpresa`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idSeccionEmpresa`) REFERENCES `secciones_empresa` (`idSeccionEmpresa`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logs_empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logs_empleados` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idLogEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Operacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`idLogEmpleado`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `logs_empleados_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logs_perfiles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logs_perfiles` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idLogPerfil` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Operacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`idLogPerfil`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `logs_perfiles_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logs_secciones_empresa
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logs_secciones_empresa` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idLogSeccionEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Operacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`idLogSeccionEmpresa`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `logs_secciones_empresa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logs_usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logs_usuarios` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idLogUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Operacion` varchar(50) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`idLogUsuario`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `logs_usuarios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: perfiles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `perfiles` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idPerfil` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idPerfil`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: secciones_empresa
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `secciones_empresa` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Descripcion` text DEFAULT NULL,
  `idSeccionEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idSeccionEmpresa`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Apellido` varchar(50) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Password` varchar(64) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `Usuario` (`Usuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios_tiene_perfiles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios_tiene_perfiles` (
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idPerfil` int(11) NOT NULL DEFAULT 4,
  `idUsuario` int(11) NOT NULL,
  `idUsuarioPerfil` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idUsuarioPerfil`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idPerfil` (`idPerfil`),
  CONSTRAINT `usuarios_tiene_perfiles_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `usuarios_tiene_perfiles_ibfk_2` FOREIGN KEY (`idPerfil`) REFERENCES `perfiles` (`idPerfil`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Gomez', '2021-07-05 00:17:44', 1, 1, 'Fernando');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Martinez', '2021-07-05 00:17:44', 2, 2, 'Victoria');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Fuentes', '2021-07-05 00:17:44', 3, 4, 'Marcelo');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Suarez', '2021-07-05 00:17:44', 4, 1, 'Martina');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Sanchez', '2021-07-05 00:17:44', 5, 3, 'Paula');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Ortiz', '2021-07-05 00:17:44', 6, 2, 'Maximiliano');
INSERT INTO
  `empleados` (
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('Lamas', '2021-07-05 00:17:44', 7, 3, 'Diana');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_empleados
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_perfiles
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_secciones_empresa
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_usuarios
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: perfiles
# ------------------------------------------------------------

INSERT INTO
  `perfiles` (`Creado`, `idPerfil`, `Nombre`)
VALUES
  ('2021-07-05 00:17:44', 1, 'admin');
INSERT INTO
  `perfiles` (`Creado`, `idPerfil`, `Nombre`)
VALUES
  ('2021-07-05 00:17:44', 2, 'auditor');
INSERT INTO
  `perfiles` (`Creado`, `idPerfil`, `Nombre`)
VALUES
  ('2021-07-05 00:17:44', 3, 'supervisor');
INSERT INTO
  `perfiles` (`Creado`, `idPerfil`, `Nombre`)
VALUES
  ('2021-07-05 00:17:44', 4, 'SIN ASIGNAR');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: secciones_empresa
# ------------------------------------------------------------

INSERT INTO
  `secciones_empresa` (
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('2021-07-05 00:17:44', NULL, 1, 'Dirección');
INSERT INTO
  `secciones_empresa` (
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('2021-07-05 00:17:44', NULL, 2, 'Administración');
INSERT INTO
  `secciones_empresa` (
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('2021-07-05 00:17:44', NULL, 3, 'Ventas');
INSERT INTO
  `secciones_empresa` (
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  ('2021-07-05 00:17:44', NULL, 4, 'Producción');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    'Lisandro',
    '2021-07-05 00:17:44',
    1,
    'Facundo',
    'admin',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    'Ramos',
    '2021-07-05 00:17:44',
    2,
    'Stella',
    'auditor',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    'Taborda',
    '2021-07-05 00:17:44',
    3,
    'Agustina',
    'supervisor',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    'Ayala',
    '2021-07-05 00:17:44',
    4,
    'Paulo',
    'test',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios_tiene_perfiles
# ------------------------------------------------------------

INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-07-05 00:17:45', 1, 1, 1);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-07-05 00:17:45', 2, 2, 2);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-07-05 00:17:45', 3, 3, 3);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-07-05 00:17:45', 4, 4, 4);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
