# HU-015 — Reportes y Ocupación

<!--
  ¿Qué? Historia de usuario que describe la generación de reportes de operación y análisis de ocupación del hotel.
  ¿Para qué? Formalizar la necesidad de disponer de información consolidada para la toma de decisiones gerenciales.
  ¿Impacto? Sin reportes, la administración no puede analizar el desempeño del hotel ni planificar estratégicamente.
-->

---

## Identificación

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| **ID**           | HU-015                      |
| **Título**       | Reportes y Ocupación        |
| **Módulo**       | Reportes y Análisis         |
| **Prioridad**    | Media — SHOULD HAVE         |
| **Estado**       | Por definir                 |
| **RF asociados** | Por definir                 |

---

## Historia

**Como** administrador,
**quiero** generar y consultar reportes de ocupación, ingresos y operación del apartamento Facile en BookingSoft,
**para** analizar el desempeño del hotel, identificar tendencias y tomar decisiones gerenciales informadas.

---

## Criterios de aceptación

### CA-015.1 — Reporte de ocupación por período

- **Dado que** soy administrador y necesito conocer la ocupación del hotel,
- **cuando** solicito el reporte de ocupación para un rango de fechas determinado,
- **entonces** el sistema debe generar un reporte que muestre el porcentaje de ocupación, el número de unidades ocupadas versus disponibles, y el total de noches vendidas en ese período.

### CA-015.2 — Reporte de ingresos por período

- **Dado que** soy administrador y necesito revisar los ingresos del hotel,
- **cuando** solicito el reporte financiero para un período específico (diario, semanal o mensual),
- **entonces** el sistema debe mostrar el total de ingresos, desglosados por concepto (alojamiento, servicios adicionales, sala de juntas u otros), así como el número de estadías registradas en ese período.

### CA-015.3 — Reporte de unidades más ocupadas

- **Dado que** soy administrador y quiero identificar las unidades con mayor demanda,
- **cuando** consulto el reporte de desempeño por unidad,
- **entonces** el sistema debe mostrar un listado de unidades ordenado por número de estadías registradas, porcentaje de ocupación y total de ingresos generados.

### CA-015.4 — Reporte de estadías activas

- **Dado que** soy administrador o recepcionista,
- **cuando** consulto el reporte de estadías activas,
- **entonces** el sistema debe mostrar todas las unidades actualmente ocupadas con el nombre del huésped, la fecha de check-in y la fecha estimada de check-out.

### CA-015.5 — Reporte de historial de huéspedes

- **Dado que** soy administrador y necesito consultar el historial de un huésped,
- **cuando** busco a un huésped por nombre o documento,
- **entonces** el sistema debe mostrar todas las estadías históricas del huésped con fechas, unidad ocupada y total cobrado en cada estadía.

### CA-015.6 — Exportación de reportes

- **Dado que** soy administrador y necesito compartir o archivar un reporte,
- **cuando** solicito exportar el reporte generado,
- **entonces** el sistema debe permitir descargar el reporte en al menos un formato estándar (PDF o Excel), con todos los datos visualizados en pantalla.

### CA-015.7 — Filtros de reporte

- **Dado que** soy administrador y genero un reporte,
- **cuando** aplico filtros (por rango de fechas, por unidad, por tipo de servicio o por estado de estadía),
- **entonces** el sistema debe actualizar los resultados del reporte mostrando únicamente la información que corresponde a los filtros seleccionados.
