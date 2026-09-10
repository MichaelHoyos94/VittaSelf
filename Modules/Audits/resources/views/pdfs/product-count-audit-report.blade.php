<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Informe de Auditoría — Conteo de Productos</title>

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

        /* ── Accent bar ─────────────────────────── */
        .accent-bar {
            background: #1e3a5f;
            height: 6px;
            width: 100%;
        }

        .page {
            padding: 30px 40px 80px 40px;
        }

        /* ── Header ─────────────────────────────── */
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

        /* ── Meta card ──────────────────────────── */
        .meta-card {
            background: #f7fafc;
            border-left: 4px solid #1e3a5f;
            border-radius: 2px;
            padding: 14px 18px;
            margin-bottom: 20px;
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
            width: 200px;
            color: #718096;
            font-weight: bold;
        }

        .meta-table td.value {
            color: #2d3748;
        }

        /* ── Stats table ─────────────────────────── */
        .stats-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }

        .stats-table th {
            background: #2c5282;
            color: #fff;
            padding: 7px 10px;
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: left;
        }

        .stats-table td {
            padding: 6px 10px;
            font-size: 11px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
        }

        .stats-table tr:last-child td {
            border-bottom: none;
        }

        .stats-table tr.even td {
            background: #f7fafc;
        }

        .stats-table td.num {
            text-align: right;
            font-weight: bold;
            color: #2d3748;
        }

        .stats-table td.num-negative {
            text-align: right;
            font-weight: bold;
            color: #9b2c2c;
        }

        /* ── Badge ──────────────────────────────── */
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

        .correct              { background: #276749; }
        .correct_with_issues  { background: #2b6cb0; }
        .incorrect            { background: #9b2c2c; }

        /* ── Section heading ─────────────────────── */
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

        /* ── Footer ─────────────────────────────── */
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

        {{-- ── HEADER ─────────────────────────────────────── --}}
        <table class="header-table">
            <tr>
                <td class="header-logo-cell">
                    <img src="{{ public_path('images/logo/logo2.png') }}" alt="Logo empresa">
                </td>
                <td class="header-info-cell">
                    <p class="doc-type">Auditoría · Conteo de Productos</p>
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

        {{-- ── META CARD ───────────────────────────────────── --}}
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

        {{-- ── RESUMEN DE CONTEO ───────────────────────────── --}}
        <p class="section-title">Resumen del Conteo</p>
        <table class="stats-table">
            <tr>
                <th>Métrica</th>
                <th style="text-align:right;">Valor</th>
            </tr>
            <tr>
                <td>Productos esperados</td>
                <td class="num">{{ $audit->total_expected_products }}</td>
            </tr>
            <tr class="even">
                <td>Productos contados</td>
                <td class="num">{{ $audit->total_counted_products }}</td>
            </tr>
            <tr>
                <td>Diferencia</td>
                @php $diff = $audit->total_difference; @endphp
                <td class="{{ $diff < 0 ? 'num-negative' : 'num' }}">{{ $diff > 0 ? '+' : '' }}{{ $diff }}</td>
            </tr>
            <tr class="even">
                <td>Productos con observaciones</td>
                <td class="num">{{ $audit->products_with_observations }}</td>
            </tr>
        </table>

        {{-- ── INFORME ─────────────────────────────────────── --}}
        <p class="section-title">Contenido del informe</p>
        <div class="content">
            {!! nl2br(e($audit->report)) !!}
        </div>

    </div>

    {{-- ── FOOTER ──────────────────────────────────────────── --}}
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