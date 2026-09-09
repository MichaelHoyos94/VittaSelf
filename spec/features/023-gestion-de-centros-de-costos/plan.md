# 023 . Gestión de centros de costos — Plan

## Enfoque

Completar la funcionalidad CRUD ya iniciada en las clases raiz de Laravel para `CostCenter`, siguiendo la arquitectura Controller -> Service -> Repository y una pagina Inertia React.

## Implementación

1. Backend
   - Completar `CostCenterController` con `index`, `store`, `update` y `destroy`.
   - Completar `StoreCostCenterRequest` y `UpdateCostCenterRequest` con autorizacion y reglas.
   - Completar `CostCenterService` con metodos de negocio para listar, crear, actualizar y eliminar.
   - Completar `CostCenterRepository` con consultas y persistencia.
   - Agregar rutas web protegidas por `auth` y `verified`.

2. Frontend
   - Crear pagina Inertia para gestion de centros de costos.
   - Mostrar tabla con acciones.
   - Crear modal o formulario reutilizado para crear y editar, incluir input para archivo `jpg|png` max 500kb.
   - Mostrar confirmacion para eliminar.
   - Mostrar errores de validacion y mensajes flash.

3. Verificación
   - Ejecutar Pint sobre PHP modificado.
   - Ejecutar build frontend.
   - Ejecutar pruebas relevantes o documentar bloqueos del entorno.

## Decisiones

- Usar la tabla existente `cost_centers`.
- No modificar migraciones existentes.
- Mantener el CRUD en la aplicacion raiz porque las clases y modelo actuales ya existen fuera de modulos.
- Permitir el ingreso de archivos `jpg|png` de maximo 500kb para el campo `photo`.
- Guardar foto como campo opcional segun la estructura actual; si no se carga, usar el default existente.
