# Arquitectura inicial

## Enfoque
Monolito modular para mantener el MVP sencillo de desarrollar y operar. Frontend y backend estarán separados por carpetas, con una API HTTP entre ambos.

## Componentes
- `frontend/`: React, TypeScript y Vite.
- `backend/` (próxima etapa): Node.js, Express y TypeScript.
- `backend/src/modules/`: módulos de dominio separados por responsabilidad.
- `backend/src/database/`: conexión, esquema y migraciones.
- `docs/`: decisiones técnicas y procedimientos.

## Persistencia
SQLite es adecuado para el primer despliegue de un administrador y una carga modesta. Si el uso concurrente o la infraestructura lo requieren, evaluar PostgreSQL sin acoplar la lógica de negocio al motor.

## Seguridad prevista
- Secretos solo mediante variables de entorno; nunca subir `.env`.
- Contraseñas almacenadas únicamente como hashes con algoritmo moderno.
- Validación de entradas en servidor y consultas parametrizadas.
- Autenticación y autorización en todas las rutas privadas.
- HTTPS en producción, copias de seguridad protegidas y restauración ensayada.

## Estado
Esta arquitectura es una propuesta inicial. No implica que el backend o las medidas de seguridad estén implementados todavía.