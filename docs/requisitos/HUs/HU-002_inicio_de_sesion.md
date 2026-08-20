# HU-002 — Inicio de Sesión

<!--
  ¿Qué? Historia de usuario que describe el proceso de autenticación en BookingSoft.
  ¿Para qué? Formalizar la necesidad de que el personal del hotel acceda de forma segura al sistema.
  ¿Impacto? Sin autenticación, el sistema no puede identificar ni autorizar a los usuarios para sus funciones.
-->

---

## Identificación

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| **ID**           | HU-002                      |
| **Título**       | Inicio de Sesión            |
| **Módulo**       | Autenticación               |
| **Prioridad**    | Alta — MUST HAVE            |
| **Estado**       | Por definir                 |
| **RF asociados** | Por definir                 |

---

## Historia

**Como** usuario del sistema (administrador, recepcionista, personal de mantenimiento, ama de llaves o conserje),
**quiero** iniciar sesión con mis credenciales en BookingSoft,
**para** acceder a las funcionalidades del sistema según mi rol asignado.

---

## Criterios de aceptación

### CA-002.1 — Formulario de inicio de sesión

- **Dado que** soy un usuario del sistema y accedo a la pantalla de inicio de sesión,
- **cuando** visualizo el formulario,
- **entonces** debo encontrar campos para correo electrónico y contraseña.

### CA-002.2 — Inicio de sesión exitoso

- **Dado que** soy un usuario registrado y activo en el sistema,
- **cuando** ingreso mi correo electrónico y contraseña correctos y envío el formulario,
- **entonces** el sistema debe autenticarme y redirigirme al panel principal correspondiente a mi rol.

### CA-002.3 — Credenciales incorrectas

- **Dado que** soy un usuario del sistema e ingreso credenciales inválidas,
- **cuando** envío el formulario de inicio de sesión,
- **entonces** el sistema debe mostrar un mensaje de error indicando que las credenciales son incorrectas, sin revelar cuál de los dos campos es incorrecto.

### CA-002.4 — Usuario inactivo

- **Dado que** mi cuenta de usuario está en estado inactivo,
- **cuando** intento iniciar sesión con mis credenciales correctas,
- **entonces** el sistema debe rechazar el acceso e informar que mi cuenta está inactiva.

### CA-002.5 — Cierre de sesión

- **Dado que** tengo una sesión activa en el sistema,
- **cuando** selecciono la opción de cerrar sesión,
- **entonces** el sistema debe finalizar mi sesión y redirigirme a la pantalla de inicio de sesión.

### CA-002.6 — Restricción de acceso por rol

- **Dado que** he iniciado sesión exitosamente,
- **cuando** intento acceder a una sección del sistema que no corresponde a mi rol,
- **entonces** el sistema debe impedirme el acceso y mostrar un mensaje indicando que no tengo permisos suficientes.
