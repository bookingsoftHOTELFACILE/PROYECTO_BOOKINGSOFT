> **Pregunta:** ¿Cuáles tareas técnicas resolvieron a nivel de base de datos, endpoints y frontend para el registro y reservas?

# Tareas Técnicas Resueltas: Integración de Registro y Reservas (Estructura Separada)

Este documento detalla el rebanado vertical de ingeniería de software resuelto para conectar las capas de **Base de Datos**, **Backend (FastAPI)** y **Frontend (React)** en el flujo de **Registro de Huésped y Creación de Reservas** de **BookingSoft**, alineado con la **Arquitectura Monolítica** en tu entorno **Antigravity IDE** para el **SENA ADSO T4**.

---

## 1. Capa de Datos (Modelos y Persistencia)
La persistencia y las restricciones de integridad relacional se implementan físicamente en la base de datos relacional y se reflejan en el código del servidor:
*   **Modelo de Datos Físico:** Definición de las tablas `huesped` y `reserva_habitacion` en [schema.sql](file:///c:/Users/Sena1234/Desktop/aPARTAHOTEL/backend/schema.sql), con llaves foráneas (`FOREIGN KEY`) y validaciones de unicidad de documentos.
*   **Trigger en Base de Datos (Double Booking):** El trigger `trg_validar_double_booking` sobre la tabla de reservas impide en el motor SQL la sobreventa de una habitación en fechas superpuestas o reservas sobre unidades en `'Mantenimiento'`.
*   **Función SQL (Cálculo de Cotización):** La función `fn_calcular_noches_y_precio()` en PL/pgSQL automatiza el cálculo de noches y liquida un **15% de descuento** si la estancia supera las 15 noches.
*   **Conector y Datos en Memoria (`database/connection.py`):** Modulo que evalúa la conectividad física de PostgreSQL. Si la conexión falla, se activa el modo simulación, usando listas Python (`huespedes_simulacion`, `reservas_simulacion`) como persistencia de respaldo temporal.

---

## 2. Capa de Lógica de Negocio (Backend - API REST)
Estructurada de forma ordenada y fácil de comprender, separando los archivos por responsabilidades:
*   **Modelado y Validación con Pydantic (`models/schemas.py`):** Declaración de las clases `UserRegistro` y `ReservaCreate` para tipar y validar de forma automática los JSON de entrada desde el frontend.
*   **Módulos de Rutas (`routes/`):**
    *   **`huespedes.py`:** Administra el registro (`POST /api/user/registro`) y valida que no se dupliquen documentos (Regla RN-01).
    *   **`reservas.py`:** Administra las reservas (`POST /api/reservas`) y ejecuta la lógica para calcular las noches, aplicar el descuento del 15% por larga estadía, y el control de colisiones (Double Booking).
    *   **`habitaciones.py`:** Devuelve el catálogo de habitaciones del apartahotel.
*   **Enlace Principal (`main.py`):** Configura CORS, ejecuta la comprobación de la base de datos al arrancar y registra los routers de forma limpia.

---

## 3. Capa de Presentación (Cliente / Frontend)
Ubicada en [App.jsx](file:///c:/Users/Sena1234/Desktop/aPARTAHOTEL/frontend/src/App.jsx), ofrece una interfaz interactiva de flujo guiado:
*   **Flujo en Dos Pasos:**
    *   *Paso 1:* Formulario de registro con consentimiento obligatorio de la **Ley de Habeas Data**. Al registrarse, el perfil del huésped se autoselecciona de inmediato.
    *   *Paso 2:* Formulario de reserva de habitación habilitado para el huésped activo con fecha de Check-In, Check-Out y selector de apartamento.
*   **Cotizador en Pantalla:** Cálculo dinámico en el navegador del subtotal y descuento del 15% por larga estadía a medida que el usuario digita las fechas.
*   **Tablas de Datos en Vivo:** Sidebar lateral con listas dinámicas de huéspedes y reservas registradas que se refrescan en vivo consumiendo la API de FastAPI.
