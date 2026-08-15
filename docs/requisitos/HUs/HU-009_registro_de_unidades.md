# HU-009 — Registro de Unidades

<!--
  ¿Qué? Historia de usuario que describe el registro y gestión de las unidades (apartamentos) disponibles.
  ¿Para qué? Formalizar la necesidad de mantener el inventario de unidades habitacionales del apartamento Facile.
  ¿Impacto? Sin el registro de unidades, no es posible gestionar reservas, check-in ni disponibilidad.
-->

---

## Identificación

| Campo            | Valor                      |
| ---------------- | -------------------------- |
| **ID**           | HU-009                     |
| **Título**       | Registro de Unidades       |
| **Módulo**       | Gestión de Unidades        |
| **Prioridad**    | Alta — MUST HAVE           |
| **Estado**       | Por definir                |
| **RF asociados** | Por definir                |

---

## Historia

**Como** administrador,
**quiero** registrar y gestionar las unidades habitacionales disponibles en el apartamento Facile,
**para** que el sistema pueda controlar la disponibilidad, asignarlas a huéspedes y gestionar su mantenimiento.

---

## Criterios de aceptación

### CA-009.1 — Registro de nueva unidad

- **Dado que** soy administrador y accedo al módulo de gestión de unidades,
- **cuando** registro una nueva unidad con sus datos (número de unidad, tipo, capacidad, descripción y características),
- **entonces** el sistema debe crear la unidad, asignarle el estado "disponible" por defecto y confirmar el registro.

### CA-009.2 — Número de unidad único

- **Dado que** soy administrador y registro una nueva unidad,
- **cuando** ingreso un número de unidad que ya existe en el sistema,
- **entonces** el sistema debe rechazar el registro e informar que el número de unidad ya está en uso.

### CA-009.3 — Consulta del catálogo de unidades

- **Dado que** soy administrador o recepcionista,
- **cuando** consulto el listado de unidades,
- **entonces** el sistema debe mostrar todas las unidades registradas con su número, tipo, capacidad y estado actual (disponible, ocupada, en mantenimiento).

### CA-009.4 — Actualización de información de unidad

- **Dado que** soy administrador y necesito modificar los datos de una unidad,
- **cuando** edito su información (capacidad, descripción, características) y guardo los cambios,
- **entonces** el sistema debe actualizar la información y confirmar que los cambios fueron guardados.

### CA-009.5 — Cambio de estado de unidad

- **Dado que** soy administrador y necesito cambiar manualmente el estado de una unidad,
- **cuando** selecciono la unidad y cambio su estado (disponible, fuera de servicio),
- **entonces** el sistema debe aplicar el cambio de estado y reflejarlo inmediatamente en la disponibilidad.

### CA-009.6 — Tipos de unidad

- **Dado que** soy administrador y registro una unidad,
- **cuando** selecciono el tipo de unidad (estudio, apartamento de una habitación, apartamento de dos habitaciones, suite u otro tipo definido),
- **entonces** el sistema debe registrar el tipo correctamente y permitir aplicar tarifas diferenciadas por tipo.

### CA-009.7 — Desactivación de unidad

- **Dado que** soy administrador y una unidad queda fuera de operación de forma indefinida,
- **cuando** desactivo la unidad en el sistema,
- **entonces** la unidad debe dejar de aparecer como disponible para check-in y no debe poder ser asignada a nuevas estadías.
