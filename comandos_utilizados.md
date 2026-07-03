# 🛠️ Comandos Utilizados

Guía rápida de los comandos que usamos en esta sesión para configurar, levantar el proyecto y consultar los datos.

---

## 1. Docker (Base de Datos y pgAdmin)

Levantar la base de datos PostgreSQL y pgAdmin en segundo plano:
```bash
docker-compose up -d
```

Verificar que los contenedores están activos y saludables:
```bash
docker ps
```

---

## 2. Entorno Virtual de Python (Terminal 2)

Activar el entorno virtual (Windows PowerShell):
```bash
.\venv\Scripts\activate
```

---

## 3. Servidor de FastAPI (Uvicorn)

Iniciar el servidor de desarrollo con recarga automática:
```bash
uvicorn main:app --reload
```

---

## 4. Consultas SQL para pgAdmin

Comandos para verificar la inserción de datos en el **Query Tool** de pgAdmin:

```sql
-- Configurar el schema activo
SET search_path TO hotel;

-- Consultar tablas principales
SELECT id, nombre, apellido, identificacion, email FROM cliente;
SELECT id, numero, piso, capacidad FROM habitacion;
SELECT id, cliente_id, habitacion_id, fecha_inicio, fecha_fin FROM reserva;
SELECT id, factura_id, monto, tipo_pago, estado_pago FROM pago;
SELECT id, nombre, tipo_evento, precio FROM evento;
```
