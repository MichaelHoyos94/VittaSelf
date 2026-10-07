# Tasks

- [x] Documentar spec.
- [x] Documentar plan.
- [x] Confirmar decisiones abiertas del plan (card solo en el modal, estado en backend, etiquetas sugeridas, ingles).
- [x] Agregar eager loads de politica, fuente, nivel de sancion y plan del usuario en `ResolutionRepository::getAll`.
- [x] Agregar la derivacion de estado en `SanctionEnforcementService` y anexar `enforcement_status` en `ResolutionService::getAll`.
- [x] Escribir test Pest `tests/Feature/Sanctions/ResolutionHistoryTest.php` (relaciones y estados `active`, `expired`, `scheduled`, `none`).
- [x] Crear `resources/js/Components/UserCard.jsx` con el markup de la card existente.
- [x] Agregar la columna `DETAILS` con boton de icono en `Resolutions/Index.jsx`.
- [x] Construir el modal de detalle (encabezado, empresario, caso, resolucion, sanciones, atenuantes, vigencia) con estados vacios.
- [x] Ejecutar `./vendor/bin/pint` sobre los PHP modificados.
- [x] Ejecutar `php artisan test` (filtrado y completo).
- [x] Ejecutar `npm run build` (cliente y SSR) y `git diff --check`.
- [x] Revisar visualmente el modal en escritorio y movil (con/sin sanciones, texto largo, sin plan, `lifted_at` nulo).
- [x] Marcar tareas y mover la feature a "Hecho" en `roadmap.md` (ya listada por el usuario).

## Cambios

- `Modules/Sanctions/app/Repositories/ResolutionRepository.php`: eager loads `sanctionLevel`, `disciplinaryCase.user.plan`, `disciplinaryCase.policy` y `disciplinaryCase.complianceSource`. Filtros, orden y paginacion sin cambios.
- `Modules/Sanctions/app/Services/SanctionEnforcementService.php`: `getStatus()` devuelve `active`, `expired` o `scheduled` con la misma regla de `getUserSanctions`.
- `Modules/Sanctions/app/Services/ResolutionService.php`: `getAll()` anexa `enforcement_status` a cada resolucion via `through()`; `none` si es `not procede` o no tiene aplicacion de sancion (se toma la de `applied_at` mas reciente).
- `resources/js/Components/UserCard.jsx`: card compartida con el mismo diseno de las copias en Orders y DisciplinaryCases (que no se tocaron).
- `Modules/Sanctions/resources/assets/js/Pages/Resolutions/Index.jsx`: columna `DETAILS` con boton de ojo accesible (`aria-label`, foco visible) y modal de solo lectura `maxWidth="2xl"` con un unico boton `Close`. El contenido se conserva durante la animacion de cierre.
- `tests/Feature/Sanctions/ResolutionHistoryTest.php`: 2 tests, 49 aserciones.
- Pint reformateo espacios y lineas en blanco de los tres PHP del modulo (sin cambios de logica).

## Verificacion

- `php artisan test --filter ResolutionHistory`: 2 pasan.
- `php artisan test` completo: 55 pasan, 6 fallan. Los 6 fallos son preexistentes: fallan igual con los cambios de esta feature retirados (`git stash`). Son de Auth (login, registro), ExampleTest (302), RolePermissionTest (403 y falta `success` en sesion) y ProfileTest (borrado de cuenta). Candidatos a revisar en otra feature.
- `npm run build`: cliente y SSR exitosos. `git diff --check`: sin errores.
- Nota de test: `component('Sanctions/Resolutions/Index', false)` omite la comprobacion de archivo porque el buscador de Inertia en tests solo mira `resources/js/Pages`, no las paginas de modulos.
- Pendiente: revision visual en la app real (requiere sesion y datos).
- Fuera de alcance, sin cambios: la ruta `/sanctions/resolutions` solo exige `auth` y `verified`; no aplica el permiso `sanctions.resolutions-view`.
