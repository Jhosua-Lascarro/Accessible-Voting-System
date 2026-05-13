# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # Accessible Voting System

  Sistema de voto guiado construido con React, TypeScript y Vite.

  ## Flujo

  La aplicación sigue un recorrido lineal de cuatro pasos:

  1. Autenticación
  2. Guía
  3. Tarjetón
  4. Registro

  ## Guía de uso

  Lee la [guía completa de uso](GUIA_DE_USO.md) para ver el recorrido del sistema, qué hace cada pantalla y cómo se espera que interactúe la persona usuaria.

  ## Desarrollo

  Para ejecutar el proyecto en local:

  ```bash
  pnpm install
  pnpm dev
````

Para compilar la aplicación:

```bash
pnpm build
```

import reactDom from 'eslint-plugin-react-dom'
