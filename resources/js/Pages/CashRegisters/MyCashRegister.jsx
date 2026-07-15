import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { ArchiveBoxIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function MyCashRegister() {
    const { cashRegister, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success || null);
    const [errorMessage, setErrorMessage] = useState(flash.error || null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("open");
    const { data, post, errors, processing, setData } = useForm({});

    const handleOpenCashRegister = () => {

    }

    const handleCloseCashRegister = () => {

    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg min-h-full">
            <h2>My Cash Register</h2>
            <p>Manage your cash register settings and operations.</p>
            {/* Flash Messages */}
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
            {/* Buttons */}
            <div className="flex gap-4">
                <PrimaryButton>open</PrimaryButton>
                <SecondaryButton>close</SecondaryButton>
            </div>
            {/* Cash Register Card, center and resize w */}
            <div className="border rounded-xl shadow-lg p-4 transform transition duration-100 hover:scale-105 max-w-lg mx-auto mt-4">
                {cashRegister ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <ArchiveBoxIcon className="w-4 h-4" />
                                <h3>{cashRegister.name}</h3>
                            </div>
                            <div>
                                {cashRegister.is_open ? (
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                        Open
                                    </span>
                                ) : (
                                    <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-900">
                                        Closed
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Cost center section */}
                        <div className="ml-auto rounded bg-gray-50 px-4 py-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-primary-700" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Cost center
                                    </p>
                                    <div>
                                        <strong>
                                            {cashRegister.cost_center?.name ||
                                                "N/A"}
                                        </strong>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            {cashRegister.cost_center
                                                ?.address || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-center gap-2 mt-4">
                            {
                                cashRegister.is_open ? (
                                    <SecondaryButton>Close</SecondaryButton>
                                ) :
                                (
                                    <PrimaryButton>Open</PrimaryButton>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <p>No cash register assigned, contact to your administrador.</p>
                )}
            </div>
        </div>
    );
}

MyCashRegister.layout = (page) => <MainLayout children={page} />;
