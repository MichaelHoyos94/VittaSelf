# 030. Refactor del procesamiento de ordenes

**Estado**: Hecho ✅

## Descripcion

Centralizar la logica de negocio compartida por las ordenes web e internas sin modificar sus contratos publicos, persistencia ni efectos particulares.

## Criterios de aceptacion

- [x] Las ordenes web e internas usan un servicio compartido para evaluar las restricciones de sanciones.
- [x] Las ordenes web e internas usan un servicio compartido para calcular subtotal, envio, descuentos, total y puntos.
- [x] Las ordenes web e internas usan un servicio compartido para aplicar beneficios y puntos del plan.
- [x] Cada tipo de orden conserva su repositorio y el formato de productos que necesita para persistir.
- [x] La orden web continua vaciando el carrito despues de crearse exitosamente.
- [x] La orden interna no modifica el carrito.
- [x] `FREEZE_POINTS` impide acumular puntos y registra la orden con cero puntos.
- [x] `FREEZE_PLAN` permite acumular puntos, pero impide cambiar el plan.
- [x] `BLOCK_ORDERS` impide crear ordenes web e internas.
- [x] Los metodos publicos usados por los controladores conservan su compatibilidad.
- [x] Se elimina el codigo comentado y las dependencias sin uso relacionadas con el flujo refactorizado.
- [x] No se modifican migraciones ni el esquema de base de datos.

## Fuera de alcance

- Unificar los repositorios o modelos de ordenes web e internas.
- Cambiar las rutas, controladores o interfaces de usuario.
- Modificar las reglas de descuentos, precio de envio o escalamiento de planes.
- Cambiar el limite transaccional actual de la creacion de ordenes.
