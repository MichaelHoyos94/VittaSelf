# 028 . Escalamiento de planes por puntos

**Estado**: Hecho

## Descripcion

Implementar el escalamiento automatico de planes para empresarios segun los puntos acumulados por ordenes web e internas.

## Criterios de aceptacion

- [x] Al crear una orden web exitosa, los puntos de la orden se suman a los puntos acumulados del empresario.
- [x] Al crear una orden interna exitosa, los puntos de la orden se suman a los puntos acumulados del empresario.
- [x] Despues de sumar puntos, el sistema asigna al empresario el plan con mayor `min_points` menor o igual a sus puntos acumulados.
- [x] Si el empresario tiene una sancion activa `FREEZE_POINTS`, la orden no suma puntos.
- [x] Si el empresario tiene una sancion activa `FREEZE_PLAN`, la orden puede sumar puntos, pero no cambia el plan.
- [x] El escalamiento respeta los planes existentes cargados por `PlanSeeder`.
- [x] No se modifican migraciones existentes.

## Fuera de alcance

- Descenso automatico de plan.
- Comisiones, bonos o billetera.
- Historial de cambios de plan.
- Escalamiento por puntos de red o representados.
