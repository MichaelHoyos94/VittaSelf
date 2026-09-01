# 027 . Sistema multinivel para empresarios — Plan

## Enfoque

Diseñar e implementar la estructura y relaciones en `User` para el sistema multinivel de los empresarios. Un empresario puede tener muchos empresarios representados, pero solo puede ser representado por uno o ninguno.

## Implementación

1. Backend
    - Modificar el modelo `User` `user 1 <-> n users` para que tenga representante (nullable) y representados.
    - Migracion para la columna `proxy_id` en la tabla `users` llave foranea a `users`.
    - Incluir en el request `proxy_id`.
    - Modificar el servicio de negocio que crea los empresarios para evitar la creacion del empresario si el representante esta inactivo 

2. Frontend
    - Modificar el formulario para crear empresarios con un buscador de empresarios por `eui_code`
    - Botón de lupa para buscar si aun no hay representante o boton X para eliminarlo si ya existe.
    - Botón lupa debe previsualizarse la info del representante, tomar como referencia `InternalOrders.jsx`
    - Al usar boton lupa, si el usuario esta inactivo o sancionado debe mostrarse esta alerta en la previsualizacion y deshabilitar el boton para enviar formulario.

## Decisiones

- `proxy_id` puede ser null, es decir puede no existir un representante (seria una raiz del arbol).
- Modificar solo la table `users`.
- Los empresarios inactivos o con sanciones `SUSPEND_CODE` `SUSPEND_ACCOUNT` no pueden sumar empresarios a su red.