# 016 . Descargos del empresario — Plan

## Enfoque

Modal en la vista `MyCases.jsx` que se accede desde la columna actions de la tabla. Desde aqui, el empresario puede subir descargos que persisten en el almacenamiento local y en la base de datos.

## Implementación

1. Crear el modal con el dropfile para cargar multiarchivos.
2. Crear el endpoint POST `/disciplinary-cases/{disciplinaryCaseId}/rebuttals`.
3. Implementar el backend
    - Gestionar la solicitud en el controlador `SanctionEvidencesController`. Evidencias y descargos comparten controller.
    - `SanctionEvidenceService` gestionar el servicio de negocio. Crear la funcion.
    - Implementar en el repo la funcion para persistir `createRebuttal` el repo para persistir en DB
4. Modificar la vista `ManageCase.jsx` para que se visualicen los descargos. Crear el botton `rebuttals` y mostrar modal con carrucel.

## Decisiones

- Solo el empresario puede cargar sus descargos.
- Solo si el caso disciplinario esta en el estado `AWAITING_EVIDENCES`.