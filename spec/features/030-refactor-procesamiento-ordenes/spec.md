# 030. Refactor del procesamiento de ordenes

**Estado**: Hecho ✅

## Descripcion

Centralizar la logica de negocio compartida por las ordenes web e internas sin modificar sus contratos publicos, persistencia ni efectos particulares.

## Criterios de aceptacion

- [ ] Las ordenes web e internas usan un servicio compartido para evaluar las restricciones de sanciones.
- [ ] Las ordenes web e internas usan un servicio compartido para calcular subtotal, envio, descuentos, total y puntos.
- [ ] Las ordenes web e internas usan un servicio compartido para aplicar beneficios y puntos del plan.
- [ ] Cada tipo de orden conserva su repositorio y el formato de productos que necesita para persistir.
- [ ] La orden web continua vaciando el carrito despues de crearse exitosamente.
- [ ] La orden interna no modifica el carrito.
- [ ] `FREEZE_POINTS` impide acumular puntos y registra la orden con cero puntos.
- [ ] `FREEZE_PLAN` permite acumular puntos, pero impide cambiar el plan.
- [ ] `BLOCK_ORDERS` impide crear ordenes web e internas.
- [ ] Los metodos publicos usados por los controladores conservan su compatibilidad.
- [ ] Se elimina el codigo comentado y las dependencias sin uso relacionadas con el flujo refactorizado.
- [ ] No se modifican migraciones ni el esquema de base de datos.

## Fuera de alcance

- Unificar los repositorios o modelos de ordenes web e internas.
- Cambiar las rutas, controladores o interfaces de usuario.
- Modificar las reglas de descuentos, precio de envio o escalamiento de planes.
- Cambiar el limite transaccional actual de la creacion de ordenes.

