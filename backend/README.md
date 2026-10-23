# INFOSERC Manager — Backend

API inicial con Express, TypeScript y SQLite. Incluye verificación de salud y operaciones CRUD para contenidos.

## Requisitos

- Node.js 22 LTS o compatible
- npm

## Preparación local

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

En Windows CMD, si `cp` no está disponible, usa `copy .env.example .env`.

La API escucha por defecto en `http://127.0.0.1:4000`. Comprueba `GET /api/health`.

## Endpoints iniciales

- `GET /api/content` — listar contenidos.
- `GET /api/content/:id` — consultar un contenido.
- `POST /api/content` — crear un contenido.
- `PUT /api/content/:id` — actualizar un contenido.
- `DELETE /api/content/:id` — eliminar un contenido.

Tipos permitidos: `tutorial`, `article`, `video`, `resource`.
Estados permitidos: `idea`, `draft`, `planned`, `published`, `archived`.

## Importante sobre seguridad

Esta es una base de desarrollo local. **No expongas esta API a Internet ni guardes datos reales todavía**: el inicio de sesión, la autorización y las pruebas de seguridad aún no están implementados. La autenticación debe completarse antes de publicar endpoints privados.
