import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";

export default function MyCases() {
    const { cases, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success);
    const [errorMessage, setErrorMessage] = useState(flash?.error);

    return (
        <div className="bg-white/70 p-4 rounded-xl shadow-xl backdrop-blur-lg">
            <h2>My Cases</h2>
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
            </div>
            <Table
                data={cases.data}
            />
        </div>
    );
}

MyCases.layout = page => <MainLayout children={page} title="My Cases" />;