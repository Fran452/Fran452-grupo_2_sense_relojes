CREATE DATABASE  IF NOT EXISTS `relojes` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `relojes`;
-- Tabla 'Direccion'

CREATE TABLE `Direccion` (
  `id_direccion` smallint(6) NOT NULL,
  `calle` smallint(6) NOT NULL,
  `numero` smallint(6) NOT NULL,
  `localidad` varchar(26) DEFAULT NULL,
  `provincia` varchar(26) DEFAULT NULL,
  PRIMARY KEY (`id_direccion`)
);

-- Tabla `Usuarios`

CREATE TABLE `Usuario` (
  `id_usuario` smallint(6) NOT NULL,
  `id_direccion` smallint(6) NOT NULL,
  `id_favorito` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
  `nombre` varchar(26) DEFAULT NULL,
  `apellido` varchar(26) DEFAULT NULL,
  `email` varchar(26) DEFAULT NULL,
  `telefono` smallint(6) NOT NULL,
  `contraseña` varchar(26) DEFAULT NULL,
  `img`  text NOT NULL,
  PRIMARY KEY (`id_usuario`),
  FOREIGN KEY (`id_direccion`) REFERENCES Direccion (`id_direccion`)
);

-- Tabla 'Venta'

CREATE TABLE `Venta` (
  `id_venta` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  `id_carrito` smallint(6) NOT NULL,
  PRIMARY KEY (`id_venta`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id_usuario`)
);

-- Tabla 'Carrito'

CREATE TABLE `Carrito` (
  `id_carrito` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  PRIMARY KEY (`id_carrito`),
    FOREIGN KEY (`id_venta`) REFERENCES Venta (`id_venta`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id_usuario`)
);

-- Tabla 'Productos'

CREATE TABLE `Producto` (
  `id_producto` smallint(6) NOT NULL,
  `nombre` varchar(26) DEFAULT NULL,
  `detalle` varchar(26) DEFAULT NULL,
  `precio` decimal(3,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id_venta` smallint(6) NOT NULL,
  `img`  text NOT NULL,
  PRIMARY KEY (`id_producto`),
  FOREIGN KEY (`id_venta`) REFERENCES Venta (`id_venta`)
);

-- Tabla 'CompraIndividual'

CREATE TABLE `CompraIndividual` (
  `id_compraIndividual` smallint(6) NOT NULL,
  `id_producto` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  `id_venta` smallint(6) NOT NULL,
   `precio` decimal(3,2) DEFAULT NULL,
   `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_compraIndividual`),
  FOREIGN KEY (`id_producto`) REFERENCES Producto (`id_producto`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id_usuario`),
  FOREIGN KEY (`id_venta`) REFERENCES Venta (`id_venta`)
);

-- Tabla 'Favoritos'

CREATE TABLE `Favorito` (
  `id_favorito` smallint(6) NOT NULL,
  `id_producto` smallint(6) NOT NULL,
  `id_usuario` smallint(6) NOT NULL,
  PRIMARY KEY (`id_favorito`),
  FOREIGN KEY (`id_producto`) REFERENCES Producto (`id_producto`),
  FOREIGN KEY (`id_usuario`) REFERENCES Usuario (`id_usuario`)
);

