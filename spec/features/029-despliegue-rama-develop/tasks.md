# Tasks

- [x] Crear `spec.md` de la feature 029.
- [x] Crear `plan.md` de la feature 029.
- [x] Crear `tasks.md` de la feature 029.
- [x] Crear Blueprint `render.yaml` para Render.
- [x] Configurar el servicio web para desplegar desde `develop`.
- [x] Declarar variables de entorno no sensibles y secretos requeridos.
- [x] Crear `Dockerfile` para Laravel, PHP-FPM, Nginx, Composer y Node.
- [x] Crear configuracion Nginx para servir Laravel desde `public/`.
- [x] Crear script de arranque compatible con el puerto `PORT` de Render.
- [x] Crear `.dockerignore` para excluir archivos innecesarios y sensibles.
- [x] Verificar que no se hardcodeen secretos.
- [x] Ejecutar `npm run build`.
- [x] Ejecutar pruebas automatizadas aplicables.
- [x] Validar `render.yaml` si Render CLI esta disponible.
- [x] Documentar pasos manuales para completar el despliegue en Render Dashboard.
- [x] Actualizar roadmap y marcar feature como hecha.

## Verificacion

- `npm run build`: exitoso con warnings existentes de Vite/Sass/Browserslist.
- `php artisan test`: ejecutado, bloqueado por conexion local rechazada a MySQL `vittaself_testing`.
- `docker --version`: no disponible en esta maquina.
- `render --version`: no disponible en esta maquina.
