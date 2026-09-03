# Tasks

- [x] Crear documentacion SDD de la feature 030.
- [x] Agregar pruebas de caracterizacion para ambos flujos de ordenes.
- [x] Implementar `OrderProcessingService` y sus pruebas unitarias.
- [x] Refactorizar `OrderService` conservando su contrato y efectos particulares.
- [x] Refactorizar `InternalOrderService` conservando su contrato y efectos particulares.
- [x] Eliminar codigo comentado y dependencias sin uso del flujo refactorizado.
- [x] Ejecutar Pint y las pruebas enfocadas.
- [x] Ejecutar la suite completa si el entorno lo permite.
- [x] Marcar la feature como hecha y actualizar el roadmap.

## Bloqueo de cierre

- La migracion local en curso hace obligatorio `orders.order_number`, pero el flujo actual no define como generarlo. Los tres escenarios web de `PlanEscalationTest` no pueden persistir hasta que se establezca esa regla.
- La suite tambien conserva seis fallos no relacionados con este refactor.
