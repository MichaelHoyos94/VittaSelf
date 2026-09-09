# VittaSelf

VittaSelf es un ERP ligero para una plataforma de ventas multinivel. Permite gestionar empresarios, productos, ordenes, carrito de compras, sanciones, auditorias, cajas registradoras, centros de costo, planes, beneficios y metricas de negocio.

El sistema esta pensado para dos tipos de usuarios:

- Empleados de VittaSelf que operan procesos internos.
- Empresarios o EUIs que compran productos y hacen parte de una red multinivel.

## Usuarios De Prueba

Estos usuarios se crean en develop `https://vittaself-develop.onrender.com/` para interactuar con el sitio.

| Rol | Email | Password |
| --- | --- | --- |
| Administrador | `sistemasaux@vittaself.com` | `Vitta$elf` |
| Asesor comercial | `asesor-armenia@vittaself.com` | `Vitta$elf` |
| EUI | `empresario@vittaself.com` | `Vitta$elf` |

## Manual De Uso Basico 📖

### Dashboard

El dashboard muestra indicadores por secciones. Permite revisar empresarios, ordenes, sanciones y auditorias mediante tarjetas de metricas y graficos.

### Empresarios

La gestion de empresarios permite consultar, crear, editar y eliminar EUIs. Los empresarios pueden tener representante, representados, puntos y plan asociado.

### Catalogo Y Productos

El catalogo permite ver productos disponibles y agregarlos al carrito. La administracion de productos permite crear, editar y eliminar productos del sistema.

### Carrito Y Ordenes Web

El empresario puede agregar productos al carrito, modificar cantidades, eliminar items y finalizar la compra como orden web.

### Ordenes Internas

Los asesores comerciales pueden registrar ordenes internas para empresarios. El procesamiento comparte reglas de descuentos, beneficios, puntos y sanciones con las ordenes web.

### Planes, Beneficios Y Puntos

Los empresarios acumulan puntos por ordenes validas. Al alcanzar las condiciones de un plan, el sistema puede escalar el plan y aplicar beneficios configurados.

### Cajas Registradoras

Los asesores pueden abrir y cerrar su caja registradora. El cierre de caja queda disponible para auditoria.

### Centros De Costo

Los centros de costo representan sedes o puntos operativos. El sistema permite gestionarlos y asociarlos a procesos internos.

### Sanciones

El modulo de sanciones permite crear casos disciplinarios, asignarlos, gestionar estados, recibir descargos y registrar resoluciones. Algunas sanciones pueden bloquear ordenes, congelar puntos o congelar el plan del empresario.

### Auditorias

El modulo de auditorias permite revisar procesos auditables como conteos de productos, listas de calidad y cierres de caja. Al crear auditorias se pueden generar informes PDF.

## Stack Tecnico

- Backend: Laravel 11 sobre PHP 8.2 o superior.
- Frontend: React 18.2 con Inertia.js.
- Bundler: Vite 5.
- Base de datos: MySQL 8.
- Permisos: Spatie Laravel Permission.
- Modulos: nwidart/laravel-modules.
- PDF: barryvdh/laravel-dompdf.
- Graficos: Recharts.
- Tests: Pest y PHPUnit.
- Formato PHP: Laravel Pint.

## Modulos Documentados

- `Audits`: auditorias de procesos como conteo de productos, cierre de caja y listas de calidad.
- `Sanctions`: casos disciplinarios, descargos, resoluciones, catalogos y sanciones aplicables.

## Funcionalidades Principales

- Dashboard con metricas de empresarios, ordenes, sanciones y auditorias.
- Gestion de empresarios y red multinivel.
- Catalogo de productos y administracion de productos.
- Carrito de compras y ordenes web.
- Ordenes internas realizadas por asesores.
- Planes, beneficios, puntos y escalamiento de planes.
- Cajas registradoras para asesores comerciales.
- Gestion de centros de costo.
- Casos disciplinarios, manejo de estados y resoluciones.
- Auditorias e informes en PDF.

## Arquitectura

El proyecto sigue una arquitectura por capas:

- Controller: recibe solicitudes HTTP, valida entrada, llama servicios y responde con Inertia o redirecciones.
- Service: contiene reglas de negocio y orquesta operaciones del dominio.
- Repository: ejecuta consultas y persistencia sobre modelos o entidades.

La aplicacion usa Laravel + Inertia React. Las paginas principales viven en `resources/js/Pages`. Las paginas de modulos se resuelven desde `Modules/<Module>/resources/assets/js/Pages`.

Las rutas principales estan en `routes/web.php`. Los modulos cargan sus rutas desde sus propios `RouteServiceProvider`.

## Requisitos Locales

- PHP 8.2 o superior.
- Composer 2.
- Node.js 20 o compatible con Vite 5.
- npm.
- MySQL 8.
- Extensiones PHP habituales para Laravel, incluyendo `pdo_mysql`, `bcmath`, `gd`, `intl`, `mbstring`, `zip` y `opcache`.

## Instalacion Local

1. Instalar dependencias PHP:

```bash
composer install
```

2. Instalar dependencias frontend:

```bash
npm install
```

3. Crear archivo de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Generar llave de aplicacion:

```bash
php artisan key:generate
```

5. Configurar la conexion MySQL en `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vittaself
DB_USERNAME=root
DB_PASSWORD=
```

6. Ejecutar migraciones:

```bash
php artisan migrate
```

7. Ejecutar seeders base:

```bash
php artisan db:seed
```

8. Levantar servidor Laravel:

```bash
php artisan serve
```

9. Levantar Vite en otra terminal:

```bash
npm run dev
```

## Usuarios De Prueba

Estos usuarios se crean en develop `https://vittaself-develop.onrender.com/` para interactuar con el sitio.

| Rol | Email | Password |
| --- | --- | --- |
| Administrador | `sistemasaux@vittaself.com` | `Vitta$elf` |
| Asesor comercial | `asesor-armenia@vittaself.com` | `Vitta$elf` |
| EUI | `empresario@vittaself.com` | `Vitta$elf` |

## Comandos Utiles

Servidor local:

```bash
php artisan serve
```

Frontend en desarrollo:

```bash
npm run dev
```

Build de produccion, cliente y SSR:

```bash
npm run build
```

Pruebas:

```bash
php artisan test
```

Prueba enfocada:

```bash
php artisan test --filter "nombre de la prueba"
```

Formato PHP:

```bash
vendor/bin/pint
```

En Windows PowerShell:

```powershell
vendor\bin\pint
```

## Migraciones Y Seeders

Las migraciones crean el esquema principal de usuarios, productos, ordenes, planes, beneficios, sanciones, auditorias, cajas y centros de costo.

Los seeders base cargan productos, centros de costo, roles, permisos, planes, beneficios y usuarios de prueba.

```bash
php artisan migrate --seed
```

Para produccion se recomienda ejecutar migraciones y seeders de forma controlada, revisando primero que el entorno apunte a la base correcta.

## Tests

El proyecto usa Pest y PHPUnit. Los tests de `tests/Feature` aplican `RefreshDatabase` desde `tests/Pest.php`.

El archivo `phpunit.xml` no fuerza SQLite; por defecto los tests usan la base configurada para el entorno. Antes de ejecutar la suite completa, confirmar que la base de pruebas sea segura.

```bash
php artisan test
```

## Notas De Seguridad

- No subir `.env` ni credenciales reales al repositorio.
- No usar usuarios de prueba en produccion.
- Confirmar la base de datos antes de ejecutar migraciones, seeders o tests destructivos.
- El almacenamiento local de Render no debe usarse como persistencia definitiva para archivos subidos o PDFs.
