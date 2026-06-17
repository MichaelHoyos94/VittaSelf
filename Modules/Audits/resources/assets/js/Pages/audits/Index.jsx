import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";

const tabs = [
    { id: "quality", label: "Quality" },
    { id: "products", label: "Products" },
    { id: "cash", label: "Cash" },
];

export default function Index() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

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
                        onClick={() => setActiveTab(tab)}
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
            </div>
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
