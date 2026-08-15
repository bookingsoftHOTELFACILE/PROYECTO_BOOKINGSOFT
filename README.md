# BookingSoft - Sistema de Gestión de Reservas

[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-lightgrey.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://www.docker.com/)

**BookingSoft** es una API RESTful desarrollada con Node.js, Express y TypeScript diseñada para la gestión integral de reservas, catálogos de servicios, disponibilidad en tiempo real y prevención de traslape de citas.

---

## 📌 Lista de Chequeo Cumplida (Evaluación)

- [x] **Trazabilidad (GitHub Projects)**: Guía completa en `docs/GITHUB_PROJECTS.md` (Columnas: `backlog`, `en proceso`, `pruebas`, `hecho`).
- [x] **Documentación en GitHub (Markdown)**:
  - `docs/RF.md`: Requerimientos Funcionales (RF-01 a RF-12).
  - `docs/RNF.md`: Requerimientos No Funcionales (RNF-01 a RNF-10).
  - `docs/HU.md`: Historias de Usuario con Criterios de Aceptación (HU-01 a HU-08).
  - `docs/RESTRICCIONES.md`: Restricciones del proyecto.
- [x] **Desarrollo de Código Funcional (>= 80%)**: Lógica completa de servicios, reservas, verificación matemática de disponibilidad sin traslapes, middleware de validación y suite de pruebas Jest.
- [x] **Commits Convencionales**: Normativa de `feat:`, `docs:`, `fix:` documentada en `docs/GIT_WORKFLOW.md`.
- [x] **Estrategia de Ramas Git**:
  - `main`: Exclusivamente producción 100% funcional.
  - `develop`: Integración de desarrollo.
  - `feature/<nombre>`: Desarrollo de características.
  - `docs/<nombre>`: Actualizaciones de documentación.
- [x] **Paquetes y Dependencias**: Versiones **pinadas estricta y exactamente** sin comodines (`^` ni `~`).
- [x] **Única Vía de Entrega**: Repositorio en GitHub + Docker (`Dockerfile` multi-stage y `docker-compose.yml`).

---

## 🚀 Guía de Inicio Rápido (Ejecución Local)

### Prerrequisitos
- Node.js `v20.x` instalado
- Docker y Docker Compose (para despliegue en contenedores)

### 1. Instalación de Dependencias Exactas
```bash
npm install
```

### 2. Modo Desarrollo
```bash
npm run dev
```
La API estará disponible en `http://localhost:3000/api/v1`

### 3. Ejecución de Pruebas Automatizadas
```bash
npm run test
```

### 4. Compilación del Proyecto
```bash
npm run build
```

---

## 🐳 Ejecución con Docker

### Construir y Levantar el Contenedor
```bash
docker-compose up --build -d
```

### Verificar el Estado del Contenedor
```bash
docker-compose ps
```

### Probar el Endpoint de Salud (Healthcheck)
```bash
curl http://localhost:3000/api/v1/health
```

---

## 🔗 Principales Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/v1/health` | Estado del sistema (Healthcheck) |
| `GET` | `/api/v1/services` | Listar catálogo de servicios |
| `POST` | `/api/v1/services` | Crear un nuevo servicio |
| `GET` | `/api/v1/services/:id` | Consultar detalle de servicio |
| `GET` | `/api/v1/bookings` | Listar reservas (con filtro por usuario o fecha) |
| `POST` | `/api/v1/bookings` | Crear reserva (con validación de traslape) |
| `GET` | `/api/v1/bookings/availability` | Consultar bloques libres por servicio y fecha |
| `PATCH` | `/api/v1/bookings/:id/status` | Cambiar estado de reserva (`CONFIRMED`, `CANCELLED`, `COMPLETED`) |
| `POST` | `/api/v1/bookings/:id/cancel` | Cancelar una reserva activamente |
