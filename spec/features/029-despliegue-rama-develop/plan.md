# Plan

## Estrategia

- Usar un Blueprint de Render versionado en `render.yaml` para que el despliegue sea reproducible.
- Desplegar la aplicacion como un web service desde la rama `develop` con `autoDeploy` habilitado.
- Usar Docker como runtime para controlar PHP, extensiones requeridas, Node, npm, Nginx y PHP-FPM en una sola imagen.
- Mantener MySQL como motor de base de datos y conectarlo como servicio externo mediante variables de entorno.

## Infraestructura

- Crear `render.yaml` en la raiz del repositorio.
- Definir un servicio web para VittaSelf.
- Configurar `branch: develop`.
- Configurar `healthCheckPath: /up`.
- Declarar variables de entorno necesarias para Laravel y Render.
- Marcar secretos con `sync: false` para que se configuren desde el Dashboard de Render.
- No definir una base PostgreSQL en el Blueprint porque esta feature mantiene MySQL.

## Docker

- Crear `Dockerfile` en la raiz del repositorio.
- Instalar dependencias del sistema necesarias para Laravel, MySQL, DomPDF y compilacion frontend.
- Instalar dependencias PHP de produccion con Composer.
- Instalar dependencias frontend con `npm ci`.
- Compilar assets con `npm run build`.
- Publicar la app desde `public/` usando Nginx y PHP-FPM.
- Exponer el puerto asignado por Render mediante `PORT`.

## Arranque de la aplicacion

- Crear un script de arranque para preparar Laravel en runtime.
- Asegurar directorios de `storage` y `bootstrap/cache` con permisos correctos.
- Ejecutar optimizaciones de Laravel seguras para produccion.
- Ejecutar migraciones con `php artisan migrate --force` solo si se define explicitamente en la configuracion de despliegue.
- Crear el enlace de storage si aplica.
- Iniciar PHP-FPM y Nginx.

## Variables de entorno

- Declarar valores no sensibles de produccion como `APP_ENV`, `APP_DEBUG`, `LOG_CHANNEL`, `SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION` y `FILESYSTEM_DISK`.
- Declarar secretos y datos sensibles como `APP_KEY`, credenciales MySQL y credenciales de servicios externos con `sync: false`.
- Usar `DB_CONNECTION=mysql`.
- Mantener `SESSION_DRIVER=database`, `CACHE_STORE=database` y `QUEUE_CONNECTION=database` para respetar la configuracion actual.

## Verificacion

- Ejecutar pruebas automatizadas enfocadas o generales segun el impacto de los cambios.
- Ejecutar `npm run build` para verificar compilacion de assets.
- Validar que el Dockerfile construye localmente si Docker esta disponible.
- Validar `render.yaml` con Render CLI si esta instalado o documentar que queda pendiente.
- Revisar que no existan secretos hardcodeados.

## Documentacion

- Actualizar `tasks.md` marcando el progreso de la feature.
- Actualizar `roadmap.md` al terminar la implementacion y mover Feat029 a `Hecho`.
- Informar los pasos manuales pendientes para completar el despliegue en Render Dashboard.

## Decisiones

- La base de datos MySQL estara en Aiden.
