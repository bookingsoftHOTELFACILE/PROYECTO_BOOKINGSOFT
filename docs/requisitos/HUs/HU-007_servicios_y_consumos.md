# HU-007 — Servicios y Consumos

<!--
  ¿Qué? Historia de usuario que describe el registro y gestión de servicios adicionales y consumos de los huéspedes.
  ¿Para qué? Formalizar la necesidad de controlar y facturar los servicios y consumos durante la estadía.
  ¿Impacto? Sin este registro, los servicios adicionales consumidos no pueden ser facturados correctamente.
-->

---

## Identificación

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| **ID**           | HU-007                    |
| **Título**       | Servicios y Consumos      |
| **Módulo**       | Gestión de Servicios      |
| **Prioridad**    | Alta — MUST HAVE          |
| **Estado**       | Por definir               |
| **RF asociados** | Por definir               |

---

## Historia

**Como** recepcionista,
**quiero** registrar los servicios adicionales y consumos de los huéspedes durante su estadía en el apartamento Facile,
**para** que estos sean incluidos en la factura final y no queden consumos sin cobrar.

---

## Criterios de aceptación

### CA-007.1 — Registro de servicio adicional

- **Dado que** soy recepcionista y un huésped solicita un servicio adicional (lavandería, alimentación, transporte u otro),
- **cuando** registro el servicio indicando el tipo, la descripción, la cantidad y el valor,
- **entonces** el sistema debe asociar el servicio a la estadía activa del huésped y confirmarlo.

### CA-007.2 — Registro de consumo

- **Dado que** soy recepcionista o ama de llaves y necesito registrar un consumo del huésped (minibar, telefonía u otro),
- **cuando** ingreso el detalle del consumo con su valor,
- **entonces** el sistema debe asociar el consumo a la estadía activa del huésped y sumarlo al total pendiente de cobro.

### CA-007.3 — Consulta de servicios y consumos por estadía

- **Dado que** soy recepcionista y necesito revisar los cargos de un huésped,
- **cuando** consulto los servicios y consumos asociados a una estadía activa o histórica,
- **entonces** el sistema debe mostrar el listado detallado de todos los servicios y consumos registrados, con su descripción, cantidad, valor unitario y total acumulado.

### CA-007.4 — Eliminación o corrección de un cargo incorrecto

- **Dado que** soy recepcionista y detecto que se registró un servicio o consumo de forma incorrecta,
- **cuando** solicito su corrección o eliminación,
- **entonces** el sistema debe permitir la modificación o anulación del cargo, registrando el motivo del cambio.

### CA-007.5 — Inclusión automática en factura

- **Dado que** se realiza el check-out de un huésped con servicios o consumos registrados,
- **cuando** el sistema genera la cuenta de cobro,
- **entonces** todos los servicios y consumos registrados durante la estadía deben estar incluidos automáticamente en el total a pagar.

### CA-007.6 — Catálogo de servicios disponibles

- **Dado que** soy recepcionista y voy a registrar un servicio adicional,
- **cuando** abro el formulario de registro de servicios,
- **entonces** el sistema debe mostrar un catálogo de los servicios disponibles con su descripción y valor predefinido, permitiendo también ingresar servicios personalizados.
