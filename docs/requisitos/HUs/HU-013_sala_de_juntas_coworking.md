# HU-013 — Sala de Juntas / Coworking

<!--
  ¿Qué? Historia de usuario que describe la gestión de reservas y uso del espacio de sala de juntas y coworking.
  ¿Para qué? Formalizar la necesidad de administrar espacios adicionales del apartamento Facile fuera de las unidades habitacionales.
  ¿Impacto? Sin este módulo, los espacios compartidos no pueden gestionarse, generando conflictos de uso o pérdidas de ingresos.
-->

---

## Identificación

| Campo            | Valor                              |
| ---------------- | ---------------------------------- |
| **ID**           | HU-013                             |
| **Título**       | Sala de Juntas / Coworking         |
| **Módulo**       | Gestión de Espacios Adicionales    |
| **Prioridad**    | Media — SHOULD HAVE                |
| **Estado**       | Por definir                        |
| **RF asociados** | Por definir                        |

---

## Historia

**Como** recepcionista o administrador,
**quiero** gestionar la disponibilidad y reservas de la sala de juntas y el espacio de coworking del apartamento Facile,
**para** controlar su uso, evitar conflictos de horario y registrar los cargos correspondientes cuando aplique.

---

## Criterios de aceptación

### CA-013.1 — Consulta de disponibilidad del espacio

- **Dado que** soy recepcionista o administrador y necesito conocer la disponibilidad de un espacio (sala de juntas o coworking),
- **cuando** consulto la disponibilidad para una fecha y rango horario específicos,
- **entonces** el sistema debe mostrar si el espacio está disponible u ocupado en ese período.

### CA-013.2 — Registro de reserva de espacio

- **Dado que** soy recepcionista y un huésped o cliente desea reservar la sala de juntas o el coworking,
- **cuando** registro la reserva con el nombre del solicitante, fecha, hora de inicio, hora de fin y propósito,
- **entonces** el sistema debe crear la reserva, bloquear el espacio para ese período y confirmar la reserva exitosamente.

### CA-013.3 — Conflicto de horario

- **Dado que** soy recepcionista e intento registrar una reserva de un espacio,
- **cuando** el espacio ya tiene una reserva activa que se superpone con el horario solicitado,
- **entonces** el sistema debe rechazar la nueva reserva e informar que el espacio no está disponible en ese horario.

### CA-013.4 — Cancelación de reserva

- **Dado que** soy recepcionista o administrador y necesito cancelar una reserva de espacio,
- **cuando** selecciono la reserva y confirmo su cancelación,
- **entonces** el sistema debe cancelar la reserva, liberar el espacio para ese horario y registrar el motivo de la cancelación si se indica.

### CA-013.5 — Registro de cargo por uso del espacio

- **Dado que** el uso de la sala de juntas o coworking tiene un costo asociado,
- **cuando** se registra o completa una reserva,
- **entonces** el sistema debe permitir asociar el cargo correspondiente a la cuenta del huésped o generar un cobro independiente según corresponda.

### CA-013.6 — Listado de reservas del espacio

- **Dado que** soy administrador o recepcionista,
- **cuando** consulto el calendario o listado de reservas de un espacio para un período,
- **entonces** el sistema debe mostrar todas las reservas programadas con nombre del solicitante, fecha, horario y estado (confirmada, cancelada, completada).
