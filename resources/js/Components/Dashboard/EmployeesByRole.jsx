import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function EmployeesByRoleChart({ data }) {
    return (
        <section>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} accessibilityLayer>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="role" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" name="Employees" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="sr-only">
                Gráfico de barras que presenta la cantidad de usuarios
                registrada para cada rol.
            </p>
        </section>
    );
}
