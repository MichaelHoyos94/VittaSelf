# Plan

## Datos

- Crear una migracion nueva que agregue `representative_id` nullable a `users` con foreign key hacia `users.id` y `nullOnDelete`.
- Agregar `representative_id` al fillable del modelo `User`.
- Agregar relaciones `representative` y `representedUsers` en `User`.

## Backend

- Extender `UserRequest` para aceptar `representative_eui_code` opcional.
- En `UserService`, resolver `representative_eui_code` a `representative_id` antes de crear el empresario.
- En `UserService`, validar que el empresario representante no tenga sancion `SUSPEND_ACCOUNT` o `SUSPEND_CODE` vigente.
- En `UserRepository`, cargar representante y conteo de representados en el listado de empresarios.
- Agregar consulta de representados directos para un empresario autenticado.
- Agregar accion `myReferrals` en `UserController`.
- Agregar ruta autenticada y verificada para `my-referrals`.

## Frontend

- Actualizar `Customers/Index.jsx` para capturar el codigo EUI del representante y mostrar representante/conteo.
- Mostrar el error de empresario inactivo o sancionado.
- Crear `Customers/MyReferrals.jsx` para consultar los representados directos.
- Actualizar `Sidebar.jsx` para enlazar `My Referrals` a la nueva ruta real.

## Pruebas

- Probar creacion de empresario con representante valido.
- Probar rechazo de representante inexistente.
- Probar que la vista de empresarios contiene datos de representante y conteo.
- Probar que `My Referrals` muestra solo representados directos del usuario autenticado.
