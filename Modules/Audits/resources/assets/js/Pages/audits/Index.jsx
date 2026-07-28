import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

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
            header: "Status",
            accessor: "status",
        },
        {
            header: "Total Expected Products",
            accessor: "total_expected_products",
        },
        {
            header: "Total Counted Products",
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
                    <a
                        href={route(
                            "audits.product-counts.audit.download",
                            row.id,
                        )}
                    >
                        Report
                    </a>
                </div>
            ),
        },
        {
            header: "Audited By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.auditor.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.auditor.full_name}</span>
                </div>
            ),
        },
    ];

    const qualityChecklistAuditsColumns = [
        {
            header: "Status",
            accessor: "status",
        },
        {
            header: "Requires Actions",
            render: (row) => <div>{row.requires_actions}</div>,
        },
        {
            header: "Corrective Actions",
            accessor: "corrective_actions",
        },
        {
            header: "Report",
            render: (row) => (
                <div>
                    <a
                        href={route(
                            "audits.quality-checklists.audit.download",
                            row.id,
                        )}
                    >
                        Report
                    </a>
                </div>
            ),
        },
        {
            header: "Audited By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.auditor.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.auditor.full_name}</span>
                </div>
            ),
        },
    ];

    const cashRegisterClosuresAuditsColumns = [
        {
            header: "#",
            accessor: "id",
        },
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
            accessor: "status",
        },
        {
            header: "cash",
            render: (row) => (
                <div className="flex flex-col gap-4 flex-wrap">
                    <div>
                        <strong>Expected: </strong>
                        <span className="text-gray-500">
                            {row.expected_cash}
                        </span>
                    </div>
                    <div>
                        <strong>Reported: </strong>
                        <span className="text-gray-500">
                            {row.counted_cash}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "bank transfers",
            render: (row) => (
                <div className="flex flex-col gap-4 flex-wrap">
                    <div>
                        <strong>Expected: </strong>
                        <span className="text-gray-500">
                            {row.expected_bank_transfer}
                        </span>
                    </div>
                    <div>
                        <strong>Reported: </strong>
                        <span className="text-gray-500">
                            {row.counted_bank_transfer}
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
                    <Link
                        href={route(
                            "audits.cash-register-closure.audit.download",
                            row.id,
                        )}
                    >
                        <PrimaryButton><i className="fi fi-rr-download" />report</PrimaryButton>
                    </Link>
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
        <div className="p-4 bg-white rounded-lg">
            <div>
                <h1 className="text-2xl font-bold mb-4">Audits Module</h1>
                <p>Welcome to the Audits module! This is the index page.</p>
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
