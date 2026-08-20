# Guía de React: Flujo de Datos con Props (Prop Drilling) y Context API

Este manual explica detalladamente las dos metodologías para transferir datos en React: **Props tradicionales** y la **Context API**, basándose en la estructura del proyecto `proyecto_react_2` (`Principal` -> `Heder` -> `UserInfo` -> `Avatar`).

---

## 📂 1. Flujo con Props (Prop Drilling)

El **Prop Drilling** ocurre cuando pasamos datos (props) a través de componentes intermedios que no los consumen, únicamente para hacerlos llegar a un componente más profundo.

En el proyecto actual, estamos enviando dos variables de arriba hacia abajo (`Principal` ➔ `Avatar`):
1.  **`Persona`**: Se va renombrando en cada nivel (`Persona1` ➔ `Persona2` ➔ `Persona3`).
2.  **`edad`**: Mantiene el mismo nombre en todos los niveles.

### 🗺️ Diagrama del Flujo

```text
Principal (Persona, edad)
   │
   ├── [Envía: Persona1={Persona}, edad={edad}]
   │
   ▼
Heder ({ Persona1, edad })
   │
   ├── [Envía: Persona2={Persona1}, edad={edad}]
   │
   ▼
UserInfo ({ Persona2, edad })
   │
   ├── [Envía: Persona3={Persona2}, edad={edad}]
   │
   ▼
Avatar ({ Persona3, edad })  <-- ¡Consume los datos!
```

### 💻 Código de la implementación con Props

#### **Principal.jsx**
```jsx
import React from "react";
import Heder from "./Heder";

function Principal() {
  const Persona = "juan";
  const edad = 25;

  return (
    <div>
      <h1>componente principal</h1>
      {/* Persona cambia de nombre a Persona1. edad mantiene su nombre */}
      <Heder Persona1={Persona} edad={edad} />
    </div>
  );
}

export default Principal;
```

#### **Heder.jsx**
```jsx
import React from "react";
import UserInfo from "./UserInfo";

// Recibe Persona1 y edad
function Heder({ Persona1, edad }) {
  return (
    <div>
      <h1>soy el componente header</h1>
      {/* Pasa Persona1 renombrada a Persona2, y la edad como edad */}
      <UserInfo Persona2={Persona1} edad={edad} />
    </div>
  );
}

export default Heder;
```

#### **UserInfo.jsx**
```jsx
import React from "react";
import Avatar from "./Avatar";

// Recibe Persona2 y edad
function UserInfo({ Persona2, edad }) {
  return (
    <div>
      <h1>soy el componente userinfo</h1>
      {/* Pasa Persona2 renombrada a Persona3, y la edad como edad */}
      <Avatar Persona3={Persona2} edad={edad} />
    </div>
  );
}

export default UserInfo;
```

#### **Avatar.jsx**
```jsx
import React from "react";

// Recibe Persona3 y edad (los nombres definitivos)
function Avatar({ Persona3, edad }) {
  return (
    <div>
      <h1>soy el componente avatar</h1>
      {/* Renderiza ambos datos en pantalla */}
      <h2>Usuario recibido: {Persona3} {edad}</h2>
    </div>
  );
}

export default Avatar;
```

---

## 📡 2. Flujo con Context API

La **Context API** es una solución integrada de React para evitar el Prop Drilling. Permite crear un "canal de difusión" de datos en un componente padre, de modo que cualquier componente hijo pueda conectarse y leer la información directamente sin importar qué tan profundo esté en el árbol.

### 🗺️ Diagrama del Flujo con Context

```text
Principal ➔ Crea AppContext y transmite: { nombrePersona: "juan", edadPersona: 25 }
   │
   ├── Heder (No recibe ni pasa ninguna Prop, queda limpio)
   │     │
   │     └── UserInfo (No recibe ni pasa ninguna Prop, queda limpio)
   │           │
   │           └── Avatar (Se conecta directamente al AppContext vía Wi-Fi)
```

### 💻 Código de la implementación con Context

#### **Paso 1: Crear el Contexto**
Primero, se crea el canal de datos (generalmente en un archivo independiente o en el componente padre):
```javascript
import { createContext } from "react";
export const AppContext = createContext();
```

#### **Paso 2: Envolver al Padre con el Proveedor (Principal.jsx)**
Usamos `<AppContext.Provider>` y le pasamos los datos dentro del prop `value`:
```jsx
import React, { createContext } from "react";
import Heder from "./Heder";

export const AppContext = createContext(); // Creamos el contexto

function Principal() {
  const Persona = "juan";
  const edad = 25;

  const datosGlobales = {
    nombrePersona: Persona,
    edadPersona: edad
  };

  return (
    <AppContext.Provider value={datosGlobales}>
      <div>
        <h1>componente principal</h1>
        <Heder /> {/* ¡Ya no enviamos props! */}
      </div>
    </AppContext.Provider>
  );
}

export default Principal;
```

#### **Paso 3: Componentes Intermedios Limpios (Heder.jsx y UserInfo.jsx)**
No reciben ni pasan ninguna prop. Quedan sumamente legibles:
```jsx
// Heder.jsx
import React from "react";
import UserInfo from "./UserInfo";

function Heder() {
  return (
    <div>
      <h1>soy el componente header</h1>
      <UserInfo />
    </div>
  );
}

// UserInfo.jsx
import React from "react";
import Avatar from "./Avatar";

function UserInfo() {
  return (
    <div>
      <h1>soy el componente userinfo</h1>
      <Avatar />
    </div>
  );
}
```

#### **Paso 4: Consumir los datos en el destino (Avatar.jsx)**
Usamos el Hook `useContext` para conectarnos al canal e importar directamente las variables:
```jsx
import React, { useContext } from "react";
import { AppContext } from "./Principal"; // Importamos el canal

function Avatar() {
  // Consumimos los datos del contexto
  const { nombrePersona, edadPersona } = useContext(AppContext);

  return (
    <div>
      <h1>soy el componente avatar</h1>
      <h2>Usuario recibido de Context: {nombrePersona} {edadPersona}</h2>
    </div>
  );
}

export default Avatar;
```

---

## ⚖️ 3. Tabla Comparativa

| Criterio | Flujo con Props (Prop Drilling) | Flujo con Context API |
| :--- | :--- | :--- |
| **Limpieza de código** | Baja (ensucia componentes del medio con props repetitivas). | Alta (los componentes intermedios quedan limpios). |
| **Mantenibilidad** | Difícil (si cambias una prop, debes editar todos los archivos del trayecto). | Fácil (solo editas el origen y el destino final). |
| **Bugs por nombres** | Alto riesgo (si erras un nombre intermedio, el dato se pierde). | Bajo riesgo (solo debes asegurar la consistencia en el emisor y receptor). |
| **Cuándo usar** | Flujos cortos (1 o 2 niveles de profundidad) o específicos. | Datos compartidos globales (idioma, sesión de usuario, temas visuales). |
