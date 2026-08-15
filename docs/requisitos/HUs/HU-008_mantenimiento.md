# HU-008 — Mantenimiento

<!--
  ¿Qué? Historia de usuario que describe la gestión de solicitudes y tareas de mantenimiento de las unidades.
  ¿Para qué? Formalizar la necesidad de registrar, asignar y hacer seguimiento a las labores de mantenimiento.
  ¿Impacto? Sin este módulo, las unidades con problemas pueden asignarse a huéspedes sin estar en condiciones óptimas.
-->

---

## Identificación

| Campo            | Valor                         |
| ---------------- | ----------------------------- |
| **ID**           | HU-008                        |
| **Título**       | Mantenimiento                 |
| **Módulo**       | Gestión de Mantenimiento      |
| **Prioridad**    | Alta — MUST HAVE              |
| **Estado**       | Por definir                   |
| **RF asociados** | Por definir                   |

---

## Historia

**Como** personal de mantenimiento,
**quiero** registrar, consultar y actualizar el estado de las solicitudes de mantenimiento de las unidades del apartamento Facile,
**para** gestionar eficientemente las reparaciones y garantizar que las unidades estén en óptimas condiciones para los huéspedes.

---

## Criterios de aceptación

### CA-008.1 — Registro de solicitud de mantenimiento

- **Dado que** soy recepcionista, administrador o personal de mantenimiento y detecto un problema en una unidad,
- **cuando** registro una solicitud de mantenimiento indicando la unidad afectada, el tipo de problema y una descripción,
- **entonces** el sistema debe crear la solicitud, asignarle un número de seguimiento y cambiar el estado de la unidad a "en mantenimiento" si aplica.

### CA-008.2 — Asignación de tarea de mantenimiento

- **Dado que** soy administrador o coordinador de mantenimiento y existe una solicitud de mantenimiento pendiente,
- **cuando** asigno la tarea a un integrante del personal de mantenimiento,
- **entonces** el sistema debe notificar al responsable asignado y registrar la asignación con la fecha de inicio esperada.

### CA-008.3 — Actualización del estado de mantenimiento

- **Dado que** soy personal de mantenimiento y tengo una tarea asignada,
- **cuando** actualizo el estado de la tarea (en proceso, completada, requiere repuestos),
- **entonces** el sistema debe reflejar el nuevo estado en la solicitud y registrar la fecha y hora de la actualización.

### CA-008.4 — Cierre de solicitud de mantenimiento

- **Dado que** soy personal de mantenimiento y he completado el trabajo en la unidad,
- **cuando** marco la solicitud como "completada" e ingreso un detalle de las acciones realizadas,
- **entonces** el sistema debe cerrar la solicitud, registrar la fecha de cierre y cambiar el estado de la unidad a "disponible".

### CA-008.5 — Consulta del historial de mantenimiento por unidad

- **Dado que** soy administrador o personal de mantenimiento,
- **cuando** consulto el historial de mantenimiento de una unidad específica,
- **entonces** el sistema debe mostrar todas las solicitudes de mantenimiento registradas para esa unidad, con fechas, tipo de problema, responsable y estado final.

### CA-008.6 — Bloqueo de unidad durante mantenimiento

- **Dado que** una unidad está en estado "en mantenimiento",
- **cuando** el recepcionista intenta asignar esa unidad para un check-in,
- **entonces** el sistema debe impedir la asignación e informar que la unidad no está disponible por encontrarse en mantenimiento.

### CA-008.7 — Priorización de solicitudes

- **Dado que** soy administrador y existen múltiples solicitudes de mantenimiento abiertas,
- **cuando** asigno una prioridad (alta, media o baja) a cada solicitud,
- **entonces** el sistema debe mostrar las solicitudes ordenadas por prioridad para facilitar la planificación del personal.
