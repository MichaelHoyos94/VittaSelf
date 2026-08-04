import ChartCard from "@/Components/Dashboard/ChartCard";
import EmployeesByRoleChart from "@/Components/Dashboard/EmployeesByRole";
import LineChartComponent from "@/Components/Dashboard/LineChartComponent";
import MetricCard from "@/Components/Dashboard/MetricCard";
import PieChartComponent from "@/Components/Dashboard/PieChartComponent";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import {
    ShoppingBagIcon,
    UserGroupIcon,
    UsersIcon,
} from "@heroicons/react/16/solid";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ data }) {
    console.log(data);
    const tabs = [
        {
            id: "customers",
            label: "customers",
            content: () => (
                <>
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <ChartCard
                            title="Users by plan"
                            description="Distribution of registered EUIs by their current plan."
                        >
                            <PieChartComponent data={data.euisByPlan} />
                        </ChartCard>
                        <ChartCard
                            title="EUIs registered by month"
                            description="Number of EUIs registered in the system for each month."
                        >
                            <LineChartComponent
                                data={data.usersRegisteredByMonth}
                            />
                        </ChartCard>
                    </div>
                </>
            ),
        },
        {
            id: "employees",
            label: "employees",
            content: () => (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        <MetricCard
                            title="Employees"
                            icon={UsersIcon}
                            description="Employees registered and active in the system."
                            value={data.metrics.employees}
                        />
                    </div>
                    <div className="mt-4">
                        <ChartCard
                            title="Employees by Role"
                            description="A bar chart showing the number of users registered for each role."
                        >
                            <EmployeesByRoleChart data={data.usersByRoles} />
                        </ChartCard>
                    </div>
                </>
            ),
        },
        {
            id: "orders",
            label: "orders",
            content: () => (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <MetricCard
                            title="Internal Orders"
                            icon={ShoppingBagIcon}
                            description="Internal orders by the current year."
                            value={data.metrics.internalOrders}
                        />
                        <MetricCard
                            title="Web Orders"
                            icon={ShoppingBagIcon}
                            description="Web orders by the current year."
                            value={data.metrics.webOrders}
                        />
                        <ChartCard
                            title="Orders by months"
                            description="Orders by months"
                        >
                            <LineChartComponent data={data.webOrdersMonthly} />
                        </ChartCard>
                    </div>
                </>
            ),
        },
        { id: "sanctions", label: "sanctions", content: () => (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <MetricCard 
                        title="All Cases"
                        value={data.metrics.disciplinaryCases}
                        icon={UsersIcon}
                        description="All disciplinary cases."
                    />
                    <MetricCard 
                        title="Unassigned Cases"
                        value={data.metrics.disciplinaryCasesUnassigned}
                        icon={UsersIcon}
                        description="Unassigned disciplinary cases."
                    />
                    <MetricCard 
                        title="Open Cases"
                        value={data.metrics.disciplinaryCasesOpen}
                        icon={UsersIcon}
                        description="Investigations on going."
                    />
                    <MetricCard 
                        title="Awaiting Evidences"
                        value={data.metrics.disciplinaryCasesAwaitingEvidences}
                        icon={UsersIcon}
                        description="Cases awaiting for evidences."
                    />
                    <MetricCard 
                        title="On Resolution."
                        value={data.metrics.disciplinaryCasesOnResolution}
                        icon={UsersIcon}
                        description="Cases about to be solved."
                    />
                </div>
            </>
        )},
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
