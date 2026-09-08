import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = [
    'var(--primary-800)',
    'var(--primary-400)',
    'var(--primary-600)',
    'var(--primary-200)',
    'var(--primary-900)',
    'var(--primary-500)',
];

const LABEL_KEYS = ["name", "label", "plan", "role", "category"];
const VALUE_KEYS = ["value", "count", "total", "quantity", "amount"];

function normalizeData(data) {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map((item, index) => {
        const entries = Object.entries(item ?? {});
        const valueEntry =
            entries.find(([key]) => VALUE_KEYS.includes(key)) ??
            entries.find(
                ([, value]) =>
                    value !== "" && Number.isFinite(Number(value)),
            );
        const labelEntry =
            entries.find(([key]) => LABEL_KEYS.includes(key)) ??
            entries.find(([key]) => key !== valueEntry?.[0]);

        return {
            id: `${labelEntry?.[1] ?? "item"}-${index}`,
            name: String(labelEntry?.[1] ?? `Item ${index + 1}`),
            value: Number(valueEntry?.[1]) || 0,
        };
    });
}

export default function PieChartComponent({ data = [] }) {
    const chartData = normalizeData(data);
    const total = chartData.reduce(
        (accumulator, item) => accumulator + item.value,
        0,
    );

    if (chartData.length === 0) {
        return (
            <div className="flex h-80 items-center justify-center text-sm text-gray-500">
                No hay datos para mostrar.
            </div>
        );
    }

    return (
        <div className="relative h-80" role="img" aria-label="Gráfico circular">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius="55%"
                        outerRadius="85%"
                        stroke="white"
                        strokeWidth={2}
                        paddingAngle={3}
                    >
                        {chartData.map((item, index) => (
                            <Cell
                                key={item.id}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip wrapperClassName="dashboard-tooltip" />
                    <Legend formatter={(value) => <span className="text-sm text-primary-900">{value}</span>} />
                </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-10">
                <div className="text-center">
                    <p className="text-3xl font-bold text-primary-900">{total}</p>

                    <p className="text-sm text-gray-500">Total</p>
                </div>
            </div>
        </div>
    );
}
