# HU-014 — Disponibilidad 24/7

<!--
  ¿Qué? Historia de usuario que describe la necesidad de que BookingSoft esté disponible de forma continua.
  ¿Para qué? Formalizar la necesidad de acceso ininterrumpido al sistema dado que la operación hotelera no para.
  ¿Impacto? Una caída del sistema fuera de horario laboral puede impedir registrar check-ins, check-outs o emergencias.
-->

---

## Identificación

| Campo            | Valor                             |
| ---------------- | --------------------------------- |
| **ID**           | HU-014                            |
| **Título**       | Disponibilidad 24/7               |
| **Módulo**       | Disponibilidad y Continuidad      |
| **Prioridad**    | Alta — MUST HAVE                  |
| **Estado**       | Por definir                       |
| **RF asociados** | Por definir                       |

---

## Historia

**Como** conserje o recepcionista de turno nocturno,
**quiero** poder acceder y utilizar BookingSoft en cualquier momento del día o de la noche,
**para** gestionar operaciones urgentes como check-ins tardíos, check-outs anticipados o emergencias sin interrupciones del servicio.

---

## Criterios de aceptación

### CA-014.1 — Acceso continuo al sistema

- **Dado que** soy conserje o recepcionista de turno nocturno,
- **cuando** intento acceder a BookingSoft fuera del horario laboral habitual (noche, fines de semana, días festivos),
- **entonces** el sistema debe estar disponible y funcionando correctamente, permitiéndome realizar todas las operaciones necesarias.

### CA-014.2 — Registro de check-in en horario nocturno

- **Dado que** soy conserje y un huésped llega tarde en la noche,
- **cuando** registro el check-in fuera del horario regular,
- **entonces** el sistema debe procesar el registro correctamente, con la fecha y hora exacta del ingreso, sin restricciones de horario.

### CA-014.3 — Registro de check-out anticipado

- **Dado que** soy conserje y un huésped solicita salir antes de la hora estándar de check-out,
- **cuando** proceso el check-out anticipado,
- **entonces** el sistema debe registrar la salida con la fecha y hora real, calcular el valor correspondiente y generar la cuenta de cobro.

### CA-014.4 — Gestión de incidencias fuera de horario

- **Dado que** soy conserje y ocurre una incidencia durante la noche (solicitud de mantenimiento urgente, problema con una unidad),
- **cuando** registro la incidencia en el sistema,
- **entonces** el sistema debe crear el registro correctamente y, si corresponde, generar las notificaciones necesarias para el personal responsable.

### CA-014.5 — Tiempo de respuesta aceptable

- **Dado que** soy cualquier usuario del sistema y realizo una operación,
- **cuando** el sistema procesa mi solicitud,
- **entonces** debe mostrar el resultado o un mensaje de estado en un tiempo razonable, sin bloqueos prolongados que impidan la operación.

### CA-014.6 — Mensaje informativo ante indisponibilidad programada

- **Dado que** el sistema debe realizarse un mantenimiento programado,
- **cuando** el sistema no está disponible temporalmente,
- **entonces** debe mostrar un mensaje claro informando la causa y el tiempo estimado de restablecimiento del servicio.
