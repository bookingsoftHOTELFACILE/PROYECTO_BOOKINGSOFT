# Guía de Inicio del Proyecto React con Vite

Este documento contiene las especificaciones e instrucciones detalladas sobre cómo fue creado el proyecto, cómo instalar sus dependencias y cómo ejecutarlo localmente.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS más reciente).
*   [npm](https://www.npmjs.com/) (se instala automáticamente junto con Node.js).

---

## 🚀 Cómo Arrancar el Proyecto (Paso a Paso)

Si acabas de clonar o descargar el repositorio, sigue estos pasos para poner en marcha la aplicación:

### 1. Entrar en la carpeta del proyecto
Abre una terminal en la raíz de este directorio y desplázate dentro de la carpeta `proyecto_react`:
```bash
cd proyecto_react
```

### 2. Instalar las dependencias
Instala todas las librerías necesarias especificadas en el archivo `package.json`:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Ejecuta el servidor local de Vite. Esto compilará el proyecto y lo servirá en tu navegador web:
```bash
npm run dev
```
*Una vez que se ejecute, abre tu navegador en la dirección local que te indique la consola (generalmente `http://localhost:5173`).*

---

## 📋 Otros Comandos Disponibles

Dentro de la carpeta `proyecto_react`, también puedes utilizar los siguientes comandos:

*   **Crear compilación para producción:**
    ```bash
    npm run build
    ```
    *Genera la carpeta `dist/` con el código optimizado, minificado y listo para ser desplegado en un servidor web.*

*   **Previsualizar la versión de producción localmente:**
    ```bash
    npm run preview
    ```
    *Arranca un servidor local que sirve los archivos compilados en la carpeta `dist/` para probar que todo funcione correctamente antes del despliegue.*

*   **Ejecutar el formateador y analizador de código (Linter):**
    ```bash
    npm run lint
    ```
    *Utiliza ESLint para buscar errores de sintaxis o malas prácticas de código.*

---

## 📐 Especificaciones de Creación del Proyecto

El proyecto se estructuró y configuró utilizando las siguientes herramientas modernas:

### 1. Inicialización con Vite
Se seleccionó **Vite** en lugar de *Create React App* debido a su velocidad ultrarrápida de compilación e inicio del servidor de desarrollo (Hot Module Replacement - HMR). El comando utilizado originalmente para inicializar la base del proyecto fue:
```bash
npm create vite@latest proyecto_react -- --template react
```

### 2. Versiones de Dependencias Clave (vía `package.json`)
*   **React:** `^19.2.6` (última versión estable de React con soporte para Hooks avanzados y mejoras de rendimiento).
*   **React DOM:** `^19.2.6` (módulo de renderizado en el navegador).
*   **React Router DOM:** `^6.28.2` (librería para gestionar las rutas y navegación multipágina de la aplicación de forma declarativa).

---

## 📂 Estructura Principal del Proyecto

La carpeta principal donde se realiza el desarrollo es `proyecto_react/src/`. A continuación, se detalla la función de cada archivo y directorio:

```text
proyecto_react/
├── public/                 # Archivos estáticos públicos (como imágenes, logos y favicon)
├── src/
│   ├── Componentes/        # Componentes reutilizables (Carrusel, Navegación, etc.)
│   │   ├── Carrusel.jsx
│   │   └── Carrusel.css
│   ├── Paginas/            # Vistas principales o páginas enteras (Login, Home, etc.)
│   │   └── Login.jsx
│   ├── App.jsx             # Componente raíz de la aplicación (define rutas y estructura base)
│   ├── main.jsx            # Punto de entrada de React (conecta App.jsx al DOM del index.html)
│   └── index.css           # Estilos globales y variables de diseño
├── index.html              # Archivo HTML base de la aplicación cargado por Vite
├── package.json            # Configuración, scripts y dependencias del proyecto
└── vite.config.js          # Configuración de compilación y plugins de Vite
```
