import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const tabs = [
    { id: "quality", label: "Quality" },
    { id: "products", label: "Products" },
    { id: "cash", label: "Cash" },
];

export default function Index() {
    const { productCountAudits, qualityChecklistAudits, flash } =
        usePage().props;

    const productCountAuditsColumns = [
        {
            header: 'Status',
            accessor: 'status'
        },
        {
            header: 'Total Expected Products',
            accessor: 'total_expected_products',
        },
        {
            header: 'Total Counted Products',
            accessor: 'total_counted_products'
        },
        {
            header: 'Total Difference',
            accessor: 'total_difference',
        },
        {
            header: 'Products With Mismatch',
            accessor: 'products_with_mismatch'
        },
        {
            header: 'Audited By',
            accessor: 'audited_by'
        }
    ];

    const qualityChecklistAuditsColumns = [
        {
            header: 'Status',
            accessor: 'status',
        },
        {
            header: 'Requires Actions',
            accessor: 'requires_actions',
        },
        {
            header: 'Corrective Actions',
            accessor: 'corrective_actions',
        },
        {
            header: 'Report',
            accessor: 'pdf_path',
        },
        {
            header: 'Audited By',
            accessor: 'audited_by'
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [activeColumns, setActiveColumns] = useState(
        qualityChecklistAuditsColumns,
    );

    const [activeData, setActiveData] = useState(qualityChecklistAudits);

    const changeTab = function (tab) {
        console.log(tab);
        if (tab.id == 'products') {
            setActiveColumns(productCountAuditsColumns);
            setActiveTab(tab);
            setActiveData(productCountAudits);
        }
        else if (tab.id == 'quality') {
            setActiveColumns(qualityChecklistAuditsColumns);
            setActiveTab(tab);
            setActiveData(qualityChecklistAudits);
        }
        else {
            setActiveTab(tab);
        }
    }

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
                <h1 className="text-xl font-bold">
                    Selected Tab: {activeTab.label}
                </h1>
                <div>
                    <Table columns={activeColumns} data={qualityChecklistAudits}/>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
