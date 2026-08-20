> **Pregunta:** ¿Cuántas Historias de Usuario (HU) son importantes para el módulo de registro y reservas?

# Historias de Usuario (HU): Registro de Huéspedes e Integración con Reservas

Este documento detalla las Historias de Usuario (HU) que estructuran el flujo integrado de **Registro y Reservas** de **BookingSoft** para **Apartamentos Facile**, sirviendo como sustento técnico de requisitos para el **SENA ADSO T4**.

---

## 📋 Contexto de la Planeación (Product Backlog)

En el marco del Product Backlog completo (15 HUs en 11 módulos), para el alcance transaccional integrado de registro y reservas son estrictamente requeridas **2 Historias de Usuario Principales** (ambas clasificadas como 🔴 **MUST HAVE**):

1.  **`HU-001` — Registro y gestión de usuarios** (Sprint 1 - 5 Puntos)
2.  **`HU-002` — Gestión de reservas de unidades** (Sprint 1 - 13 Puntos)

Estas dos historias componen el núcleo transaccional del hospedaje: **HU-001** actúa como la precondición legal y de datos del cliente, mientras que **HU-002** procesa el bloqueo físico del inventario para evitar sobreventas (*double booking*).

---

## 📂 Detalle de las Historias de Usuario (Gherkin Scenarios)

### 1. HU-001 — Registro y gestión de usuarios
*   **Módulo:** RF-001 · Gestión de Usuarios
*   **Prioridad MoSCoW:** 🔴 MUST HAVE
*   **Puntos de Historia:** 5 puntos
*   **Actor principal:** Nuevo usuario / Administrador

#### Historia de Usuario:
> **Como** nuevo usuario o administrador del sistema  
> **Quiero** registrarme o registrar nuevos usuarios con datos básicos y rol/empresa  
> **Para** acceder al sistema y poder realizar reservas en Apartamentos Facile.

#### Criterios de Aceptación:
*   **Escenario 1 (Registro Exitoso):** Dado que soy un nuevo cliente en el formulario de registro, cuando ingreso mi nombre, documento de identidad, teléfono, correo y empresa, entonces el sistema valida la información, crea mi perfil de huésped con nivel base "Silver" y lo muestra en pantalla.
*   **Escenario 2 (Validación de Documento Duplicado - Regla RN-01):** Dado que ya existe un huésped con el documento de identidad "1017283944", cuando intento registrar un nuevo huésped con ese mismo documento, entonces el sistema bloquea el registro y arroja el error: *"Este número de documento ya está registrado"*.
*   **Escenario 3 (Habeas Data):** Dado que el hotel opera bajo la legislación colombiana, cuando un usuario completa sus datos, entonces debe aceptar obligatoriamente la casilla de consentimiento de la **Ley de Habeas Data (Ley 1581 de 2012)** para poder habilitar el envío del registro.

---

### 2. HU-002 — Gestión de reservas de unidades
*   **Módulo:** RF-002 · Reservas
*   **Prioridad MoSCoW:** 🔴 MUST HAVE
*   **Puntos de Historia:** 13 puntos
*   **Actor principal:** Recepcionista / Administrador / Huésped registrado

#### Historia de Usuario:
> **Como** huésped registrado en el sistema  
> **Quiero** crear una reserva de habitación seleccionando fechas y tipo de unidad  
> **Para** asegurar mi hospedaje en Apartamentos Facile sin riesgos de sobreventas.

#### Criterios de Aceptación:
*   **Escenario 1 (Reserva Exitosa y Descuento de Larga Estadía):** Dado que tengo un huésped activo en el sistema, cuando elijo una habitación disponible y selecciono fechas para una estancia mayor a **15 noches**, entonces el sistema calcula las noches y liquida un **descuento automático del 15%** sobre el subtotal de alojamiento, registrando la reserva en estado "Confirmada".
*   **Escenario 2 (Bloqueo de Double Booking):** Dado que la habitación "101A" ya se encuentra ocupada del "2026-06-15" al "2026-06-18", cuando intento registrar una nueva reserva para la misma habitación del "2026-06-16" al "2026-06-20", entonces el sistema aborta la transacción y arroja el error: *"Double Booking Detectado"*.
*   **Escenario 3 (Bloqueo por Unidad en Mantenimiento):** Dado que la habitación "202D" está en estado "Mantenimiento", cuando intento crear una reserva sobre esta unidad, entonces el sistema deniega el registro y avisa que la unidad está bajo reparaciones técnicas.
