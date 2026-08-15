<![CDATA[<div align="center">

# 🏨 BookingSoft — Hotel Facile

**Sistema integral de gestión hotelera para el Apartahotel Facile**

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Contenedorizado-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/Licencia-ISC-green.svg)](#licencia)

---

*Proyecto formativo desarrollado en el marco del programa SENA — Análisis y Desarrollo de Software*

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Contexto y Alcance](#-contexto-y-alcance)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Módulos del Sistema](#-módulos-del-sistema)
- [Estructura del Repositorio](#-estructura-del-repositorio)
- [Primeros Pasos](#-primeros-pasos)
- [Estrategia de Ramas (Gitflow)](#-estrategia-de-ramas-gitflow)
- [Convenciones del Proyecto](#-convenciones-del-proyecto)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)
- [Documentación](#-documentación)
- [Licencia](#-licencia)

---

## 📖 Descripción del Proyecto

**BookingSoft** es una plataforma web de gestión hotelera diseñada para el **Apartahotel Facile**. El sistema permite administrar de forma integral las operaciones del establecimiento: desde el registro de huéspedes y la gestión de reservas, hasta el control de inventarios, mantenimiento de unidades y generación de reportes financieros.

El proyecto nace como una solución académica con estándares de producción, desarrollada bajo metodologías ágiles y buenas prácticas de ingeniería de software.

### 🎯 Objetivo General

Desarrollar un sistema web que centralice y automatice la gestión operativa del Apartahotel Facile, garantizando disponibilidad 24/7, control de acceso basado en roles (RBAC), integridad en las reservas y trazabilidad documental completa.

---

## 🌍 Contexto y Alcance

| Aspecto | Detalle |
|---|---|
| **Tipo de proyecto** | Formativo — SENA |
| **Establecimiento** | Apartahotel Facile |
| **Usuarios del sistema** | Administrador, Recepcionista, Ama de Llaves, Mantenimiento, Conserje |
| **Disponibilidad** | 24 horas / 7 días (operación continua) |
| **Servicios complementarios** | Sala de Juntas y Coworking (reserva por horas, abierto a externos) |

---

## 🛠 Stack Tecnológico

<table>
  <tr>
    <th>Capa</th>
    <th>Tecnología</th>
    <th>Propósito</th>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Python + FastAPI</td>
    <td>API RESTful, validación automática, documentación Swagger</td>
  </tr>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React + JavaScript</td>
    <td>Interfaz de usuario SPA</td>
  </tr>
  <tr>
    <td><strong>Base de Datos</strong></td>
    <td>PostgreSQL 16</td>
    <td>Almacenamiento relacional con integridad transaccional</td>
  </tr>
  <tr>
    <td><strong>Contenedorización</strong></td>
    <td>Docker + Docker Compose</td>
    <td>Entorno reproducible y despliegue consistente</td>
  </tr>
  <tr>
    <td><strong>Seguridad</strong></td>
    <td>bcrypt + RBAC</td>
    <td>Cifrado de contraseñas y control de acceso por roles</td>
  </tr>
  <tr>
    <td><strong>Documentación API</strong></td>
    <td>Swagger (OpenAPI)</td>
    <td>Documentación interactiva autogenerada</td>
  </tr>
  <tr>
    <td><strong>Herramientas</strong></td>
    <td>VS Code + Antigravity</td>
    <td>Entorno de desarrollo con asistente de IA</td>
  </tr>
</table>

---

## 🏗 Arquitectura del Sistema

```
┌──────────────────┐       HTTP/JSON       ┌──────────────────┐
│                  │ ◄──────────────────► │                  │
│   Frontend       │                       │   Backend        │
│   React + JS     │                       │   Python/FastAPI │
│                  │                       │                  │
└──────────────────┘                       └────────┬─────────┘
                                                    │
                                                    │ SQL
                                                    ▼
                                           ┌──────────────────┐
                                           │                  │
                                           │   PostgreSQL     │
                                           │                  │
                                           └──────────────────┘

         Todo contenedorizado con Docker Compose
```

> La arquitectura sigue un patrón **cliente-servidor desacoplado**, comunicándose exclusivamente mediante peticiones HTTP en formato JSON.

---

## 📦 Módulos del Sistema

| # | Módulo | Descripción | Prioridad |
|---|---|---|---|
| 1 | **Gestión de Usuarios** | Registro, autenticación, roles (RBAC), estados | 🔴 Alta |
| 2 | **Reservas y Ocupación** | Check-in/out, disponibilidad, prevención de sobre-reserva | 🔴 Alta |
| 3 | **Unidades Habitacionales** | Registro de apartamentos, estados, capacidad | 🔴 Alta |
| 4 | **Tarifas** | Tarifas por tipo de unidad y temporada | 🟡 Media |
| 5 | **Servicios y Consumos** | Catálogo de servicios adicionales, registro de consumos | 🟡 Media |
| 6 | **Gestión Financiera** | Facturación, pagos, cierres de caja | 🟡 Media |
| 7 | **Inventario y Alertas** | Control de stock con alertas de nivel mínimo | 🟡 Media |
| 8 | **Mantenimiento** | Solicitudes, estados, historial por unidad | 🟡 Media |
| 9 | **Sala de Juntas / Coworking** | Reserva por horas, disponible para externos | 🟢 Baja |
| 10 | **Notificaciones** | Alertas internas del sistema | 🟢 Baja |
| 11 | **Reportes y Ocupación** | Dashboard, estadísticas, ocupación histórica | 🟢 Baja |

---

## 📂 Estructura del Repositorio

```
PROYECTO_FACILE/
│
├── 📄 README.md                      ← Este archivo
├── 🐳 Dockerfile
├── 🐳 docker-compose.yml
├── 📄 .gitignore
├── 📄 .env.example                   ← Variables de entorno (plantilla)
│
├── 📁 docs/                          ← Documentación del proyecto
│   └── 📁 requisitos/
│       ├── 📁 HUs/                   ← 15 Historias de Usuario
│       │   ├── HU-001_registro_de_usuario.md
│       │   ├── HU-002_inicio_de_sesion.md
│       │   └── ...
│       ├── 📁 RFs/                   ← 15 Requisitos Funcionales
│       │   ├── RF-001_registro_de_usuario.md
│       │   └── ...
│       ├── 📁 RNFs/                  ← 11 Requisitos No Funcionales
│       │   ├── RNF-001_formato_respuesta_api.md
│       │   └── ...
│       └── 📄 restricciones.md       ← Restricciones del proyecto
│
├── 📁 backend/                       ← Servidor FastAPI (Python)
│   ├── 📁 app/
│   │   ├── 📁 routers/
│   │   ├── 📁 models/
│   │   ├── 📁 schemas/
│   │   ├── 📁 services/
│   │   └── main.py
│   ├── requirements.txt
│   └── ...
│
├── 📁 frontend/                      ← Cliente React (JavaScript)
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 pages/
│   │   ├── 📁 services/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
│
└── 📁 tests/                         ← Pruebas automatizadas
```

> **Nota:** La estructura de `backend/` y `frontend/` refleja la arquitectura objetivo. Las carpetas se irán poblando conforme avance el desarrollo.

---

## 🚀 Primeros Pasos

### Prerrequisitos

- [Python 3.12+](https://www.python.org/downloads/)
- [Node.js 20.x](https://nodejs.org/) (para el frontend)
- [Docker](https://www.docker.com/) y Docker Compose
- [Git](https://git-scm.com/)

### 1. Clonar el repositorio

```bash
git clone https://github.com/bookingsoftHOTELFACILE/PROYECTO_FACILE.git
cd PROYECTO_FACILE
```

### 2. Cambiar a la rama de desarrollo

```bash
git checkout develop
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales locales
```

### 4. Levantar con Docker

```bash
docker-compose up --build -d
```

### 5. Verificar que todo funciona

```bash
# Healthcheck del backend
curl http://localhost:8000/api/v1/health

# Frontend en el navegador
open http://localhost:3000
```

---

## 🌿 Estrategia de Ramas (Gitflow)

```
main ─────────────────────────────────────── (producción estable)
  │
  └── develop ────────────────────────────── (integración)
        │
        ├── feature/nombre-feature ───────── (nueva funcionalidad)
        ├── docs/nombre-documento ─────────── (documentación)
        └── hotfix/descripcion-fix ────────── (corrección urgente)
```

| Rama | Propósito | Se crea desde | Se mergea a |
|---|---|---|---|
| `main` | Producción estable | — | — |
| `develop` | Integración de desarrollo | `main` | `main` (release) |
| `feature/*` | Nuevas funcionalidades | `develop` | `develop` |
| `docs/*` | Actualizaciones de documentación | `develop` | `develop` |
| `hotfix/*` | Correcciones urgentes en producción | `main` | `main` + `develop` |

### Nomenclatura de ramas

```
feature/modulo-descripcion      → feature/auth-registro-usuario
docs/tipo-documento             → docs/requisitos-hus
hotfix/descripcion-corta        → hotfix/fix-login-validation
```

---

## 📐 Convenciones del Proyecto

### Commits Convencionales

Todos los mensajes de commit deben seguir la convención de [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar endpoint de registro de usuario
fix: corregir validación de fechas en reservas
docs: actualizar HU-005 con criterios de check-out
test: agregar pruebas para servicio de reservas
refactor: reorganizar estructura de rutas del backend
chore: actualizar dependencias de Docker
```

### Idiomas

| Elemento | Idioma |
|---|---|
| Código fuente (variables, funciones, endpoints, DB) | 🇬🇧 **Inglés** |
| Documentación, HUs, RFs, RNFs, comentarios | 🇪🇸 **Español** |
| Commits | 🇪🇸 **Español** |

### Seguridad

- ✅ Contraseñas cifradas con **bcrypt** (nunca en texto plano)
- ✅ Credenciales en **variables de entorno** (nunca en el repositorio)
- ✅ Control de acceso basado en roles (**RBAC**)
- ✅ Mensajes de error genéricos en autenticación

---

## 👥 Equipo de Desarrollo

<div align="center">

| Integrante | GitHub |
|---|---|
| **José Chico** | [![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)](#) |
| **Maicol Mayor** | [![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)](#) |
| **Ashly Echeverri** | [![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)](#) |
| **Sebastián Parada** | [![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)](#) |
| **David López** | [![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)](https://github.com/Davidlopez2204) |

*Programa de formación: Análisis y Desarrollo de Software — SENA*

</div>

---

## 📚 Documentación

Toda la documentación del proyecto se encuentra en la carpeta [`docs/requisitos/`](docs/requisitos/):

| Tipo | Cantidad | Ubicación |
|---|---|---|
| Historias de Usuario (HUs) | 15 | [`docs/requisitos/HUs/`](docs/requisitos/HUs/) |
| Requisitos Funcionales (RFs) | 15 | [`docs/requisitos/RFs/`](docs/requisitos/RFs/) |
| Requisitos No Funcionales (RNFs) | 11 | [`docs/requisitos/RNFs/`](docs/requisitos/RNFs/) |
| Restricciones | 1 | [`docs/requisitos/restricciones.md`](docs/requisitos/restricciones.md) |

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**Hecho con ❤️ por el equipo BookingSoft — SENA 2026**

</div>
]]>
