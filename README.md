# Traductor

Un traductor que incluye el módulo la interfaz de usuario y un módulo de backend para traducir el texto a través de la
API de DeepL.

### Requisitos

- Node.js
- npm
- API Key de DeepL

### Configuración

Para configurar la API Key de DeepL, cree un archivo `.env` en la carpeta `translator-api` y agregue la siguiente línea, reemplazando `YOUR_API_KEY` con su API Key:

```env
VITE_DEEPL_API_KEY=YOUR_API_KEY
```

## Instalación

Para instalar las dependencias de ambos módulos, ejecute el siguiente comando en la raíz del proyecto:

```bash
npm run install-all
```

## Ejecución

Para ejecutar ambos módulos, ejecute el siguiente comando en la raíz del proyecto:

```bash
npm run start
```