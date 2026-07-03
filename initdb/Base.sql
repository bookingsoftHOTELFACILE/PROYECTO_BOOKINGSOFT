-- Creamos el esquema
CREATE SCHEMA IF NOT EXISTS hotel;

SET search_path TO hotel;

-- ==========================================
-- 1. SEGURIDAD Y USUARIOS
-- ==========================================
CREATE TABLE rol (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE usuario (
    id                  SERIAL PRIMARY KEY,
    nombre              VARCHAR(100) NOT NULL,
    apellido            VARCHAR(100) NOT NULL,
    cedula              VARCHAR(20) NOT NULL UNIQUE,
    email               VARCHAR(150) NOT NULL UNIQUE,
    password            VARCHAR(255) NOT NULL,
    activo              BOOLEAN DEFAULT TRUE,
    ultimo_login        TIMESTAMP NULL,
    fecha_creacion      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol_id              INT,
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

-- Función y Trigger para simular el "ON UPDATE CURRENT_TIMESTAMP" de MySQL
CREATE OR REPLACE FUNCTION update_fecha_actualizacion_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_usuario_modtime
BEFORE UPDATE ON usuario
FOR EACH ROW
EXECUTE FUNCTION update_fecha_actualizacion_column();

CREATE TABLE auditoria (
    id          SERIAL PRIMARY KEY,
    usuario_id  INT,
    accion      VARCHAR(50) NOT NULL,
    entidad     VARCHAR(100) NOT NULL,
    entidad_id  INT,
    detalle     TEXT,
    ip_address  VARCHAR(45),
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL
);

-- ==========================================
-- 2. CLIENTES
-- ==========================================
CREATE TABLE tipo_documento (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE cliente (
    id                SERIAL PRIMARY KEY,
    nombre            VARCHAR(100) NOT NULL,
    apellido          VARCHAR(100) NOT NULL,
    identificacion    VARCHAR(100) NOT NULL UNIQUE,
    telefono          VARCHAR(100),
    email             VARCHAR(150),
    nacionalidad      VARCHAR(100),
    fecha_nacimiento  DATE,
    fecha_registro    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_documento_id INT,
    FOREIGN KEY (tipo_documento_id) REFERENCES tipo_documento(id)
);

CREATE TABLE historial_cliente (
    id          SERIAL PRIMARY KEY,
    cliente_id  INT,
    usuario_id  INT,
    observacion TEXT NOT NULL,
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- ==========================================
-- 3. GESTIÓN DE HABITACIONES
-- ==========================================
CREATE TABLE tipo_unidad (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE estado_unidad (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE habitacion (
    id               SERIAL PRIMARY KEY,
    numero           VARCHAR(10) NOT NULL UNIQUE,
    piso             INT NOT NULL,
    capacidad        INT NOT NULL,
    descripcion      TEXT,
    tipo_unidad_id   INT,
    estado_unidad_id INT,
    FOREIGN KEY (tipo_unidad_id) REFERENCES tipo_unidad(id),
    FOREIGN KEY (estado_unidad_id) REFERENCES estado_unidad(id)
);

CREATE TABLE tarifa (
    id             SERIAL PRIMARY KEY,
    temporadas     VARCHAR(100),
    precio         DECIMAL(10,2) NOT NULL,
    fecha_inicio   DATE,
    fecha_fin      DATE,
    tipo_unidad_id INT,
    FOREIGN KEY (tipo_unidad_id) REFERENCES tipo_unidad(id)
);

-- ==========================================
-- 4. RESERVAS Y ESTADÍAS
-- ==========================================
CREATE TABLE estado_reserva (
    id     SERIAL PRIMARY KEY,
    estado VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE reserva (
    id                SERIAL PRIMARY KEY,
    cliente_id        INT,
    habitacion_id     INT,
    tarifa_id         INT,
    estado_reserva_id INT,
    fecha_inicio      DATE NOT NULL,
    fecha_fin         DATE NOT NULL,
    cantidad          INT,
    observaciones     TEXT,
    checkin           TIMESTAMP NULL,
    checkout          TIMESTAMP NULL,
    estado            VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (habitacion_id) REFERENCES habitacion(id),
    FOREIGN KEY (tarifa_id) REFERENCES tarifa(id),
    FOREIGN KEY (estado_reserva_id) REFERENCES estado_reserva(id)
);

CREATE TABLE estadia (
    id                  SERIAL PRIMARY KEY,
    reserva_id          INT,
    usuario_checkin_id  INT,
    usuario_checkout_id INT,
    fecha_checkin       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_checkout      TIMESTAMP NULL,
    estado              VARCHAR(20) DEFAULT 'ACTIVO',
    FOREIGN KEY (reserva_id) REFERENCES reserva(id),
    FOREIGN KEY (usuario_checkin_id) REFERENCES usuario(id),
    FOREIGN KEY (usuario_checkout_id) REFERENCES usuario(id)
);

-- ==========================================
-- 5. LIMPIEZA
-- ==========================================
CREATE TABLE limpieza (
    id            SERIAL PRIMARY KEY,
    habitacion_id INT,
    usuario_id    INT,
    fecha         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado        VARCHAR(20) NOT NULL,
    observacion   TEXT,
    FOREIGN KEY (habitacion_id) REFERENCES habitacion(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- ==========================================
-- 6. FACTURACIÓN Y PAGOS
-- ==========================================

-- Creación de tipos ENUM para PostgreSQL dentro del esquema
CREATE TYPE tipo_pago_enum AS ENUM ('digital', 'efectivo');
CREATE TYPE estado_pago_enum AS ENUM ('pendiente', 'completado', 'cancelado');

CREATE TABLE factura (
    id          SERIAL PRIMARY KEY,
    cliente_id  INT,
    reserva_id  INT,
    descuento   DECIMAL(10,2) DEFAULT 0,
    total       DECIMAL(10,2) NOT NULL DEFAULT 0,
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (reserva_id) REFERENCES reserva(id)
);

CREATE TABLE pago (
    id              SERIAL PRIMARY KEY,
    factura_id      INT,
    usuario_id      INT,
    monto           DECIMAL(10,2) NOT NULL,
    referencia_pago VARCHAR(100),
    fecha           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_pago       tipo_pago_enum,
    estado_pago     estado_pago_enum DEFAULT 'pendiente',
    FOREIGN KEY (factura_id) REFERENCES factura(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- ==========================================
-- 7. SERVICIOS Y EVENTOS
-- ==========================================
CREATE TABLE tipo_servicio (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE servicio (
    id               SERIAL PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    tipo_servicio_id INT,
    precio_base      DECIMAL(10,2),
    activo           BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tipo_servicio_id) REFERENCES tipo_servicio(id)
);

CREATE TABLE consumo_servicio (
    id          SERIAL PRIMARY KEY,
    cliente_id  INT,
    servicio_id INT,
    factura_id  INT,
    cantidad    DECIMAL(10,2) DEFAULT 1,
    observacion TEXT,
    fecha       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (servicio_id) REFERENCES servicio(id),
    FOREIGN KEY (factura_id) REFERENCES factura(id)
);

CREATE TABLE estado_evento (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE evento (
    id               SERIAL PRIMARY KEY,
    nombre           VARCHAR(150) NOT NULL,
    cliente_id       INT,
    estado_evento_id INT,
    tipo_evento      VARCHAR(100),
    fecha            DATE NOT NULL,
    hora_inicio      TIME,
    hora_fin         TIME,
    cantidad_personas INT,
    precio           DECIMAL(10,2),
    observaciones    TEXT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (estado_evento_id) REFERENCES estado_evento(id)
);

-- ==========================================
-- 8. CONFIGURACIÓN
-- ==========================================
CREATE TABLE configuracion (
    id          SERIAL PRIMARY KEY,
    clave       VARCHAR(50) NOT NULL UNIQUE,
    valor       VARCHAR(255) NOT NULL,
    descripcion TEXT
);