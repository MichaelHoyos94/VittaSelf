# Despliegue en Render

## Blueprint

El despliegue se define en `render.yaml` como un web service Docker llamado `vittaself-develop`.

- Rama: `develop`.
- Auto deploy: habilitado.
- Health check: `/up`.
- Runtime: Docker.
- Base de datos: MySQL externa en Aiden.

## Pasos manuales

1. Confirmar que `render.yaml`, `Dockerfile`, `.dockerignore` y `docker/` esten en la rama `develop` remota.
2. Abrir el Blueprint en Render con el repositorio `https://github.com/MichaelHoyos94/VittaSelf`.
3. Completar las variables marcadas como `sync: false`.
4. Aplicar el Blueprint desde Render Dashboard.
5. Revisar el primer deploy y confirmar que `/up` responde correctamente.

## Variables sensibles requeridas

- `APP_URL`: URL publica final del servicio Render.
- `APP_KEY`: llave Laravel generada con `php artisan key:generate --show`.
- `DB_HOST`: host de MySQL en Aiden.
- `DB_DATABASE`: base de datos MySQL.
- `DB_USERNAME`: usuario MySQL.
- `DB_PASSWORD`: password MySQL.

## Migraciones

`RUN_MIGRATIONS` queda en `false` por defecto. Si se quiere que Render ejecute migraciones en el arranque, cambiarlo a `true` en el Dashboard y confirmar primero que apunta a la base correcta.

## Limitaciones conocidas

- Render no provisiona MySQL administrado con Blueprint; la disponibilidad depende de Aiden.
- El filesystem local de Render no es una solucion persistente para archivos subidos o PDFs.
- No se configura worker de colas en esta feature.
- No se configura servicio SSR de Inertia en runtime en esta feature.
