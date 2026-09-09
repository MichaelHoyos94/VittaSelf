# Plan

## Backend

- Agregar en `PlanRepository` una consulta para obtener el plan correspondiente a un total de puntos acumulados.
- Agregar en `PlanService` un metodo para sumar puntos al empresario y actualizar su plan cuando aplique.
- Llamar el escalamiento desde `OrderService` despues de crear una orden web exitosa.
- Llamar el escalamiento desde `InternalOrderService` despues de crear una orden interna exitosa.
- Respetar las restricciones ya calculadas por sanciones: `freeze_points` y `freeze_plan`.

## Datos

- Usar la columna existente `users.points` para el acumulado.
- Usar la columna existente `users.plan_id` para el plan actual.
- Usar la columna existente `plans.min_points` para determinar el plan objetivo.
- No modificar migraciones existentes.

## Pruebas

- Probar que una orden web suma puntos y asciende el plan.
- Probar que una orden interna suma puntos y asciende el plan.
- Probar que `FREEZE_POINTS` impide sumar puntos.
- Probar que `FREEZE_PLAN` permite sumar puntos pero no cambia el plan.
