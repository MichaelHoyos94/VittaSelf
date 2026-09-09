# 023 . Gestión de centros de costos — Spec

**Estado**: Hecho ✅

## Que hace

Flujo para gestionar los centros de costos del sistema desde una pagina con tabla y acciones CRUD.

## Por qué

Los centros de costos son usados por empleados, cajas registradoras, ordenes internas, inventario y procesos auditables. La administracion debe poder mantener esta informacion sin depender de cambios manuales en base de datos.

## Criterios de aceptación

- [x] El usuario autenticado puede abrir una pagina de gestion de centros de costos.
- [x] La pagina muestra una tabla con los centros de costos existentes.
- [x] La tabla permite consultar datos principales: nombre, direccion, email de contacto, telefono y foto.
- [x] Se puede crear un centro de costos desde un modal o formulario validado.
- [x] Se puede editar un centro de costos existente desde la tabla.
- [x] El formulario permite cargar una foto con input tipo file en formato `jpg|png` de maximo 500kb.
- [x] Se puede eliminar un centro de costos existente desde la tabla.
- [x] Las operaciones redirigen o recargan la pagina y muestran mensaje de success o error.
- [x] No se modifican migraciones existentes.
