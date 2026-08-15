# HU-004 — Consulta de Usuario Específico

<!--
  ¿Qué? Historia de usuario que describe la consulta del detalle de un usuario individual.
  ¿Para qué? Formalizar la necesidad de visualizar la información completa de un usuario concreto.
  ¿Impacto? Permite al administrador revisar, editar o desactivar cuentas individuales de personal.
-->

---

## Identificación

| Campo            | Valor                            |
| ---------------- | -------------------------------- |
| **ID**           | HU-004                           |
| **Título**       | Consulta de Usuario Específico   |
| **Módulo**       | Gestión de Usuarios              |
| **Prioridad**    | Alta — MUST HAVE                 |
| **Estado**       | Por definir                      |
| **RF asociados** | Por definir                      |

---

## Historia

**Como** administrador del sistema,
**quiero** consultar la información completa de un usuario específico registrado en BookingSoft,
**para** revisar sus datos, verificar su rol y gestionar su estado de cuenta cuando sea necesario.

---

## Criterios de aceptación

### CA-004.1 — Visualización del perfil de usuario

- **Dado que** soy administrador y he seleccionado un usuario del listado,
- **cuando** accedo a su perfil,
- **entonces** el sistema debe mostrar toda la información del usuario: tipo de documento, número de documento, nombres, apellidos, fecha de nacimiento, sexo, dirección, teléfono, correo electrónico, rol y estado.

### CA-004.2 — Usuario no encontrado

- **Dado que** soy administrador y solicito la información de un usuario,
- **cuando** el usuario no existe en el sistema,
- **entonces** el sistema debe informar que el usuario no fue encontrado.

### CA-004.3 — Actualización de datos del usuario

- **Dado que** soy administrador y visualizo el perfil de un usuario,
- **cuando** modifico uno o más campos de su información y guardo los cambios,
- **entonces** el sistema debe actualizar la información del usuario y confirmar que la actualización fue exitosa.

### CA-004.4 — Cambio de estado del usuario

- **Dado que** soy administrador y visualizo el perfil de un usuario,
- **cuando** cambio el estado del usuario de activo a inactivo (o viceversa),
- **entonces** el sistema debe aplicar el cambio y reflejar el nuevo estado del usuario inmediatamente.

### CA-004.5 — Cambio de rol del usuario

- **Dado que** soy administrador y visualizo el perfil de un usuario,
- **cuando** asigno un nuevo rol al usuario y guardo los cambios,
- **entonces** el sistema debe actualizar el rol del usuario, y los permisos de acceso correspondientes deben aplicarse en la siguiente sesión del usuario.

### CA-004.6 — Acceso restringido a la consulta de usuarios específicos

- **Dado que** soy un usuario con un rol diferente al de administrador,
- **cuando** intento acceder al perfil de otro usuario del sistema,
- **entonces** el sistema debe impedir el acceso y mostrar un mensaje indicando que no tengo permisos para esta función.
