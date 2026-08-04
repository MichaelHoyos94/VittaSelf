import ChartCard from "@/Components/Dashboard/ChartCard";
import EmployeesByRoleChart from "@/Components/Dashboard/EmployeesByRole";
import MetricCard from "@/Components/Dashboard/MetricCard";
import PieChartComponent from "@/Components/Dashboard/PieChartComponent";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { UserGroupIcon, UsersIcon } from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ data }) {
    const tabs = [
        {
            id: "customers",
            label: "customers",
            content: () => (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <MetricCard
                        title="EUIs"
                        value={data.metrics.euis}
                        icon={UsersIcon}
                        description="EUIs registered in the system."
                    />
                    <MetricCard
                        title="EUIs this year"
                        value={data.metrics.euisCreatedThisYear}
                        icon={UserGroupIcon}
                        description={"EUIs registered in the current year."}
                    />
                    <MetricCard
                        title={"EUIs this month"}
                        value={data.metrics.euisCreatedThisMonth}
                        icon={UserGroupIcon}
                        description="EUIs registered in the current month."
                    />
                    <div className="col-span-1 md:col-span-2">
                        <ChartCard
                            title="Users by plan"
                            description="Distribution of registered EUIs by their current plan."
                        >
                            <PieChartComponent data={data.euisByPlan} />
                        </ChartCard>
                    </div>
                </div>
            ),
        },
        {
            id: "employees",
            label: "employees",
            content: () => (
                <ChartCard
                    title="Employees by Role"
                    description="A bar chart showing the number of users registered for each role."
                >
                    <EmployeesByRoleChart data={data.usersByRoles} />
                </ChartCard>
            ),
        },
        { id: "orders", label: "orders" },
        { id: "sanctions", label: "sanctions" },
        { id: "audits", label: "audits" },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const activeTabContent = tabs.find((tab) => tab.id === activeTab);
    return (
        <div className="min-h-full rounded-xl border border-white/50 bg-white/75 p-8 shadow-lg backdrop-blur-lg space-y-4">
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* Buttons */}
            <div className="my-4 flex flex-wrap gap-4">
                {tabs.map((tab) => (
                    <SecondaryButton
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </SecondaryButton>
                ))}
            </div>
            {/* Transition */}
            <div className="transition-all duration-300">
                {activeTabContent?.content?.()}
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <MainLayout children={page} />;
