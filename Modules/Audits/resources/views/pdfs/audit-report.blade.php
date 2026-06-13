<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Informe de Auditoría</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #222;
            margin: 40px;
        }

        .header {
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }

        .logo {
            width: 120px;
            margin-bottom: 10px;
        }

        .title {
            font-size: 22px;
            font-weight: bold;
            margin: 0;
        }

        .meta {
            margin-top: 15px;
            line-height: 1.6;
        }

        .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 4px;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
        }

        .excellent {
            background: #15803d;
        }

        .good {
            background: #2563eb;
        }

        .bad {
            background: #d97706;
        }

        .critical {
            background: #b91c1c;
        }

        .content {
            margin-top: 25px;
            text-align: justify;
            line-height: 1.7;
        }

        .footer {
            position: fixed;
            bottom: 20px;
            left: 40px;
            right: 40px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            font-size: 10px;
            color: #555;
            text-align: center;
        }
    </style>
</head>
<body>

    <div class="header">
        <img class="logo" src="{{ public_path('images/company-logo.png') }}" alt="Logo empresa">

        <p class="title">Informe de Auditoría</p>

        <div class="meta">
            <strong>Auditado por:</strong> {{ $audit->auditor->name ?? 'No registrado' }} <br>
            <strong>Fecha:</strong> {{ $audit->created_at->format('d/m/Y H:i') }} <br>
            <strong>Estado:</strong>
            <span class="badge {{ strtolower($audit->status) }}">
                {{ ucfirst($audit->status) }}
            </span>
        </div>
    </div>

    <div class="content">
        {!! nl2br(e($audit->report)) !!}
    </div>

    <div class="footer">
        Empresa XYZ S.A.S. — NIT 900.000.000-0 — Dirección: Calle 00 # 00-00 — Tel: 000 000 0000 <br>
        Este documento fue generado automáticamente por el sistema de auditorías.
    </div>

</body>
</html>