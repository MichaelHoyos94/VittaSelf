import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

export default function MyCases() {
    const { cases = [], flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success);
    const [errorMessage, setErrorMessage] = useState(flash?.error);

    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "EUI",
            render: (row) => (
                <div className="flex items-center gap-3">
                    {/* Avatar con inicial */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    {/* Información textual */}
                    <div className="flex flex-col">
                        <strong className="font-medium">
                            {row.user?.name}
                        </strong>
                        <span className="text-sm text-gray-500">
                            {row.user?.email}
                        </span>
                        <span className="text-sm text-gray-500">
                            {row.user?.document_number}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "POLICY",
            render: (row) => <div>{row.policy.policy}</div>,
        },
        {
            header: "ADMINISTRATOR",
            render: (row) => (
                <div>{row.admin?.name || "Sin administrador asignado"}</div>
            ),
        },
        {
            header: "STATUS",
            render: (row) => (
                <div className="p-2 rounded-full bg-primary-200 text-center">
                    {row.case_status?.case_status}
                </div>
            ),
        },
        {
            header: "ACTIONS",
            render: (row) => (
                <div className="flex justify-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="px-2 py-2 bg-primary-700 rounded-full hover:bg-primary-800 transform transition-transform duration-300 hover:scale-110"
                            >
                                <EllipsisHorizontalIcon className="h-4 w-4 text-primary-50" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" width="48">
                            <button
                                type="button"
                                onClick={() => handleViewCase(row)}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                View case
                            </button>
                            {row.case_status?.code === "AWAITING_EVIDENCES" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleOpenUploadEvidences(row)
                                    }
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    Upload evidences
                                </button>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white/70 p-8 rounded-xl shadow-xl backdrop-blur-lg min-h-full">
            <h2>My Cases</h2>
            <p>You have {cases.data?.length} disciplinary cases.</p>
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {successMessage}
                        </span>
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
            <Table columns={columns} data={cases.data} from={cases.from} to={cases.to} totalResults={cases.total} />
        </div>
    );
}

MyCases.layout = (page) => <MainLayout children={page} title="My Cases" />;
