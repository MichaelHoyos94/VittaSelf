# 027 . Sistema multinivel para empresarios

**Estado**: Hecho

## Descripcion

Implementar la relacion multinivel basica entre empresarios, donde un empresario puede representar a otros empresarios y cada empresario representado conserva la referencia a su representante directo.

## Criterios de aceptacion

- [x] Se puede registrar un empresario indicando opcionalmente el codigo EUI de su representante.
- [x] El representante debe ser un empresario existente.
- [x] El formulario incluye un buscador por codigo EUI para el representante.
- [x] Si el representante buscado es apto, se previsualiza su informacion.
- [x] Si el representante buscado esta sancionado o inactivo, se muestra una alerta informativa.
- [x] Si el representante buscado esta sancionado o inactivo, se deshabilita el envio del formulario.
- [x] La tabla de empresarios muestra el representante directo cuando existe.
- [x] La tabla de empresarios muestra el numero de representados directos.
- [x] El empresario autenticado puede consultar una vista de sus representados directos.
- [x] La vista `My Referrals` muestra nombre, codigo EUI, plan, puntos y fecha de registro de cada representado directo.
- [x] La ruta de `My Referrals` reemplaza la pagina temporal de coming soon.
- [x] No se modifican migraciones existentes.

## Fuera de alcance

- Calculo de comisiones o billetera.
- Arbol multinivel completo con profundidad ilimitada.
- Transferencia de redes entre representantes.
- Cambios de plan automaticos por red.
