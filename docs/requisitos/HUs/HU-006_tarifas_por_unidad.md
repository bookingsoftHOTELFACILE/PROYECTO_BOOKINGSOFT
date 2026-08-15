# HU-006 — Tarifas por Unidad

<!--
  ¿Qué? Historia de usuario que describe la gestión de tarifas para las unidades del apartamento.
  ¿Para qué? Formalizar la necesidad de configurar y consultar tarifas para la facturación correcta.
  ¿Impacto? Sin tarifas correctamente definidas, no es posible calcular cobros ni gestionar la facturación.
-->

---

## Identificación

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| **ID**           | HU-006                    |
| **Título**       | Tarifas por Unidad        |
| **Módulo**       | Gestión Financiera        |
| **Prioridad**    | Alta — MUST HAVE          |
| **Estado**       | Por definir               |
| **RF asociados** | Por definir               |

---

## Historia

**Como** administrador,
**quiero** configurar y gestionar las tarifas aplicables a cada unidad del apartamento Facile,
**para** que el sistema pueda calcular correctamente los cobros a los huéspedes según el tipo de unidad y el período de estadía.

---

## Criterios de aceptación

### CA-006.1 — Configuración de tarifa base por unidad

- **Dado que** soy administrador y accedo a la configuración de tarifas,
- **cuando** selecciono una unidad y defino su tarifa base (valor por noche),
- **entonces** el sistema debe guardar la tarifa y asociarla correctamente a esa unidad.

### CA-006.2 — Tarifas por tipo de período

- **Dado que** soy administrador y configuro las tarifas de una unidad,
- **cuando** defino tarifas diferenciadas por tipo de período (temporada alta, temporada baja, fin de semana, entre semana),
- **entonces** el sistema debe almacenar cada tarifa con su período correspondiente y aplicarla automáticamente según la fecha de la estadía.

### CA-006.3 — Consulta de tarifas vigentes

- **Dado que** soy recepcionista y necesito informar el costo de una estadía,
- **cuando** selecciono una unidad y un rango de fechas,
- **entonces** el sistema debe mostrar la tarifa vigente aplicable para ese período y el costo total estimado.

### CA-006.4 — Modificación de tarifa existente

- **Dado que** soy administrador y necesito actualizar la tarifa de una unidad,
- **cuando** modifico el valor de la tarifa y guardo los cambios,
- **entonces** el sistema debe actualizar la tarifa y registrar la fecha del cambio, sin afectar las estadías ya registradas anteriormente.

### CA-006.5 — Tarifa no configurada

- **Dado que** soy recepcionista e intento consultar la tarifa de una unidad,
- **cuando** la unidad no tiene tarifa configurada,
- **entonces** el sistema debe informar que la unidad no tiene tarifa definida e indicar que debe ser configurada por el administrador.

### CA-006.6 — Historial de cambios de tarifa

- **Dado que** soy administrador y consulto el historial de tarifas de una unidad,
- **cuando** accedo al registro de cambios,
- **entonces** el sistema debe mostrar todas las tarifas históricas con sus fechas de vigencia, permitiendo auditar los cambios realizados.
