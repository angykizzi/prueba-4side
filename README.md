# Prueba Técnica

Este proyecto es una aplicación desarrollada con Vue 3 y Vite. Utiliza PrimeVue para componentes UI y TailwindCSS para estilos.

Crea un archivo .env en la raíz del proyecto, se debe colocar el endpoint dado para la prueba.

VITE_API_URL=URL

Ver .env.example como ejemplo.

## Configuración del Proyecto

```sh
npm install
```

### Compilar y Recargar en Caliente para Desarrollo

```sh
npm run dev
```

### Verificar Tipos, Compilar y Minificar para Producción

```sh
npm run build
```

## Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `assets/`: Archivos CSS y otros recursos estáticos.
  - `components/`: Componentes Vue reutilizables.
  - `composables/`: Funciones reutilizables de composición.
  - `services/`: Servicios para interactuar con APIs.
  - `types/`: Definiciones de tipos TypeScript.
  - `utils/`: Funciones utilitarias.
  - `views/`: Vistas principales de la aplicación.
- `public/`: Archivos públicos que no pasan por el proceso de construcción.
- `index.html`: Archivo HTML principal.
- `package.json`: Archivo de configuración de npm.
- `tsconfig.json`: Configuración de TypeScript.
- `vite.config.ts`: Configuración de Vite.

## Dependencias Principales

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [TailwindCSS](https://tailwindcss.com/)

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la construcción de producción.
- `npm run type-check`: Verifica los tipos de TypeScript.

## Notas Adicionales

- Asegúrate de tener Node.js y npm instalados en tu máquina.
- Para cambiar entre modos claro y oscuro, utiliza el botón de alternancia en la interfaz de usuario.
- La aplicación incluye funcionalidades como búsqueda de usuarios, eliminación de usuarios y captura de fotos utilizando la cámara del dispositivo.
