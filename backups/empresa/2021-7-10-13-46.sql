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
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Apellido` varchar(50) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `idSeccionEmpresa` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `idSeccionEmpresa` (`idSeccionEmpresa`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idSeccionEmpresa`) REFERENCES `secciones_empresa` (`idSeccionEmpresa`)
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 33 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 56 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: perfiles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `perfiles` (
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idPerfil` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idPerfil`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: secciones_empresa
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `secciones_empresa` (
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Descripcion` text DEFAULT NULL,
  `idSeccionEmpresa` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idSeccionEmpresa`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Actualizado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Apellido` varchar(50) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Password` varchar(64) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `Usuario` (`Usuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 00:14:39',
    'Toranzo',
    '2021-06-20 01:07:14',
    6,
    4,
    'Maximiliano'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 18:56:27',
    'Danuccii',
    '2021-06-20 18:45:11',
    13,
    6,
    'Victoria'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 01:09:57',
    'Fort',
    '2021-06-20 18:46:28',
    16,
    2,
    'Ricardo'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 00:56:00',
    'Zapata',
    '2021-06-20 20:10:36',
    18,
    7,
    'Carlos'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 00:47:00',
    'Olguín',
    '2021-06-20 21:34:28',
    22,
    4,
    'Pablo'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 18:54:57',
    'Gomez',
    '2021-06-22 00:45:06',
    23,
    1,
    'Papu'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 19:57:12',
    'Rodriguez',
    '2021-06-22 19:02:40',
    24,
    11,
    'Mirta'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 19:03:39',
    'Correa',
    '2021-06-22 19:03:39',
    25,
    15,
    'Ángel'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 19:25:45',
    'Menchi',
    '2021-06-22 19:25:45',
    26,
    14,
    'Karina'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-23 22:30:50',
    'Fuentes',
    '2021-06-23 22:30:50',
    27,
    3,
    'Luciano'
  );
INSERT INTO
  `empleados` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idEmpleado`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-23 22:34:16',
    'Nuñez',
    '2021-06-23 22:34:16',
    28,
    6,
    'Martin'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_empleados
# ------------------------------------------------------------

INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:33:47',
    1,
    1,
    'Baja',
    'Martinez, Victoria'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:34:06',
    2,
    1,
    'Baja',
    'Suarez, Martina'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:35:42',
    3,
    3,
    'Modificación',
    'Pesoa, Marcelo'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:35:54',
    4,
    3,
    'Modificación',
    'Rodriguez, Marcelo'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:38:22',
    5,
    3,
    'Modificación',
    'Rodriguez, Marcelo. Sección: Ventas'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:39:19',
    6,
    6,
    'Modificación',
    'Ortiz, Maximiliano. Producción'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:39:24',
    7,
    6,
    'Modificación',
    'Ortiz, Maximiliano. Ventas'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:12:27',
    8,
    3,
    'Baja',
    'Espinosa, Elsa. Administración'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:12:58',
    9,
    1,
    'Baja',
    'Espinosa, Elsa'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 21:34:28',
    10,
    3,
    'Baja',
    'Olguín, Pablo. Analyticss'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:01:58',
    11,
    6,
    'Modificación',
    'Olguínnn, Pablo. Analyticss'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:09:10',
    12,
    6,
    'Modificación',
    'Ortizz, Maximiliano. Producción'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:14:39',
    13,
    1,
    'Modificación',
    'Toranzo, Maximiliano. Producción'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:34:34',
    14,
    1,
    'Modificación',
    'Danucci, Victoria. Test'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:40:20',
    15,
    1,
    'Modificación',
    'Danucci, Victoria. Quality Assurance'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:45:06',
    16,
    3,
    'Baja',
    'Gomez, Papu. Test 1234'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:46:18',
    17,
    1,
    'Modificación',
    'Gomez, Papu. recruitment'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:54:33',
    18,
    1,
    'Modificación',
    'Zapata, Carlos. Dirección'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 01:06:35',
    19,
    3,
    'Modificación',
    'Lamas, Diana. Analyticss'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:39:24',
    20,
    3,
    'Baja',
    'Sanchez, Paula'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:41:06',
    21,
    3,
    'Baja',
    'Rodriguez, Marcelo'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:54:31',
    22,
    3,
    'Modificación',
    'Gomez, Papu. Management'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:54:57',
    23,
    3,
    'Modificación',
    'Gomez, Papu. Dirección'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:56:13',
    24,
    3,
    'Modificación',
    'Danucci, Victoria. Quality Assurance'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 18:56:27',
    25,
    3,
    'Modificación',
    'Danuccii, Victoria. Quality Assurance'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:02:40',
    26,
    3,
    'Baja',
    'Colla, Mira. nueva'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:03:39',
    27,
    3,
    'Baja',
    'Correa, Ángel. Test 1234'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:25:45',
    28,
    3,
    'Baja',
    'Menchi, Karina. test id'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:57:12',
    29,
    3,
    'Modificación',
    'Rodriguez, Mirta. test seccion'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 19:58:53', 30, 3, 'Baja', 'Lamas, Diana');
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-23 22:30:50',
    31,
    2,
    'Baja',
    'Fuentes, Luciano. Ventas'
  );
INSERT INTO
  `logs_empleados` (
    `Creado`,
    `idLogEmpleado`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-23 22:34:16',
    32,
    2,
    'Alta',
    'Nuñez, Martin. Quality Assurance'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_perfiles
# ------------------------------------------------------------

INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 21:16:36', 1, 1, 'Alta', 'Limpieza');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 21:20:14', 2, 3, 'Baja', 'qc');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 21:22:47', 3, 9, 'Modificación', 'AM');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 21:23:01', 4, 9, 'Modificación', 'PM');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 21:40:54', 5, 1, 'Alta', 'Champion');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 20:37:23',
    6,
    9,
    'Modificación',
    'Tech Lead'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 20:40:46',
    7,
    3,
    'Modificación',
    'Limpiezaa'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 20:41:05',
    8,
    3,
    'Modificación',
    'Limpieza'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 20:45:08', 9, 3, 'Alta', 'Redes');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 21:01:53', 10, 3, 'Alta', 'Test perfil');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 21:02:06',
    11,
    3,
    'Modificación',
    'Test perfil 1'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 21:02:11',
    12,
    3,
    'Baja',
    'Test perfil 1'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:04:10', 13, 3, 'Baja', 'Champion');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 22:06:16',
    14,
    3,
    'Modificación',
    'Superusuario'
  );
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:08:01', 15, 3, 'Baja', 'Limpieza');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-24 00:01:27', 16, 6, 'Baja', 'admin');
INSERT INTO
  `logs_perfiles` (
    `Creado`,
    `idLogPerfil`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-24 21:23:44', 17, 3, 'Alta', 'operador');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_secciones_empresa
# ------------------------------------------------------------

INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:48:09',
    4,
    9,
    'Modificación',
    'Nuevo nombre sección: Marketing'
  );
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-21 18:44:44', 7, 1, 'Alta', 'Techos');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-21 18:58:50', 8, 6, 'Alta', 'test id');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-21 19:09:31', 9, 6, 'Alta', 'Test 12');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 00:28:16',
    10,
    1,
    'Modificación',
    'recruitment'
  );
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:10:51', 11, 3, 'Alta', 'Inmuebles');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:11:40', 12, 3, 'Alta', 'Propiedades');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:12:19', 13, 3, 'Alta', 'Test');
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 22:19:25',
    14,
    3,
    'Modificación',
    'Sección'
  );
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 22:48:04',
    15,
    3,
    'Modificación',
    'Analytics'
  );
INSERT INTO
  `logs_secciones_empresa` (
    `Creado`,
    `idLogSeccionEmpresa`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 22:48:53',
    16,
    3,
    'Modificación',
    'Test 12345'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs_usuarios
# ------------------------------------------------------------

INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 01:07:44', 1, 1, 'Alta', 'Roux, Silvina');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 01:11:41',
    2,
    1,
    'Alta',
    'Gutierrez, Gabriel'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 17:49:44', 3, 1, 'Alta', 'Gino, Test');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 17:52:42', 4, 1, 'Alta', '23, Juan');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-20 17:52:49', 5, 1, 'Alta', '23, Juan');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 17:53:07',
    6,
    1,
    'Baja',
    '23, Juan (juan23)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 17:56:11',
    7,
    9,
    'Modificación',
    'Smith, Will (will)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:03:28',
    8,
    3,
    'Modificación',
    'Nuevo perfil de [object HTMLInputElement]: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:04:36',
    9,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:04:48',
    10,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:05:15',
    11,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:05:27',
    12,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:05:45',
    13,
    6,
    'Modificación',
    'Nuevo perfil de gabriel: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 18:05:46',
    14,
    6,
    'Modificación',
    'Nuevo perfil de gabriel: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 19:58:50',
    15,
    9,
    'Modificación',
    'Nuevo perfil de will: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 19:59:34',
    16,
    9,
    'Modificación',
    'Nuevo perfil de will: auditor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 19:59:36',
    17,
    2,
    'Baja',
    'Perfil eliminado de will: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 19:59:37',
    18,
    2,
    'Baja',
    'Perfil eliminado de will: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:00:23',
    19,
    9,
    'Modificación',
    'Nuevo perfil de will: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:00:25',
    20,
    2,
    'Baja',
    'Perfil eliminado de will: admin'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-20 20:02:04',
    21,
    2,
    'Baja',
    'Perfil eliminado de gabriel: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:55:16',
    22,
    1,
    'Modificación',
    'Lisandro, Facundo (lisando)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:55:32',
    23,
    1,
    'Modificación',
    'Nuevo perfil de lisando: Contador'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 19:55:54',
    24,
    1,
    'Modificación',
    'Lisandro, Facundo (lisandro)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-22 22:56:40', 25, 3, 'Alta', 'Lara, Martin');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 22:57:31',
    26,
    3,
    'Alta',
    'Gutierrez, Test'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 23:02:34',
    27,
    9,
    'Modificación',
    'Guillermo, Bruno (bruno)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 23:05:09',
    28,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Superusuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 23:07:54',
    29,
    3,
    'Modificación',
    'Taborda, Agustina (supervisorr)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-22 23:09:20',
    30,
    3,
    'Modificación',
    'Taborda, Agustina (supervisor)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-23 01:41:15',
    31,
    3,
    'Baja',
    'Perfil eliminado de supervisor: auditor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-23 21:39:34',
    32,
    6,
    'Baja',
    'Lara, Martin (martin)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 00:22:29',
    33,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Superusuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 00:27:09',
    34,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Superusuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 00:28:18',
    35,
    2,
    'Modificación',
    'Nuevo perfil de auditor: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 20:54:45',
    36,
    3,
    'Baja',
    'Perfil eliminado de bruno: auditor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 20:59:00',
    37,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Superusuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 20:59:08',
    38,
    3,
    'Baja',
    'Perfil eliminado de bruno: Superusuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 20:59:50',
    39,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 20:59:52',
    40,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:01:38',
    41,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:01:55',
    42,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:04:07',
    43,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:05:18',
    44,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:06:21',
    45,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:06:25',
    46,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:08:32',
    47,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:09:49',
    48,
    3,
    'Baja',
    'Perfil eliminado de bruno: Tech Lead'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:14:11',
    49,
    6,
    'Alta',
    'apellido, usuario'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:14:38',
    50,
    6,
    'Modificación',
    'Apellidos, usuario (usuario)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:15:34',
    51,
    6,
    'Modificación',
    'Nuevo perfil de gabriel: supervisor'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:24:48',
    52,
    3,
    'Modificación',
    'Nuevo perfil de supervisor: operador'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  ('2021-06-24 21:51:58', 53, 12, 'Alta', '23, Juan');
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-06-24 21:52:38',
    54,
    12,
    'Modificación',
    'Juan 23, Instituto (juan23)'
  );
INSERT INTO
  `logs_usuarios` (
    `Creado`,
    `idLogUsuario`,
    `idUsuario`,
    `Operacion`,
    `Descripcion`
  )
VALUES
  (
    '2021-07-05 00:12:24',
    55,
    3,
    'Alta',
    'Rojas, Guillermo'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: perfiles
# ------------------------------------------------------------

INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    1,
    'admin'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    2,
    'auditor'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    3,
    'supervisor'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-22 22:06:16',
    '2021-06-20 01:07:14',
    4,
    'Superusuario'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-22 20:37:22',
    '2021-06-20 21:12:19',
    7,
    'Tech Lead'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-20 21:13:40',
    '2021-06-20 21:13:40',
    8,
    'Contador'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-22 20:45:07',
    '2021-06-22 20:45:07',
    11,
    'Redes'
  );
INSERT INTO
  `perfiles` (`Actualizado`, `Creado`, `idPerfil`, `Nombre`)
VALUES
  (
    '2021-06-24 21:23:43',
    '2021-06-24 21:23:43',
    13,
    'operador'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: secciones_empresa
# ------------------------------------------------------------

INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    NULL,
    1,
    'Dirección'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    NULL,
    2,
    'Administración'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    NULL,
    3,
    'Ventas'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 01:07:14',
    '2021-06-20 01:07:14',
    NULL,
    4,
    'Producción'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 20:33:54',
    '2021-06-20 20:33:54',
    NULL,
    5,
    'Test'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 20:35:37',
    '2021-06-20 20:35:37',
    NULL,
    6,
    'Quality Assurance'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 00:56:17',
    '2021-06-20 20:37:29',
    NULL,
    7,
    'Management'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 00:28:16',
    '2021-06-20 20:39:12',
    NULL,
    8,
    'recruitment'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 22:48:03',
    '2021-06-20 20:40:18',
    NULL,
    9,
    'Analytics'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-20 20:48:09',
    '2021-06-20 20:43:10',
    NULL,
    10,
    'Marketing'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-21 18:39:58',
    '2021-06-21 18:39:58',
    NULL,
    11,
    'test seccion'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-21 18:44:44',
    '2021-06-21 18:44:44',
    NULL,
    13,
    'Techos'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-21 18:58:50',
    '2021-06-21 18:58:50',
    NULL,
    14,
    'test id'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 22:48:53',
    '2021-06-21 19:09:31',
    NULL,
    15,
    'Test 12345'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 22:10:50',
    '2021-06-22 22:10:50',
    NULL,
    16,
    'Inmuebles'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 22:11:40',
    '2021-06-22 22:11:40',
    NULL,
    17,
    'Propiedades'
  );
INSERT INTO
  `secciones_empresa` (
    `Actualizado`,
    `Creado`,
    `Descripcion`,
    `idSeccionEmpresa`,
    `Nombre`
  )
VALUES
  (
    '2021-06-22 22:19:25',
    '2021-06-22 22:12:19',
    NULL,
    18,
    'Sección'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-06-22 19:55:54',
    'Lisandro',
    '2021-06-20 01:07:14',
    1,
    'Facundo',
    'lisandro',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-06-20 01:12:00',
    'Ramos',
    '2021-06-20 01:07:14',
    2,
    'Stella',
    'auditor',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-06-22 23:09:20',
    'Taborda',
    '2021-06-20 01:07:14',
    3,
    'Agustina',
    'supervisor',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-06-20 01:11:41',
    'Gutierrez',
    '2021-06-20 01:11:41',
    6,
    'Gabriel',
    'gabriel',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-06-24 20:52:48',
    'Guillermo',
    '2021-06-20 17:52:49',
    9,
    'Bruno',
    'bruno',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-07-09 12:11:42',
    'Apellidos',
    '2021-06-24 21:14:11',
    12,
    'usuario',
    'usuario',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-07-09 12:11:42',
    'Juan 23',
    '2021-06-24 21:51:58',
    13,
    'Instituto',
    'juan23',
    '$2b$10$yafDbGG70L8tpeS2od5nD.zFNufLRwfpuycQ08nhdV9OauYwH7Nji'
  );
INSERT INTO
  `usuarios` (
    `Actualizado`,
    `Apellido`,
    `Creado`,
    `idUsuario`,
    `Nombre`,
    `Usuario`,
    `Password`
  )
VALUES
  (
    '2021-07-09 12:11:42',
    'Rojas',
    '2021-07-05 00:12:23',
    14,
    'Guillermo',
    'guillermo',
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
  ('2021-06-20 01:07:14', 1, 1, 1);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-20 01:07:14', 2, 2, 2);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-20 18:05:15', 3, 3, 11);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-20 18:05:27', 1, 3, 12);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-20 18:05:45', 1, 6, 13);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-22 19:55:32', 8, 1, 18);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 00:22:28', 4, 3, 19);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 00:27:09', 4, 1, 20);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 00:28:18', 7, 3, 21);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 20:59:00', 4, 9, 22);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 21:15:34', 3, 12, 25);
INSERT INTO
  `usuarios_tiene_perfiles` (
    `Creado`,
    `idPerfil`,
    `idUsuario`,
    `idUsuarioPerfil`
  )
VALUES
  ('2021-06-24 21:24:48', 13, 12, 26);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
