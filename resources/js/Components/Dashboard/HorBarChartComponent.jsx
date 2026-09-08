import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function HorBarChartComponent({ data = [] }) {
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex h-80 items-center justify-center text-sm text-gray-500">
                No hay casos disciplinarios para mostrar.
            </div>
        );
    }

    return (
        <div className="relative h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 55,
                        bottom: 10,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--primary-100)" />

                    <XAxis
                        stroke="var(--primary-900)"
                        type="number"
                        dataKey="count"
                        allowDecimals={false}
                        domain={[0, "dataMax + 1"]}
                    />

                    <YAxis
                        stroke="var(--primary-900)"
                        type="category"
                        dataKey="label"
                        width={100}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        wrapperClassName="dashboard-tooltip"
                        cursor={{ fill: 'var(--primary-50)' }}
                        formatter={(value) => [value, "Casos disciplinarios"]}
                    />

                    <Bar
                        dataKey="count"
                        name="Casos"
                        fill="var(--primary-700)"
                        radius={[0, 6, 6, 0]}
                        minPointSize={5}
                    >
                        <LabelList dataKey="count" position="right" fill="var(--primary-900)" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
