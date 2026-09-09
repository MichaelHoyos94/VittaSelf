# Plan

1. Usar primary-700 para series, primary-100 para guias y primary-900 para texto destacado. Alternar tonos oscuros y claros en sectores con separadores blancos.
2. Mantener tipografia y distribucion existentes; aplicar bordes primary suaves y superficies blancas a tarjetas.
3. Estilizar tooltips con CSS limitado al dashboard y leyendas con clases Tailwind. Usar atributos SVG para los colores de los graficos, sin nuevos estilos inline.
4. Usar botones locales de seleccion con aria-pressed, estado activo verde oscuro, hover y foco visible, sin cambiar SecondaryButton global.
5. Ejecutar npm run build y git diff --check. Revisar referencias de colores y registrar la revision visual pendiente si no hay navegador disponible.
