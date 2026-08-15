# HU-001 — Registrar Usuario del Sistema

<!--
  ¿Qué? Historia de usuario que describe el registro de un nuevo usuario en BookingSoft.
  ¿Para qué? Formalizar la necesidad de crear cuentas de acceso para el personal del hotel.
  ¿Impacto? Sin usuarios registrados, el personal no puede acceder al sistema de gestión hotelera.
-->

---

## Identificación

| Campo            | Valor                                 |
| ---------------- | ------------------------------------- |
| **ID**           | HU-001                                |
| **Título**       | Registrar Usuario del Sistema         |
| **Módulo**       | Gestión de Usuarios                   |
| **Prioridad**    | Alta — MUST HAVE                      |
| **Estado**       | Por definir                           |
| **RF asociados** | Por definir                           |

---

## Historia

**Como** administrador del sistema,
**quiero** registrar nuevos usuarios del personal del hotel con sus datos personales y credenciales de acceso,
**para** que puedan autenticarse en BookingSoft y desempeñar sus funciones según su rol asignado.

---

## Criterios de aceptación

### CA-001.1 — Campos obligatorios del formulario de registro

- **Dado que** soy administrador y accedo al formulario de registro de usuarios,
- **cuando** visualizo el formulario,
- **entonces** debo encontrar campos para: tipo de documento, número de documento, nombres, apellidos, fecha de nacimiento, sexo, dirección, teléfono, correo electrónico y contraseña.

### CA-001.2 — Registro exitoso de usuario

- **Dado que** soy administrador y he completado todos los campos obligatorios con datos válidos,
- **cuando** envío el formulario de registro,
- **entonces** el sistema debe crear el usuario, asignarle el rol por defecto, dejarlo en estado activo y confirmar el registro exitoso.

### CA-001.3 — Documento de identidad único

- **Dado que** soy administrador y estoy registrando un usuario,
- **cuando** ingreso un número de documento que ya existe en el sistema,
- **entonces** el sistema debe rechazar el registro e informar que el número de documento ya está registrado.

### CA-001.4 — Correo electrónico único

- **Dado que** soy administrador y estoy registrando un usuario,
- **cuando** ingreso una dirección de correo electrónico que ya existe en el sistema,
- **entonces** el sistema debe rechazar el registro e informar que el correo ya está en uso.

### CA-001.5 — Validación de tipo de documento

- **Dado que** soy administrador y estoy registrando un usuario,
- **cuando** selecciono el tipo de documento (cédula de ciudadanía, pasaporte, cédula de extranjería u otro tipo válido),
- **entonces** el sistema debe aceptar únicamente los tipos de documento definidos para el sistema.

### CA-001.6 — Cifrado de contraseña

- **Dado que** se crea un nuevo usuario en el sistema,
- **cuando** el registro es procesado,
- **entonces** la contraseña del usuario debe almacenarse de forma cifrada y nunca en texto plano.

### CA-001.7 — Asignación de rol por defecto

- **Dado que** se registra un nuevo usuario sin especificar un rol personalizado,
- **cuando** el registro es exitoso,
- **entonces** el sistema debe asignar automáticamente el rol por defecto establecido en la configuración del sistema.

### CA-001.8 — Estado activo al registrar

- **Dado que** se ha creado un nuevo usuario exitosamente,
- **cuando** el usuario queda registrado en el sistema,
- **entonces** su estado inicial debe ser "activo", permitiéndole iniciar sesión de inmediato.

### CA-001.9 — Validación de campos vacíos

- **Dado que** soy administrador y completo el formulario de registro,
- **cuando** dejo uno o más campos obligatorios sin completar y envío el formulario,
- **entonces** el sistema debe indicar qué campos son obligatorios y no debe crear el usuario.
