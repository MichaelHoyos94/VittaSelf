import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";
import Badge from "@/Components/Badge";

const tabs = [
    { id: "quality", label: "Quality" },
    { id: "products", label: "Products" },
    { id: "cash", label: "Cash" },
];

export default function Index() {
    const {
        productCountAudits,
        qualityChecklistAudits,
        cashRegisterClosuresAudits,
        flash,
    } = usePage().props;

    const productCountAuditsColumns = [
        {
            header: "Audited By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.auditor.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>{row.auditor.full_name}</span>
                        <span className="text-sm text-gray-500">{row.auditor.email}</span>
                        <span className="text-sm text-gray-500">{row.auditor.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "Audited at",
            render: (row) => <span>{new Date(row.audited_at).toLocaleString('en-US', {
                'year': 'numeric',
                'month': 'long',
                'day': 'numeric',
            })}</span>
        },
        {
            header: "Status",
            render: (row) => <Badge
                type={
                    row.status === 'correct' ? 'success'
                        : row.status === 'incorrect' ? 'error'
                            : 'warning'
                }
                text={row.status}
            />,
        },
        {
            header: "Expected Products",
            accessor: "total_expected_products",
        },
        {
            header: "Counted Products",
            accessor: "total_counted_products",
        },
        {
            header: "Total Difference",
            accessor: "total_difference",
        },
        {
            header: "Products With Mismatch",
            accessor: "products_with_mismatch",
        },
        {
            header: "Report",
            render: (row) => (
                <div>
                    <PrimaryButton
                        type="button"
                        className="gap-1"
                        onClick={() => {
                            window.location.href = route(
                                "audits.product-counts.audit.download",
                                row.id,
                            );
                        }}
                    >
                        <i className="fi fi-rr-download" />
                        Report
                    </PrimaryButton>
                </div>
            ),
        },
    ];

    const qualityChecklistAuditsColumns = [
        {
            header: "Audited By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.auditor.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>{row.auditor.full_name}</span>
                        <span className="text-sm text-gray-500">{row.auditor.email}</span>
                        <span className="text-sm text-gray-500">{row.auditor.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "Audited at",
            render: (row) => <span>{new Date(row.created_at).toLocaleString('en-US', {
                'year': 'numeric',
                'month': 'long',
                'day': 'numeric',
            })}</span>
        },
        {
            header: "Status",
            render: (row) => <Badge
                type={
                    row.status === 'excellent' ? 'success'
                        : row.status === 'good' ? 'secondary'
                            : row.status === 'bad' ? 'warning' : 'critical'
                }
                text={row.status}
            />,
        },
        {
            header: "Requires Actions",
            render: (row) => <div>{row.requires_actions ? 'Yes' : 'No'}</div>,
        },
        {
            header: "Corrective Actions",
            accessor: "corrective_actions",
        },
        {
            header: "Report",
            render: (row) => (
                <div>
                    <PrimaryButton
                        type="button"
                        className="gap-1"
                        onClick={() => {
                            window.location.href = route(
                                "audits.quality-checklists.audit.download",
                                row.id,
                            );
                        }}
                    >
                        <i className="fi fi-rr-download" />
                        Report
                    </PrimaryButton>
                </div>
            ),
        },
    ];

    const cashRegisterClosuresAuditsColumns = [
        {
            header: "audited by",
            render: (row) => (
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.auditor?.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <strong>{row.auditor?.name}</strong>
                        <span>{row.auditor?.email}</span>
                        <span>{row.auditor?.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "status",
            render: (row) => (
                <Badge
                    type={row.status === "approved" ? "success" : row.status === "rejected" ? "error" : "warning"}
                    text={row.status}
                />
            )
        },
        {
            header: "cash",
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Expected: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.expected_cash)}
                        </span>
                    </div>
                    <div>
                        <strong>Reported: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.counted_cash)}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "bank transfers",
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Expected: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.expected_bank_transfer)}
                        </span>
                    </div>
                    <div>
                        <strong>Reported: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.counted_bank_transfer)}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "observations",
            accessor: "observations",
        },
        {
            header: "Report",
            render: (row) => (
                <div>
                    <PrimaryButton
                        type="button"
                        className="gap-1"
                        onClick={() => {
                            window.location.href = route(
                                "audits.cash-register-closure.audit.download",
                                row.id,
                            );
                        }}
                    >
                        <i className="fi fi-rr-download" />
                        Report
                    </PrimaryButton>
                </div>
            ),
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [activeColumns, setActiveColumns] = useState(
        qualityChecklistAuditsColumns,
    );

    const [activeData, setActiveData] = useState(qualityChecklistAudits);

    const changeTab = function (tab) {
        if (tab.id == "products") {
            setActiveColumns(productCountAuditsColumns);
            setActiveTab(tab);
            setActiveData(productCountAudits);
        } else if (tab.id == "quality") {
            setActiveColumns(qualityChecklistAuditsColumns);
            setActiveTab(tab);
            setActiveData(qualityChecklistAudits);
        } else {
            setActiveColumns(cashRegisterClosuresAuditsColumns);
            setActiveTab(tab);
            setActiveData(cashRegisterClosuresAudits);
        }
    };

    const handleSearch = (search) => {
        router.get(
            route("audits.history.index"),
            { search: search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <div>
                <h1 className="text-2xl font-bold">Audits History</h1>
                <p>Manage and review audit activities.</p>
            </div>
            {/* Three navigation tabs: Quality, Products, Cash with <SecondaryButtons> */}
            <div className="flex space-x-4 mt-4">
                {tabs.map((tab) => (
                    <SecondaryButton
                        key={tab.id}
                        aria-pressed={activeTab.id === tab.id}
                        className={
                            activeTab.id === tab.id
                                ? "bg-primary-100 border-primary-600"
                                : ""
                        }
                        onClick={() => changeTab(tab)}
                    >
                        {tab.label}
                    </SecondaryButton>
                ))}
            </div>
            {/* Content for the selected tab will go here */}
            <div className="mt-4">
                {/* For now just h1 with the selected tab's name, implement switching */}
                <div>
                    <Table
                        filterable={true}
                        handleSearch={handleSearch}
                        columns={activeColumns}
                        data={activeData.data}
                        from={activeData.from}
                        to={activeData.to}
                        totalResults={activeData.total}
                        links={activeData.links}
                    />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
