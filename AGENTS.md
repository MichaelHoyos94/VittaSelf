# AGENTS.md

# VittaSelf

Sistema ERP de una plataforma de ventas multinivel. Se gestionan productos, empresarios (euis), usuarios del sistema, sanciones, procesos auditables, auditorias entre otros, ordenes internas o externas (web).

## Stack
- Lenguaje: php 8.13.6
- Framework backend: Laravel 11
- Framework frontend: React 18.2
- Base de datos: MySQL 8.0.30
- Tests: pestphp/pest 2.0

## Forma De La App
- Es Laravel 11 + Inertia React 18, con módulos de `nwidart/laravel-modules` en `Modules/`.
- Los módulos activos se controlan en `modules_statuses.json`; actualmente están habilitados `Audits`, `Sanctions` y `HumanResources`.
- Los namespaces PHP de módulos se combinan desde el composer de cada módulo; por ejemplo, `Modules\Sanctions\` apunta a `Modules/Sanctions/app/`.
- Las rutas de módulos se cargan desde `app/Providers/RouteServiceProvider.php` de cada módulo; las rutas web reciben `web`, y las API reciben `api` más el prefijo de nombre `api.`.
- Las rutas raíz aún contienen varias funcionalidades directamente en `routes/web.php`; no asumas que todo Human Resources vive solo en `Modules/HumanResources`.

## Cableado Frontend
- Las entradas Vite raíz son `resources/css/app.css` y `resources/js/app.jsx`; `vite-module-loader.js` agrega assets de módulos habilitados desde cada `vite.config.js` de módulo.
- Los nombres de páginas Inertia resuelven primero a `resources/js/Pages/<Name>.jsx`, luego a `Modules/<Module>/resources/assets/js/Pages/<Rest>.jsx` según el primer segmento de la ruta.
- Las páginas Inertia de módulos deben usar exactamente la ruta y mayúsculas `resources/assets/js/Pages` para que `resources/js/app.jsx` y `resources/js/ssr.jsx` las resuelvan.
- Tailwind escanea archivos React raíz más `Modules/**/resources/views`, `Modules/**/resources/js` y `Modules/**/resources/assets/js`.

## Comandos
- Instala dependencias PHP con `composer install`; el `composer.json` raíz combina `Modules/*/composer.json`, así que ejecuta Composer desde la raíz después de cambios de autoload en módulos.
- Instala dependencias frontend con `npm install`; este repo usa `package-lock.json`/npm, no pnpm ni yarn.
- Arranca el servidor en local `php artisan serve`.
- Frontend dev: `npm run dev`. Frontend producción: `npm run build` ejecuta `vite build` y `vite build --ssr`.
- Ejecuta tests con `php artisan test`; enfoca un archivo con `php artisan test tests/Feature/HumanResources/RolePermissionTest.php` o filtra con `php artisan test --filter "role permissions can be synchronized"`.
- Formatea PHP con `./vendor/bin/pint` cuando edites archivos PHP; no hay configuración Pint personalizada en el repo.

## Convenciones y estilo de código
- Estilo de nombres: camelCase variables y funciones.
- Manejo de errores: Clases propias en `app/Exceptions`, el message se manda en props a las vistas y se muestra en flash.
- Usar comillas simples en PHP y JavaScript cuando la sintaxis lo permita
- Evita estilos CSS inline salvo autorizacion.

## Restricciones
- No instalar dependencias sin autorizacion.
- No modifiques migraciones existentes sin autorizacion

### Arquitectura y Flujo de Datos

El proyecto sigue una arquitectura en capas estrictas. Toda nueva funcionalidad debe respetar este orden:

1. **Controller (`app/Http/Controllers`)**
   - Maneja rutas y parámetros HTTP.
   - Valida el formato de entrada por medio de FormRequests.
   - Llama al método correspondiente del **Service**.
   - Redirecciona las solicitudes con inertia y envia props o errores(de ser necesario).

2. **Service (`src/services/`)**
   - Contiene la lógica de negocio pura.
   - Orquesta operaciones y reglas del dominio.
   - Llama al **Repository** para obtener o guardar datos.
   - No debe importar objetos de tipo Request o Response de HTTP.

3. **Repository (`src/repositories/`)**
   - Ejecuta consultas a la base de datos.
   - Retorna entidades o modelos crudos al servicio.
   - No contiene lógica de negocio.

## Flujo de trabajo
- Trabajamos con **Spec Driven Development**: La spec va antes que el còdigo. Para una feature nueva primero `spec.md` -> `plan.md` -> `tasks.md` en `spec/features/NNN-name/`, y solo entonces se implementa. (Ver Documentacion SDD)
- Antes de una tarea no trivial, analiza y propón un plan y espera mi OK.
- Una tarea a la vez; al terminar, dime que cambiaste para que lo revise.
- Ejecuta pruebas luego de cada tarea para validar su funcionamiento.
- Si no estas seguro de algo en almenos un 80%, pregunta. No inventes.

## Documentacion sdd
- `spec/` documentacion para Spec Driven Development.
- `spec/constitution/`: Constitucion del proyecto (mission, tech-stack y roadmap)
    - `mission.md`: Que construimos y para quien.
    - `tech-stack.md`: Tecnologías
    - `roadmap.md`: Orden de las features (hecho, siguiente, backlog)
- `spec/features/NNN-name/`: Una carpeta por feature cada una con:
    - `spec.md`: Que hace + criterios de aceptacion
    - `plan.md`: Como se implementa
    - `tasks.md`: checklist

### Como usarla
1. **Antes de implementar**: Lee la `constitution` y la `spec.md` de la feature afectada para no contradecirlas.
2. **Para feature nueva**: Crea `spec/features/NNN-name/` (Siguiente numero libre) y escribe `spec.md` -> `plan.md` -> `tasks.md` antes de escribir codigo.
3. **Al terminar**: Marca las tareas en `tasks.md` y mueve la feature a "hecho" en `roadmap.md`.
4. **Constitution manda**: Si una feature choca con `mission.md` o `tech-stack.md` se replantea la feature, no constitution.

## Tests Y Datos
- Pest vincula `Tests\TestCase` y `RefreshDatabase` a todos los tests en `tests/Feature`.
- `phpunit.xml` define drivers de cache/session/mail/queue para tests, pero no fuerza sqlite; los tests usan la base configurada salvo que sobrescribas el entorno localmente.
- `DatabaseSeeder` llama a `ProductsSeeder`, `CostCenterSeeder`, `RolesAndPermissionsSeeder`, `PlanSeeder`, `BenefitSeeder` y `UserSeeder`.

## Auth Y Permisos
- Los permisos usan `spatie/laravel-permission`; `AppServiceProvider` concede todas las abilities a usuarios con `RoleName::SUPER_ADMIN` mediante `Gate::before`.
- Prefiere enums existentes como `App\Enums\RoleName` y `App\Enums\PermissionName` sobre strings literales al agregar lógica de roles/permisos.
