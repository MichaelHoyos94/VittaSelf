# Plan

## Caracterizacion

- Cubrir con pruebas los calculos y efectos actuales de ordenes web e internas.
- Verificar beneficios de plan, restricciones de sanciones y vaciado del carrito.
- Incluir una prueba que exija que `FREEZE_POINTS` registre cero puntos en la orden.

## Servicio compartido

- Crear `OrderProcessingService` dentro de `app/Services`.
- Inyectar `UserService`, `PlanService` y `SanctionEnforcementService` de forma explicita.
- Centralizar la evaluacion de restricciones, preparacion de importes, aplicacion de beneficios y aplicacion de puntos.
- Recibir lineas de producto normalizadas con `quantity`, `price` y `points`, manteniendo intactos los productos originales dentro de los datos de la orden.

## Servicios de ordenes

- Mantener `OrderService` e `InternalOrderService` como orquestadores.
- Normalizar en cada servicio la representacion particular de sus productos.
- Mantener la persistencia en el repositorio correspondiente.
- Mantener el vaciado del carrito exclusivamente en `OrderService`.
- Eliminar el bloque de implementacion antiguo comentado y dependencias que resulten innecesarias.
- Conservar temporalmente los contratos publicos existentes cuando retirarlos pueda afectar llamadas externas.

## Verificacion

- Formatear los archivos PHP modificados con Pint.
- Ejecutar primero las pruebas enfocadas en ordenes, planes y sanciones.
- Ejecutar la suite completa si el entorno de pruebas disponible lo permite.

