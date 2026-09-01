# 024 . Gestión de productos — Spec

**Estado**: Hecho ✅

## Que hace

Flujo para gestionar el catalogo de productos del sistema desde una pagina administrativa con tabla y acciones CRUD.

## Por qué

Los productos alimentan el catalogo de compra, ordenes internas, ordenes web, inventario y auditorias. La administracion necesita crear, editar, consultar y eliminar productos sin depender de cambios manuales en base de datos.

## Criterios de aceptación

- [x] El usuario autenticado puede abrir una pagina de gestion de productos.
- [x] La pagina muestra una tabla con los productos existentes.
- [x] La tabla permite consultar nombre, precio, puntos, presentacion, categoria, cover y fechas.
- [x] Se puede crear un producto desde un modal o formulario validado.
- [x] Se puede editar un producto existente desde la tabla.
- [x] El formulario permite cargar una imagen de cover con input tipo file en formato `jpg|png` de maximo 500kb.
- [x] Se puede eliminar un producto existente desde la tabla.
- [x] Las operaciones redirigen o recargan la pagina y muestran mensaje de success o error.
- [x] No se modifican migraciones existentes.
