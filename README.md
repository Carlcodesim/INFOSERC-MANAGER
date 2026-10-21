# INFOSERC Manager

Sistema de gestión integral para organizar la iniciativa educativa tecnológica INFOSERC.

## Objetivo

Centralizar la planificación y el seguimiento de contenidos educativos, tareas, colaboradores, actividades y métricas de impacto en una aplicación web propia.

## Estado actual

**Etapa 1 — Base del proyecto.** Esta primera entrega incluye una interfaz administrativa inicial y documentación. Los indicadores mostrados en el panel son datos de demostración; todavía no hay backend, autenticación ni persistencia.

## Stack previsto

- React + TypeScript + Vite
- Node.js + Express + TypeScript (siguiente etapa)
- SQLite para el MVP local; evaluar PostgreSQL si el proyecto escala
- Git y GitHub

## Requisitos

- Node.js LTS y npm
- Git (opcional para descargar el proyecto)

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal, normalmente `http://localhost:5173`.

## Hoja de ruta

1. Base visual y navegación administrativa.
2. Backend, configuración y validación de datos.
3. Base de datos y autenticación segura del administrador.
4. CRUD de contenidos, tareas, colaboradores y actividades.
5. Estadísticas basadas en datos reales, copias de seguridad y pruebas.
6. Despliegue con HTTPS y revisión de seguridad.

## Principios

- No presentar datos de demostración como resultados reales.
- Mantener secretos y credenciales fuera de Git.
- Implementar autenticación y autorización antes de publicar funciones privadas.
- Documentar cambios importantes y probar antes de desplegar.

## Licencia

Pendiente de definir por el responsable de INFOSERC.