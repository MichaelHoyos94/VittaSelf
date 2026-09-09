# Feat 032: Colores del dashboard

## Objetivo

Unificar el dashboard con la escala verde `primary` existente sin cambiar datos, estructura, tipografia ni comportamiento de negocio.

## Alcance y criterios de aceptacion

- Lineas, barras y sectores usan variables CSS `--primary-*`, sin colores de marca duplicados.
- Los sectores, incluidos estados de auditoria, alternan tonos verdes y conservan leyendas, valores y separacion visual.
- Tarjetas, tooltips y leyendas mantienen textos legibles sobre superficies neutras.
- La seccion seleccionada tiene un estado visible y accesible; los botones conservan foco de teclado y se adaptan al ancho disponible.
- Las cinco secciones mantienen sus datos y estados vacios existentes.
- No se modifica el tema global, componentes compartidos fuera del dashboard, backend, migraciones ni dependencias.
- El build de cliente y SSR debe pasar. La revision visual de escritorio y movil debe documentarse, incluidas limitaciones de verificacion.
