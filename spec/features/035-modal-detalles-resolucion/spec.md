# Feature035: Modal de detalles en la vista historico de resoluciones

## Objetivo
Mostrar una modal con los detalles de una resolucion seleccionada.

## Datos
Se debe mostrar una tarjeta con el empresario involucrado, las politicas asociadas al caso, sanciones aplicadas, atenuantes, el estado de la resolucion si se encuentra activa o ya caducó entre otros datos.

## Alcance
- Modificar la tabla de historico de resoluciones para incluir un boton que despliegue el modal en la ultima columna.

## Fuera de alcance
- No modificar logica de negocio del proceso de resoluciones
- No modificar la estructura de la entidad resoluciones
- No se gestiona ni edita la resolucion, no incluye botones para modificar fechas, estados ni agregar sanciones o atenuantes.

## Criterios de aceptacion
- Se incluye una modal con vista agradable del detalle de resoluciones
- Contiene una card consistente del usuario. Usando la que se usa en todo el sistema.
- Se visualizan sanciones, atenuantes y demas datos de la resolucion