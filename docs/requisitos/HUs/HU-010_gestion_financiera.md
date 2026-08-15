# HU-010 — Gestión Financiera

<!--
  ¿Qué? Historia de usuario que describe la gestión de cobros, pagos y facturación del hotel.
  ¿Para qué? Formalizar la necesidad de controlar los ingresos y registrar los pagos de los huéspedes.
  ¿Impacto? Sin gestión financiera, el hotel no puede emitir facturas ni llevar control de sus ingresos.
-->

---

## Identificación

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| **ID**           | HU-010                    |
| **Título**       | Gestión Financiera        |
| **Módulo**       | Gestión Financiera        |
| **Prioridad**    | Alta — MUST HAVE          |
| **Estado**       | Por definir               |
| **RF asociados** | Por definir               |

---

## Historia

**Como** recepcionista o administrador,
**quiero** gestionar los cobros, registrar los pagos y generar las facturas de los huéspedes en BookingSoft,
**para** llevar un control financiero preciso de los ingresos del apartamento Facile y garantizar que cada estadía sea facturada correctamente.

---

## Criterios de aceptación

### CA-010.1 — Generación de cuenta de cobro al hacer check-out

- **Dado que** soy recepcionista y proceso el check-out de un huésped,
- **cuando** el sistema completa el registro de salida,
- **entonces** debe generar automáticamente una cuenta de cobro que incluya el valor de la estadía (noches × tarifa) más todos los servicios y consumos registrados durante la estadía.

### CA-010.2 — Registro de método de pago

- **Dado que** soy recepcionista y proceso el pago de un huésped al check-out,
- **cuando** selecciono el método de pago (efectivo, tarjeta de crédito, tarjeta débito, transferencia bancaria u otro),
- **entonces** el sistema debe registrar el método de pago utilizado junto con el monto pagado.

### CA-010.3 — Generación de factura

- **Dado que** se ha registrado el pago de una estadía,
- **cuando** el recepcionista solicita generar la factura,
- **entonces** el sistema debe generar un documento de factura con los datos del huésped, detalle de servicios, tarifas aplicadas, total cobrado y método de pago utilizado.

### CA-010.4 — Registro de pagos parciales o anticipos

- **Dado que** soy recepcionista y un huésped realiza un anticipo al momento del check-in,
- **cuando** registro el anticipo con el monto y el método de pago,
- **entonces** el sistema debe registrar el anticipo y descontarlo automáticamente del saldo pendiente al momento del check-out.

### CA-010.5 — Consulta de estado de cuenta de una estadía

- **Dado que** soy recepcionista o administrador,
- **cuando** consulto el estado de cuenta de una estadía activa,
- **entonces** el sistema debe mostrar el saldo acumulado hasta la fecha, el desglose de conceptos y el saldo pendiente de cobro.

### CA-010.6 — Resumen financiero del período

- **Dado que** soy administrador y necesito revisar los ingresos del hotel,
- **cuando** consulto el resumen financiero de un período determinado (día, semana o mes),
- **entonces** el sistema debe mostrar el total de ingresos, el número de estadías facturadas y el desglose por tipo de ingreso (alojamiento, servicios adicionales).

### CA-010.7 — Validación de pago completo antes de check-out

- **Dado que** soy recepcionista y proceso el check-out de un huésped,
- **cuando** el saldo pendiente de la estadía no es cero,
- **entonces** el sistema debe alertar sobre el saldo pendiente antes de completar el check-out, solicitando confirmar que el pago ha sido recibido.
