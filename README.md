# TrainSync

## 1. Idea y Temática de la Aplicación
**TrainSync** es una Plataforma de Gestión Integral para Entrenadores Personales. Su objetivo principal es facilitar la comunicación y la organización entre entrenadores y sus clientes. 
La aplicación permite a los entrenadores asignar y organizar rutinas de entrenamiento personalizadas, mientras que los clientes pueden visualizar sus ejercicios diarios, registrar sus progresos (pesos, repeticiones) y marcar los ejercicios como completados. 

## 2. Tecnologías Utilizadas
El proyecto está construido bajo una arquitectura Cliente-Servidor separada y utiliza las siguientes tecnologías:

**Frontend (Cliente):**
- **React (v18)**: Biblioteca principal para construir la interfaz de usuario.
- **Vite**: Herramienta de compilación rápida para el frontend.
- **Bootstrap (v5)**: Framework de CSS para el diseño responsivo y componentes de UI pre-estilizados.
- **Lucide React**: Biblioteca de iconos.
- **Axios**: Para realizar peticiones HTTP al servidor web.

**Backend (Servidor):**
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web minimalista para Node.js, utilizado para crear la API REST.
- **MySQL (con mysql2)**: Sistema de gestión de bases de datos relacional para almacenar usuarios, rutinas y ejercicios.
- **Dotenv**: Para el manejo de variables de entorno.
- **Cors**: Para permitir peticiones entre el cliente y el servidor.

## 3. Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el repositorio** y acceder a la carpeta principal `trainsync`.
2. **Configurar la Base de Datos MySQL**:
   - Crea un archivo `.env` dentro de la carpeta `/backend` usando tus credenciales locales (por ejemplo: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME=trainsync`).
   - Puedes inicializar la base de datos y cargar los datos de prueba (`seeders`) ejecutando el script provisto: `node backend/init-db.js` (asegúrate de que tu servidor MySQL esté corriendo).
3. **Instalar dependencias**:
   - En la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias tanto de la raíz, como del frontend y backend en un solo paso:
     ```bash
     npm run install-all
     ```
4. **Ejecutar la aplicación**:
   - Desde la raíz del proyecto ejecuta el entorno de desarrollo:
     ```bash
     npm start
     ```
   - Esto iniciará concurrentemente el servidor (_backend_) y la aplicación web (_frontend_).

## 4. Estructura del Proyecto

El proyecto está dividido en dos directorios principales:

```text
trainsync/
├── backend/                # Servidor API y Base de Datos
│   ├── controllers/        # Controladores de la API (lógica de endpoints)
│   ├── models/             # Modelos de datos y comunicación con BD
│   ├── routes/             # Definición de rutas del API REST
│   ├── services/           # Lógica de negocio
│   ├── init-db.js          # Script para inicializar base de datos
│   └── schema.sql          # Esquema de la base de datos y datos semilla
├── client/                 # Aplicación Web Frontend
│   ├── src/
│   │   ├── components/     # Componentes visuales de React (pages, header, etc.)
│   │   ├── viewmodels/     # Lógica de estados y llamadas a la API (custom hooks)
│   │   └── App.jsx         # Componente principal y enrutador
│   └── vite.config.js      # Configuración de Vite
└── package.json            # Scripts de la raíz (concurrently, install-all)
```

## 5. Usuarios de Prueba

Para probar las funcionalidades de la aplicación, la base de datos incluye de inicio (`Seed Data`) los siguientes perfiles de usuario:

**Entrenador (Trainer)**
- **Nombre:** Coach Carlos
- **Email:** carlos@trainsync.com

**Clientes (Clients)**
- **Nombre:** María López
- **Email:** maria@example.com
- **Nombre:** Juan Pérez
- **Email:** juan@example.com
