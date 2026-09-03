# Roadmap

Orden de las features.

## Hecho ✅

1. **001 . Configuracion inicial**: Estructura principal del sitio (frontend) con header, sidebar, footer y content dinamico.
2. **002 . Recursos humanos**: Gestion de empleados con consulta de datos, tabla con paginacion, modal para crear/editar empleados y eliminacion de empleados.
3. **003 . Gestion de empresarios**: Gestion de empresarios con consulta de datos, tabla con paginacion, modal para crear/editar empresarios (euis) y eliminacion.
4. **004 . Login y logout**: Implementacion de autenticacion para empleados y empresarios.
5. **005 . Gestion de cajas registradoras**: Flujo para crear, asignar y liberar cajas registradoras.
6. **006 . Ordenes internas**: Flujo para crear una orden interna, la realiza el asesor y se asocia un empresario que compra.
7. **007 . Catalogo de productos**: Vista con el catalogo de productos en tarjetas dinamicas y el boton ADD TO CART.
8. **008 . Carrito de compras**: Carro de compras persistente, el empresario puede modificar las cantidades de los productos o eliminar un producto del carro.
9. **009 . Ordenes web**: Flujo para realizar pedidos desde un empresario sin necesidad de un asesor desde el carrito de compras.
10. **010 . Planes y beneficios**: Sistema de planes y beneficios que modifican el comportamiento de las ordenes.
11. **011 . Gestión de casos disciplinarios**: Vista para consultar en una tabla los casos disciplinarios y crear nuevos casos.
12. **012 . Manejo de casos disciplinarios**: Ventana para que el administrador pueda asignarse a este caso y darle manejo a los estados secuenciales y finalmente dar una resolucion.
13. **013 . Gestión de catalogos del modulo de sanciones**: Seccion donde el administrador puede gestionar los catalogos de datos del módulo de sanciones.
14. **014 . Historico de resoluciones**: Ventana de consulta con tabla de las resoluciones creadas en los procesos disciplinarios.
15. **015 . Vista mis casos**: Pagina donde el empresario consulta en una tabla los casos disciplinarios asociados a el.
16. **016 . Descargos del empresario**: Modal que se accede desde la vista `MyCases.jsx` donde el empresario puede subir los descargos del proceso.
17. **017 . Aplicación de sanciones**: Modificación de las features de ordenes para que se comporten distinto si el empresario esta sancionado.
18. **018 . Lista de checkeo de calidad**: Flujo donde el asesor comercial consulta y crea listas de checkeo de calidad para ser auditadas.
19. **019 . Conteo de productos**: Flujo donde el asesor comercial consulta y crea conteos de productos para ser auditados.
20. **020 . Mi caja registradora**: Ventana donde el asesor puede abrir y cerrar su caja. El cierre de caja sera auditado.
21. **021 . Auditorias**: Modulo para consultar y crear auditar los procesos auditables (Conteo de productos, lista de checkeo de calidad y cierre de caja).
22. **022 . Informes de auditorias**: Generacion de informes en PDF con almacenamiento local al crear una auditoria.
23. **023 . Gestión de centros de costos**: Flujo para gestionar la creacion, edicion, lectura (pagina y tabla) y eliminacion de centros de costos del sistema.
24. **024 . Gestión de productos**: Flujo gestion del catalogo de productos CRUD.
27. **027 . Sistema multinivel para empresarios**: Funcionalidad de representantes y representados.
28. **028 . Escalamiento de planes por puntos**: Flujo para que los empresarios asciendan en su plan, por medio de los puntos obtenidos por las ordenes web e internas.
29. **029 . Despliegue de rama develop**: Configuracion para el despliegue de este proyecto en **render** para CI/CD.

## Siguiente 🏗️

25. **025 . Ingresos de inventario**: Operación que ingresa productos al `stock` de un `cost_center` y queda registrado como un `inventory-entry` para posteriores consultas.
26. **026 . Transferencias de inventario**: Operacion que mueve productos del stock de un centro de costos origen a uno de destino.

## Backlog / ideas 💡


> Cada feature nueva se crea como `spec/features/NNN-name` con `spec.md`, `plan.md` y `tasks.md` antes de tocar código.
