# HU-011 — Inventario y Alertas

<!--
  ¿Qué? Historia de usuario que describe la gestión del inventario de suministros del hotel y sus alertas de stock.
  ¿Para qué? Formalizar la necesidad de controlar los recursos materiales del apartamento Facile.
  ¿Impacto? Sin control de inventario, el hotel puede quedarse sin suministros esenciales para la operación.
-->

---

## Identificación

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| **ID**           | HU-011                      |
| **Título**       | Inventario y Alertas        |
| **Módulo**       | Gestión de Inventario       |
| **Prioridad**    | Media — SHOULD HAVE         |
| **Estado**       | Por definir                 |
| **RF asociados** | Por definir                 |

---

## Historia

**Como** administrador o ama de llaves,
**quiero** registrar y controlar el inventario de suministros del apartamento Facile y recibir alertas cuando el stock esté por agotarse,
**para** garantizar que siempre haya suficientes insumos para la operación normal del hotel y evitar faltantes que afecten el servicio.

---

## Criterios de aceptación

### CA-011.1 — Registro de ítems en inventario

- **Dado que** soy administrador o ama de llaves y accedo al módulo de inventario,
- **cuando** registro un nuevo ítem con su nombre, categoría, unidad de medida, cantidad inicial y cantidad mínima de stock,
- **entonces** el sistema debe crear el ítem en el inventario y confirmarlo.

### CA-011.2 — Actualización de stock

- **Dado que** soy administrador o ama de llaves y se recibe o consume una cantidad de un ítem,
- **cuando** registro el ingreso o la salida del ítem con la cantidad y el motivo,
- **entonces** el sistema debe actualizar el stock disponible y registrar el movimiento con fecha y responsable.

### CA-011.3 — Alerta de stock mínimo

- **Dado que** el sistema monitorea el inventario,
- **cuando** la cantidad disponible de un ítem cae por debajo del nivel mínimo definido,
- **entonces** el sistema debe generar una alerta visible para el administrador o ama de llaves indicando qué ítem requiere reposición.

### CA-011.4 — Consulta del inventario actual

- **Dado que** soy administrador o ama de llaves,
- **cuando** consulto el inventario,
- **entonces** el sistema debe mostrar todos los ítems con su nombre, categoría, stock actual, stock mínimo y estado (normal, por reponer, crítico).

### CA-011.5 — Historial de movimientos de inventario

- **Dado que** soy administrador y necesito auditar los movimientos de un ítem,
- **cuando** consulto el historial de un ítem específico,
- **entonces** el sistema debe mostrar todos los ingresos y salidas registrados, con fecha, cantidad, tipo de movimiento (ingreso o egreso) y usuario responsable.

### CA-011.6 — Filtro por estado de stock

- **Dado que** soy administrador o ama de llaves y reviso el inventario,
- **cuando** filtro los ítems por estado (normal, por reponer, crítico),
- **entonces** el sistema debe mostrar únicamente los ítems que correspondan al estado seleccionado, priorizando los que requieren atención inmediata.
