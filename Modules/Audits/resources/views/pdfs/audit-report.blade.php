<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Informe de Auditoría</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #2d3748;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }

        .accent-bar {
            background: #1e3a5f;
            height: 6px;
            width: 100%;
        }

        .page {
            padding: 30px 40px 80px 40px;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
            padding-bottom: 18px;
            border-bottom: 2px solid #e2e8f0;
        }

        .header-table td {
            vertical-align: middle;
            padding: 0;
        }

        .header-logo-cell {
            width: 110px;
        }

        .header-logo-cell img {
            width: 90px;
        }

        .header-info-cell {
            padding-left: 16px;
        }

        .doc-type {
            font-size: 9px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #1e3a5f;
            margin-bottom: 4px;
        }

        .doc-title {
            font-size: 20px;
            font-weight: bold;
            color: #1a202c;
            line-height: 1.2;
        }

        .company-name {
            font-size: 10px;
            color: #718096;
            margin-top: 4px;
        }

        .header-badge-cell {
            text-align: right;
            width: 120px;
        }

        .meta-card {
            background: #f7fafc;
            border-left: 4px solid #1e3a5f;
            border-radius: 2px;
            padding: 14px 18px;
            margin-bottom: 24px;
        }

        .meta-section-title {
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #718096;
            margin-bottom: 10px;
        }

        .meta-table {
            width: 100%;
            border-collapse: collapse;
        }

        .meta-table td {
            padding: 4px 0;
            vertical-align: middle;
            font-size: 11px;
        }

        .meta-table td.label {
            width: 160px;
            color: #718096;
            font-weight: bold;
        }

        .meta-table td.value {
            color: #2d3748;
        }

        .badge {
            display: inline;
            padding: 3px 8px;
            border-radius: 3px;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: 0.5px;
        }

        .excellent { background: #276749; }
        .good      { background: #2b6cb0; }
        .bad       { background: #c05621; }
        .critical  { background: #9b2c2c; }

        .section-title {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #1e3a5f;
            border-bottom: 1px solid #cbd5e0;
            padding-bottom: 5px;
            margin-bottom: 12px;
        }

        .content {
            text-align: justify;
            line-height: 1.8;
            color: #4a5568;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1e3a5f;
            padding: 8px 40px;
        }

        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }

        .footer-table td {
            vertical-align: middle;
            padding: 0;
            font-size: 9px;
            color: #bee3f8;
        }

        .footer-table td.footer-right {
            text-align: right;
            color: #90cdf4;
        }
    </style>
</head>
<body>

    <div class="accent-bar"></div>

    <div class="page">

        <table class="header-table">
            <tr>
                <td class="header-logo-cell">
                    <img src="{{ public_path('images/logo/logo2.png') }}" alt="Logo empresa">
                </td>
                <td class="header-info-cell">
                    <p class="doc-type">Auditoría · Informe Oficial</p>
                    <p class="doc-title">Informe de Auditoría</p>
                    <p class="company-name">VittaSelf S.A.S. — NIT 915.789.159-1</p>
                </td>
                <td class="header-badge-cell">
                    <span class="badge {{ strtolower($audit->status) }}">
                        {{ ucfirst($audit->status) }}
                    </span>
                </td>
            </tr>
        </table>

        <div class="meta-card">
            <p class="meta-section-title">Información del documento</p>
            <table class="meta-table">
                <tr>
                    <td class="label">Auditado por</td>
                    <td class="value">{{ $audit->auditor->full_name ?? 'No registrado' }}</td>
                </tr>
                <tr>
                    <td class="label">Fecha de auditoría</td>
                    <td class="value">{{ $audit->created_at->format('d/m/Y H:i') }}</td>
                </tr>
                <tr>
                    <td class="label">Estado</td>
                    <td class="value">
                        <span class="badge {{ strtolower($audit->status) }}">
                            {{ ucfirst($audit->status) }}
                        </span>
                    </td>
                </tr>
            </table>
        </div>

        <p class="section-title">Contenido del informe</p>
        <div class="content">
            {!! nl2br(e($audit->report)) !!}
        </div>

    </div>

    <div class="footer">
        <table class="footer-table">
            <tr>
                <td>VittaSelf S.A.S. · Av Bolivar 14 # 01N-23 · Tel: 321-809-5197</td>
                <td class="footer-right">Generado automáticamente · {{ now()->format('d/m/Y H:i') }}</td>
            </tr>
        </table>
    </div>

</body>
</html>