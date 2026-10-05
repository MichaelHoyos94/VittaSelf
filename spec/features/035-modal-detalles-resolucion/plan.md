# Plan

## Diagnostico
- Vista: `Modules/Sanctions/resources/assets/js/Pages/Resolutions/Index.jsx`. Tabla paginada (10 por pagina) con `Table` (`resources/js/Components/Table.jsx`); columnas por `render`, sin columna de acciones.
- Backend: `ResolutionsController@index` -> `ResolutionService::getAll` -> `ResolutionRepository::getAll`. Cada fila ya trae `sanctions`, `mitigations`, `disciplinaryCase.user`, `disciplinaryCase.admin` y `sanctionEnforcements`.
- Faltan para el detalle: `disciplinaryCase.user.plan` (la card lo muestra), `disciplinaryCase.policy`, `disciplinaryCase.complianceSource` y `sanctionLevel`.
- El caso tiene **una** politica (`disciplinary_cases.policy_id`), no varias; la spec dice "politicas" en plural.
- No existe un componente de card de usuario. La card "del sistema" esta copiada a mano en `resources/js/Pages/Orders/Create.jsx` (`userToOrder`) y `Modules/Sanctions/.../DisciplinaryCases/Index.jsx` (`userToSanction`): inicial en circulo `primary-700`, nombre, email, EUI Code, Document y Plan, sobre `border-primary-100 bg-primary-50/60`.
- Regla existente de sancion activa (`SanctionEnforcementRepository::getUserSanctions`): `applied_at <= now()` y (`lifted_at` nulo o `lifted_at > now()`), sin soft delete.
- `Modal` (`resources/js/Components/Modal.jsx`) soporta hasta `maxWidth="2xl"` y hace scroll interno con `max-h-[80vh]`.
- La ruta `resolutions.show` existe pero devuelve una vista Blade placeholder; no se usa.
- No hay tests de resoluciones ni factories del modulo Sanctions; existen seeders de catalogos.

## Pasos

### Backend (solo lectura, sin cambiar la logica del proceso)
1. `ResolutionRepository::getAll`: agregar eager loads `disciplinaryCase.user.plan`, `disciplinaryCase.policy`, `disciplinaryCase.complianceSource` y `sanctionLevel`. Sin cambios en filtros, orden ni paginacion.
2. `SanctionEnforcementService`: metodo que derive el estado de una aplicacion de sancion con la misma regla de `getUserSanctions`:
   - `active`: `applied_at <= now` y (`lifted_at` nulo o futuro).
   - `expired`: `lifted_at <= now`.
   - `scheduled`: `applied_at > now`.
3. `ResolutionService::getAll`: anexar `enforcement_status` a cada resolucion del paginador (via `through()`), usando su aplicacion de sancion; `none` si la resolucion es `not procede` o no tiene aplicacion. Calcularlo en el servidor evita diferencias de zona horaria con el navegador y mantiene una sola regla.

### Frontend
4. Crear `resources/js/Components/UserCard.jsx` con el mismo markup y clases de la card existente. Prop `user`. Usa `full_name` y muestra `N/A` si no hay plan.
5. `Resolutions/Index.jsx`:
   - Nueva ultima columna `DETAILS` con un boton de icono (`EyeIcon` de heroicons, ya instalado) con `aria-label`, que guarda la fila seleccionada y abre el modal.
   - Componente local `ResolutionDetails` dentro del mismo archivo (convencion del repo: el contenido de los modales vive en la pagina).
6. Contenido del modal (`maxWidth="2xl"`, solo lectura, un unico boton `Close`):
   - Encabezado: `Resolution #ID`, fecha, badge de tipo (`procede` / `not procede`, mismo mapeo de la tabla) y badge de estado (`active` / `expired` / `scheduled` / `none`).
   - Empresario: `UserCard`.
   - Caso: politica (codigo, nombre, seccion y numeral), fuente de cumplimiento, descripcion de hechos y administrador que llevo el caso.
   - Resolucion: nivel de sancion y texto completo.
   - Sanciones aplicadas: lista con codigo, nombre y descripcion; estado vacio "No sanctions applied".
   - Atenuantes: lista con codigo, nombre y descripcion; estado vacio "No mitigations applied".
   - Vigencia: `applied_at` y `lifted_at` ("Indefinite" si es nulo).
7. Textos en ingles, como el resto de la vista. Paleta `primary` y componentes existentes (`Badge`, `Modal`, `SecondaryButton`). Sin CSS inline.

### Tests
8. Pest feature test `tests/Feature/Sanctions/ResolutionHistoryTest.php`: siembra catalogos con los seeders del modulo, crea empresario, admin, caso, resolucion con sanciones y atenuantes y su aplicacion; verifica con `assertInertia` que la pagina trae politica, fuente, nivel, plan del usuario, sanciones, atenuantes y `enforcement_status` correcto para `active`, `expired`, `scheduled` y `none`.

## Fuera de alcance
- No se edita la resolucion: sin botones de fechas, estados, sanciones ni atenuantes.
- No se cambia la estructura de `resolution` ni sus migraciones.
- No se refactorizan las dos cards existentes para usar `UserCard` (seria otro cambio en Orders y DisciplinaryCases).
- No se modifica `Table.jsx` ni `Modal.jsx`.

## Validacion
- `php artisan test --filter ResolutionHistory` y luego `php artisan test` completo.
- `./vendor/bin/pint` sobre los PHP modificados.
- `npm run build` (cliente y SSR) y `git diff --check`.
- Revision visual del modal en escritorio y movil: resolucion con y sin sanciones/atenuantes, texto largo, sin plan, `lifted_at` nulo.

## Riesgos
- Payload algo mayor por pagina (4 relaciones mas en 10 filas): aceptable.
- Si alguna resolucion antigua no tiene caso, usuario o admin (soft deletes), el modal debe tolerar nulos sin romperse; ya pasa hoy en la tabla con `admin`, se cubre con optional chaining.

## Decisiones a confirmar
1. Card: crear `UserCard` compartido y usarlo solo en el modal (recomendado), o refactorizar tambien las dos copias existentes.
   - Usarlo solo en este modal.
2. Estado calculado en el backend con la regla de `getUserSanctions` (recomendado), o en el frontend.
   - En el backend
3. Etiquetas de estado: `Active`, `Expired`, `Scheduled` y `No sanction` (para `not procede` o sin aplicacion).
   - Con las etiquetas que sugieres esta bien
4. Idioma del modal: ingles, como la vista actual.
   - Ingles.
