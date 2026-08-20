# HU-012 — Notificaciones

<!--
  ¿Qué? Historia de usuario que describe el sistema de notificaciones internas del hotel.
  ¿Para qué? Formalizar la necesidad de comunicar eventos relevantes al personal del sistema de forma oportuna.
  ¿Impacto? Sin notificaciones, el personal puede no enterarse de eventos críticos como alertas de mantenimiento o stock bajo.
-->

---

## Identificación

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| **ID**           | HU-012                    |
| **Título**       | Notificaciones            |
| **Módulo**       | Notificaciones            |
| **Prioridad**    | Media — SHOULD HAVE       |
| **Estado**       | Por definir               |
| **RF asociados** | Por definir               |

---

## Historia

**Como** usuario del sistema (administrador, recepcionista, ama de llaves o personal de mantenimiento),
**quiero** recibir notificaciones sobre eventos relevantes de la operación del apartamento Facile directamente en el sistema,
**para** estar informado de manera oportuna y poder reaccionar a tiempo ante situaciones que requieran atención.

---

## Criterios de aceptación

### CA-012.1 — Notificación de nueva solicitud de mantenimiento

- **Dado que** se registra una nueva solicitud de mantenimiento en el sistema,
- **cuando** la solicitud es asignada al personal de mantenimiento,
- **entonces** el responsable asignado debe recibir una notificación en el sistema informando el número de solicitud, la unidad afectada y la prioridad.

### CA-012.2 — Notificación de alerta de stock mínimo

- **Dado que** un ítem del inventario cae por debajo de su nivel mínimo,
- **cuando** el sistema detecta la condición de stock bajo,
- **entonces** el administrador y el ama de llaves deben recibir una notificación indicando el ítem afectado y la cantidad disponible actual.

### CA-012.3 — Notificación de check-in programado

- **Dado que** existe una reserva confirmada con fecha de check-in para el día actual,
- **cuando** se aproxima la hora de llegada del huésped,
- **entonces** el recepcionista debe recibir una notificación recordando el check-in pendiente con el nombre del huésped y la unidad asignada.

### CA-012.4 — Notificación de check-out pendiente

- **Dado que** una estadía activa tiene fecha de check-out para el día actual,
- **cuando** la hora de salida se aproxima,
- **entonces** el recepcionista debe recibir una notificación indicando el check-out pendiente con el nombre del huésped y la unidad.

### CA-012.5 — Centro de notificaciones

- **Dado que** soy cualquier usuario del sistema,
- **cuando** accedo al centro de notificaciones,
- **entonces** debo ver el listado de todas mis notificaciones con su estado (leída o no leída), fecha, tipo y descripción.

### CA-012.6 — Marcado de notificación como leída

- **Dado que** tengo notificaciones pendientes de leer,
- **cuando** hago clic en una notificación o la marco manualmente como leída,
- **entonces** el sistema debe cambiar su estado a "leída" y dejar de incluirla en el contador de notificaciones no leídas.

### CA-012.7 — Notificaciones según rol

- **Dado que** el sistema genera un evento interno,
- **cuando** envía las notificaciones correspondientes,
- **entonces** cada notificación debe dirigirse únicamente a los roles que tienen responsabilidad sobre ese evento, evitando enviar información irrelevante a otros usuarios.
