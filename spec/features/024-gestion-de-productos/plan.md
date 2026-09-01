# 024 . Gestión de productos — Plan

## Enfoque

Completar la funcionalidad CRUD ya iniciada para `Product`, siguiendo la arquitectura Controller -> Service -> Repository y reutilizando la pagina Inertia `Products/ManageProducts`.

## Implementación

1. Backend
   - Completar `ProductController` con `store`, `update` y `destroy`.
   - Completar `StoreProductRequest` y `UpdateProductRequest` con autorizacion y reglas.
   - Completar `ProductService` con metodos de negocio para crear, actualizar, eliminar y manejar cover.
   - Completar `ProductRepository` con persistencia.
   - Agregar rutas web protegidas para CRUD.

2. Frontend
   - Completar `ManageProducts.jsx` con tabla de productos, busqueda y paginacion.
   - Agregar modal/formulario para crear y editar productos.
   - Agregar input de tipo file para cover.
   - Agregar confirmacion para eliminar.
   - Mostrar errores de validacion y mensajes flash.

3. Verificación
   - Ejecutar Pint sobre PHP modificado.
   - Ejecutar build frontend.
   - Agregar y ejecutar pruebas enfocadas del CRUD de productos.

## Decisiones

- Usar la tabla existente `products`.
- No modificar migraciones existentes.
- Usar los enums existentes `Category` y `Presentation` para validar opciones.
- Guardar cover como archivo opcional; si no se carga, usar el default existente.
