# 016 . Descargos del empresario — Plan

**Estado**: Pendiente ⌛

## Que hace

Flujo para que el empresario suba descargos para su defensa en un caso disciplinario.

## Por qué

El caso disciplinario tiene un flujo secuencial de estados, y en uno de estos estados `AWAITING_EVIDENCES` el empresario tiene derecho a subir descargos para su defensa.

## Criterios de aceptación

- [ ] El boton `rebuttals` de la columna actions solo es visible si el caso esta en `AWAITING_EVIDENCES`.
- [ ] El boton `rebuttals` despliega el modal con el droparea que permite subir los descargos.
- [ ] Al subir los documentos, se previsualizan los archivos cargados.
- [ ] Al dar click en `send` se guardan los archivos en storage y se persisten en DB.
- [ ] Se redirige a la pagina `MyCases` y se muestra mensaje de success o error.
- [ ] Si se subieron descargos, el administrador asociado al caso puede verlos en una modal en `ManageCase`.