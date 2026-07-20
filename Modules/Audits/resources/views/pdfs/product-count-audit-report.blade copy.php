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
            padding: 4px 4px;
            border-radius: 4px;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 11px;
        }

        .correct {
            background: #15803d;
        }

        .correct_with_issues {
            background: #2563eb;
        }

        .incorrect {
            background: #d91b06;
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
        <img class="logo" src="{{ public_path('images/logo/logo2.png') }}" alt="Logo empresa">

        <p class="title">Informe de Auditoría</p>

        <div class="meta">
            <strong>Auditado por:</strong> {{ $audit->auditor->full_name ?? 'No registrado' }} <br>
            <strong>Fecha:</strong> {{ $audit->created_at->format('d/m/Y H:i') }} <br>
            <strong>Caja:</strong> {{ $audit->cash_register_closure->cash_register->name ?? 'No registrada' }} <br>
            <strong>Efectivo esperado:</strong> {{ number_format($audit->expected_cash, 2) }} <br>
            <strong>Efectivo contado:</strong> {{ number_format($audit->counted_cash, 2) }} <br>
            <strong>Transferencias esperadas:</strong> {{ number_format($audit->expected_transfers, 2) }} <br>
            <strong>Transferencias contadas:</strong> {{ number_format($audit->counted_transfers, 2) }} <br>
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
        VittaSelf S.A.S. — NIT 915.789.159-1 — Dirección: Av Bolivar 14 # 01N-23 — Tel: 321-809-5197 <br>
        Este documento fue generado automáticamente por el sistema de auditorías.
    </div>

</body>
</html>