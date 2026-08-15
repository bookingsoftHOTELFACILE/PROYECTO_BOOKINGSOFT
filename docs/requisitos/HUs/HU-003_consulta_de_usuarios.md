# HU-003 — Consulta de Usuarios del Sistema

<!--
  ¿Qué? Historia de usuario que describe la consulta del listado general de usuarios registrados.
  ¿Para qué? Formalizar la necesidad de gestionar y visualizar todos los usuarios del sistema.
  ¿Impacto? Sin esta funcionalidad, el administrador no puede supervisar ni gestionar el personal con acceso al sistema.
-->

---

## Identificación

| Campo            | Valor                          |
| ---------------- | ------------------------------ |
| **ID**           | HU-003                         |
| **Título**       | Consulta de Usuarios del Sistema |
| **Módulo**       | Gestión de Usuarios            |
| **Prioridad**    | Alta — MUST HAVE               |
| **Estado**       | Por definir                    |
| **RF asociados** | Por definir                    |

---

## Historia

**Como** administrador del sistema,
**quiero** consultar el listado de todos los usuarios registrados en BookingSoft,
**para** supervisar el personal con acceso al sistema y gestionar sus cuentas cuando sea necesario.

---

## Criterios de aceptación

### CA-003.1 — Visualización del listado de usuarios

- **Dado que** soy administrador y accedo al módulo de gestión de usuarios,
- **cuando** solicito ver el listado de usuarios,
- **entonces** el sistema debe mostrar una lista con todos los usuarios registrados, incluyendo al menos: nombre completo, tipo de documento, número de documento, correo electrónico, rol y estado.

### CA-003.2 — Listado vacío

- **Dado que** soy administrador y accedo al módulo de gestión de usuarios,
- **cuando** no existen usuarios registrados en el sistema,
- **entonces** el sistema debe mostrar un mensaje indicando que no hay usuarios registrados.

### CA-003.3 — Filtro por estado

- **Dado que** soy administrador y visualizo el listado de usuarios,
- **cuando** aplico un filtro por estado (activo o inactivo),
- **entonces** el sistema debe mostrar únicamente los usuarios que correspondan al estado seleccionado.

### CA-003.4 — Filtro por rol

- **Dado que** soy administrador y visualizo el listado de usuarios,
- **cuando** aplico un filtro por rol (administrador, recepcionista, personal de mantenimiento, ama de llaves o conserje),
- **entonces** el sistema debe mostrar únicamente los usuarios que tengan el rol seleccionado.

### CA-003.5 — Acceso restringido al módulo

- **Dado que** soy un usuario con un rol diferente al de administrador,
- **cuando** intento acceder al módulo de consulta de usuarios,
- **entonces** el sistema debe impedir el acceso y mostrar un mensaje indicando que no tengo permisos para esta función.
