# Feat 033: Documentacion y manual de uso

## Objetivo

Actualizar el `README.md` para reemplazar la documentacion generica de Laravel por una guia propia de VittaSelf, con contexto actual del proyecto, comandos de trabajo y un manual de uso basico.

## Contexto

VittaSelf es un ERP ligero para una plataforma de ventas multinivel. El sistema gestiona empresarios, empleados, productos, ordenes, carrito, sanciones, auditorias, cajas registradoras, centros de costo, planes, beneficios y dashboard.

## Alcance

- Describir el proposito del proyecto y sus usuarios principales.
- Documentar el stack tecnico actual.
- Explicar la estructura de Laravel, Inertia, React y modulos activos.
- Incluir requisitos e instalacion local.
- Incluir comandos habituales de desarrollo, build, pruebas, migraciones y seeders.
- Incluir notas de despliegue en Render sin exponer secretos.
- Incluir un manual funcional breve por area del sistema.
- Incluir el flujo SDD para futuras features.

## Fuera de alcance

- Cambiar codigo de aplicacion.
- Cambiar configuracion de despliegue.
- Agregar dependencias.
- Incluir credenciales, claves, passwords reales o datos sensibles.
- Documentar procesos que aun no existen en el sistema.

## Criterios de aceptacion

- `README.md` deja de ser el README generico de Laravel.
- La documentacion refleja el estado actual del proyecto y los modulos habilitados.
- Los comandos documentados coinciden con los disponibles en el repositorio.
- Las variables sensibles aparecen solo como placeholders o descripciones.
- El manual funcional es claro y breve para usuarios internos.
- El Markdown no tiene errores de whitespace detectables por `git diff --check`.
