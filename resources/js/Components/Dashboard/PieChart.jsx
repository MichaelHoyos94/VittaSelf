import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

export default function UsersByRoleChart({ data }) {
    const total = data.reduce(
        (accumulator, item) => accumulator + Number(item.total),
        0,
    );

    return (
        <div className="relative h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={3}
                    >
                        {data.map((item, index) => (
                            <Cell
                                key={item.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-10">
                <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{total}</p>

                    <p className="text-sm text-gray-500">Usuarios</p>
                </div>
            </div>
        </div>
    );
}
