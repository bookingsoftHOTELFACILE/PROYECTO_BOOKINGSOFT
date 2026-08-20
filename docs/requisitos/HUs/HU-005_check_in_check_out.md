# HU-005 — Check-in y Check-out

<!--
  ¿Qué? Historia de usuario que describe el registro de entrada y salida de huéspedes.
  ¿Para qué? Formalizar la necesidad de gestionar la llegada y salida de huéspedes en los apartamentos.
  ¿Impacto? Es el proceso central de la operación hotelera; sin él no se puede controlar la ocupación.
-->

---

## Identificación

| Campo            | Valor                          |
| ---------------- | ------------------------------ |
| **ID**           | HU-005                         |
| **Título**       | Check-in y Check-out           |
| **Módulo**       | Reservas y Ocupación           |
| **Prioridad**    | Alta — MUST HAVE               |
| **Estado**       | Por definir                    |
| **RF asociados** | Por definir                    |

---

## Historia

**Como** recepcionista,
**quiero** registrar el check-in y el check-out de los huéspedes en las unidades del apartamento Facile,
**para** controlar la ocupación de las unidades, actualizar su disponibilidad y generar el registro completo de la estadía.

---

## Criterios de aceptación

### CA-005.1 — Registro de check-in

- **Dado que** soy recepcionista y un huésped se presenta para ingresar a su unidad reservada,
- **cuando** registro el check-in con los datos del huésped (nombre, documento, número de personas) y selecciono la unidad asignada,
- **entonces** el sistema debe registrar la fecha y hora de entrada, cambiar el estado de la unidad a "ocupada" y confirmar el check-in exitoso.

### CA-005.2 — Check-in sin reserva previa

- **Dado que** soy recepcionista y un huésped solicita ingreso sin reserva previa,
- **cuando** verifico la disponibilidad de unidades y existe al menos una disponible,
- **entonces** el sistema debe permitirme registrar el check-in directamente, seleccionando la unidad disponible y registrando los datos del huésped.

### CA-005.3 — Check-in en unidad no disponible

- **Dado que** soy recepcionista e intento hacer check-in en una unidad,
- **cuando** la unidad seleccionada ya está en estado "ocupada" o "en mantenimiento",
- **entonces** el sistema debe impedir el check-in e informar el estado actual de la unidad.

### CA-005.4 — Registro de check-out

- **Dado que** soy recepcionista y un huésped desea hacer salida de su unidad,
- **cuando** registro el check-out indicando la unidad y el huésped correspondiente,
- **entonces** el sistema debe registrar la fecha y hora de salida, cambiar el estado de la unidad a "disponible" y generar el resumen de la estadía.

### CA-005.5 — Cálculo de duración de estadía

- **Dado que** se realiza el check-out de un huésped,
- **cuando** el sistema procesa la salida,
- **entonces** debe calcular automáticamente el número de noches de estadía a partir de las fechas de check-in y check-out registradas.

### CA-005.6 — Historial de estadías

- **Dado que** soy recepcionista o administrador,
- **cuando** consulto el historial de una unidad o de un huésped,
- **entonces** el sistema debe mostrar el registro de todas las estadías anteriores con sus fechas de entrada, salida y estado.

### CA-005.7 — Verificación de documentos del huésped

- **Dado que** soy recepcionista y estoy registrando el check-in de un huésped,
- **cuando** ingreso el número de documento del huésped,
- **entonces** el sistema debe registrar y almacenar el tipo y número de documento del huésped junto con los datos de la estadía.
