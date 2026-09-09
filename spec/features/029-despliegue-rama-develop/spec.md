# 029 . Despliegue de rama develop

**Estado**: Hecho

## Descripcion

Configurar el despliegue de la rama `develop` en Render para habilitar CI/CD del proyecto VittaSelf desde el repositorio GitHub.

El despliegue debe publicar la aplicacion Laravel 11 + Inertia React 18 con sus assets compilados, exponiendo el servicio web por HTTPS y ejecutando nuevos despliegues automaticamente cuando se actualice la rama `develop`.

## Criterios de aceptacion

- [x] Existe una configuracion versionable para desplegar el proyecto en Render.
- [x] El servicio web de Render se despliega desde la rama `develop`.
- [x] El servicio web tiene `autoDeploy` habilitado para CI/CD desde GitHub.
- [x] El build instala dependencias PHP de produccion.
- [x] El build instala dependencias frontend con npm usando `package-lock.json`.
- [x] El build compila los assets de produccion con `npm run build`.
- [x] El servicio sirve Laravel desde el directorio `public/`.
- [x] El servicio escucha en `0.0.0.0` usando el puerto asignado por Render.
- [x] El health check usa la ruta `/up` existente de Laravel.
- [x] Las variables sensibles no quedan hardcodeadas en el repositorio.
- [x] La configuracion permite conectar una base de datos MySQL externa mediante variables de entorno.
- [x] No se migra la base de datos a PostgreSQL como parte de esta feature.
- [x] No se modifican migraciones existentes.

## Fuera de alcance

- Provisionar una base de datos MySQL administrada dentro de Render.
- Migrar el esquema o consultas de MySQL a PostgreSQL.
- Crear workers de cola dedicados.
- Crear jobs programados o cron jobs en Render.
- Configurar almacenamiento persistente o S3 para archivos subidos.
- Ejecutar el despliegue final desde la cuenta de Render.
- Crear secrets reales en Render.
- Modificar funcionalidades de negocio de VittaSelf.

## Supuestos

- El repositorio remoto es `https://github.com/MichaelHoyos94/VittaSelf.git`.
- La rama objetivo para CI/CD es `develop`.
- La aplicacion mantendra MySQL como motor de base de datos en esta feature.
- La base de datos MySQL sera provista externamente y sus credenciales se configuraran en Render.
- Render ejecutara el servicio principal como un web service.
- El proyecto se desplegara con Docker para controlar PHP, extensiones requeridas, Node y servidor web.

## Riesgos y consideraciones

- Render no provisiona MySQL administrado mediante Blueprint, por lo que la disponibilidad de la aplicacion depende de una base MySQL externa.
- El filesystem local de Render no debe asumirse persistente para archivos subidos o PDFs generados.
- Si se requieren colas asincronicas reales, sera necesaria una feature posterior para configurar workers.
- Si la aplicacion necesita SSR de Inertia en runtime, podria requerirse un servicio adicional de Node en una feature posterior.
