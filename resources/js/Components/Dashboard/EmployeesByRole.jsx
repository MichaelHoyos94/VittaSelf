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
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--primary-100)" />
                        <XAxis dataKey="role" stroke="var(--primary-900)" />
                        <YAxis allowDecimals={false} stroke="var(--primary-900)" />
                        <Tooltip wrapperClassName="dashboard-tooltip" cursor={{ fill: 'var(--primary-50)' }} />
                        <Bar dataKey="count" name="Employees" fill="var(--primary-700)" />
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
