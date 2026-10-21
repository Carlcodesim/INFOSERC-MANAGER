# Modelo de datos propuesto

Esquema conceptual; aún no está implementado en una base de datos.

## Entidades
- **AdminUser**: id, email, password_hash, created_at, updated_at, last_login_at.
- **ContentItem**: id, title, summary, content_type, status, platform, planned_at, published_at, created_at, updated_at.
- **Task**: id, title, description, status, priority, due_date, created_at, updated_at.
- **Collaborator**: id, name, email opcional, area, status, created_at.
- **Activity**: id, title, description, activity_type, status, starts_at, ends_at, created_at.
- **ImpactSnapshot**: id, metric_key, metric_value, captured_at, source, notes.

## Relaciones futuras
- Una tarea puede vincularse opcionalmente con un contenido o una actividad.
- Los registros de impacto deben identificar fuente y fecha; no inventar ni inferir métricas.
- Si se habilitan colaboradores con acceso, definir permisos por rol antes de permitirles iniciar sesión.

## Reglas
- Usar identificadores estables y fechas en formato consistente.
- Validar estados y campos requeridos en servidor.
- Definir política de eliminación y retención antes de almacenar información personal.