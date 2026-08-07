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
            <div className="flex h-[420px] items-center justify-center text-sm text-gray-500">
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
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                    <XAxis
                        type="number"
                        dataKey="count"
                        allowDecimals={false}
                        domain={[0, "dataMax + 1"]}
                    />

                    <YAxis
                        type="category"
                        dataKey="label"
                        width={190}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [value, "Casos disciplinarios"]}
                    />

                    <Bar
                        dataKey="count"
                        name="Casos"
                        fill="#2563eb"
                        radius={[0, 6, 6, 0]}
                        minPointSize={5}
                    >
                        <LabelList dataKey="count" position="right" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
