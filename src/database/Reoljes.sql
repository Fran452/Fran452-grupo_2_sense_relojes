CREATE DATABASE  IF NOT EXISTS `Human` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Human`;
-- Tabla 'Direccion'

CREATE TABLE `Direccion` (
  `id` smallint(6) NOT NULL,
  `calle` smallint(6) NOT NULL,
  `numero` smallint(6) NOT NULL,
  `localidad` varchar(26) DEFAULT NULL,
  `provincia` varchar(26) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Tabla `Usuarios`

CREATE TABLE `Usuario` (
  `id` smallint(6) NOT NULL,
  `id_direccion` smallint(6) NOT NULL,
  `id_favorito` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
  `nombre` varchar(26) DEFAULT NULL,
  `apellido` varchar(26) DEFAULT NULL,
  `email` varchar(26) DEFAULT NULL,
  `telefono` smallint(6) NOT NULL,
  `contraseña` varchar(26) DEFAULT NULL,
  `img`  text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_direccion`) REFERENCES Direccion (`id`)
);

-- Tabla 'Venta'

CREATE TABLE `Venta` (
  `id` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  `id_carrito` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id`)
);

-- Tabla 'Carrito'

CREATE TABLE `Carrito` (
  `id` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_venta`) REFERENCES Venta (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id`)
);

-- Tabla 'Productos'

CREATE TABLE `Producto` (
  `id` smallint(6) NOT NULL,
  `nombre` varchar(26) DEFAULT NULL,
  `detalle` varchar(26) DEFAULT NULL,
  `precio` decimal(3,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `img`  text NOT NULL,
   `show` smallint(2) NOT NULL ,
  PRIMARY KEY (`id`)
);

-- Tabla 'CompraIndividual'

CREATE TABLE `CompraIndividual` (
  `id` smallint(6) NOT NULL,
  `id_producto` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
   `precio` decimal(3,2) DEFAULT NULL,
   `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES Producto (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id`),
  FOREIGN KEY (`id_venta`) REFERENCES Venta (`id`)
);

-- Tabla 'Favoritos'

CREATE TABLE `Favorito` (
  `id` smallint(6) NOT NULL,
  `id_producto` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES Producto (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id`)
);

-- Tabla de 'ProductImg'

CREATE TABLE `ProductImg`(
  `id` smallint(6) NOT NULL,
  `id_producto` smallint(6) NOT NULL,
  `img` text NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`id_producto`) REFERENCES Producto (`id`)
)