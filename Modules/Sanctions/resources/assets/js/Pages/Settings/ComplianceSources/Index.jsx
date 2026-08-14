import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const { complianceSources = [], flash } = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: "",
        source: "",
        description: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [selectedComplianceSourceId, setselectedComplianceSourceId] =
        useState(null);
    const [successMessage, setSuccessMessage] = useState(flash.success || "");
    const [errorMessage, setErrorMessage] = useState(flash.error || "");

    useEffect(() => {
        setErrorMessage(flash.error);
        setSuccessMessage(flash.success);
        if (!flash.success && !flash.error) return;
        const timer = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.error, flash.success]);

    const openModal = (mode, complianceSource) => {
        setShowModal(true);
        setModalMode(mode);
        if (complianceSource) {
            setselectedComplianceSourceId(complianceSource.id);
            setData({
                code: complianceSource.code,
                source: complianceSource.source,
                description: complianceSource.description,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMode("");
        setselectedComplianceSourceId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "edit") {
            put(
                route("sanctions.settings.compliance-sources.update", {
                    id: selectedComplianceSourceId,
                }),
                {
                    onSuccess: () => {
                        closeModal();
                    },
                },
            );
            return;
        }
        post(route("sanctions.settings.compliance-sources.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleActivateOrInactivate = (action) => {
        const url = route(`sanctions.settings.compliance-sources.${action}`, {
            id: selectedComplianceSourceId,
        });
        put(url, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div className="bg-white/80 p-8 rounded-xl shadow-xl backdrop-blur-lg min-h-full space-y-4">
            <h2>Compliance Sources</h2>
            <p>Manage the compliance sources in the system.</p>
            {/* Flash message section */}
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Success! </strong>
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
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
            </div>
            {/* Dynamic cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <button type="button" onClick={() => openModal("create")}>
                    <div className="flex flex-col items-center p-4 border-2 bg-white border-gray-300 border-dashed rounded-lg shadow-lg">
                        <PlusCircleIcon className="h-32 w-32 text-primary-800" />
                        <p>
                            Add new{" "}
                            <span className="font-extrabold">
                                compliance source
                            </span>
                        </p>
                    </div>
                </button>
                {complianceSources.map((complianceSource) => (
                    <div className="p-4 border-2 border-gray-300 rounded-lg shadow-lg" key={complianceSource.id}>
                        <div className="flex justify-between border-b-2 border-gray-200">
                            <h2>{complianceSource.source}</h2>
                            {/* bg-primary-400 if active, bg-gray-400 if inactive */}
                            <div
                                className={`h-4 w-4 rounded-full ${complianceSource.active ? "bg-primary-400" : "bg-gray-400"}`}
                            ></div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                {complianceSource.description}
                            </p>
                            {/* Buttons at the bottom. Send bottom */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <PrimaryButton
                                    onClick={() =>
                                        openModal("edit", complianceSource)
                                    }
                                >
                                    Edit
                                </PrimaryButton>
                                <SecondaryButton
                                    onClick={() =>
                                        openModal(
                                            complianceSource.active
                                                ? "deactivate"
                                                : "activate",
                                            complianceSource,
                                        )
                                    }
                                >
                                    {complianceSource.active
                                        ? "Deactivate"
                                        : "Activate"}
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={closeModal} maxWidth="md">
                {(modalMode === "create" || modalMode === "edit") && (
                    <div>
                        {/* Cabecera */}
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "create" ? "Create" : "Edit"}{" "}
                                Compliance Source
                            </h2>
                        </div>
                        {/* Content */}
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="code"
                                        name="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        placeholder="EUI_RESTRICTION"
                                        error={errors.code}
                                    />
                                    <Input
                                        label="source"
                                        name="source"
                                        type="text"
                                        value={data.source}
                                        onChange={(e) =>
                                            setData("source", e.target.value)
                                        }
                                        placeholder="Sustract from other EUI net..."
                                        error={errors.source}
                                    />
                                    <Input
                                        label="description"
                                        name="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Source description"
                                        error={errors.description}
                                    />
                                </div>
                                <div className="flex flex-wrap justify-end mt-4 gap-4">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {modalMode === "create"
                                            ? "Create"
                                            : "Edit"}{" "}
                                        source
                                    </PrimaryButton>
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
                {(modalMode === "activate" || modalMode === "deactivate") && (
                    <div>
                        {/* Cabecera */}
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "activate"
                                    ? "Activate Source"
                                    : "Deactivate Source"}
                            </h2>
                        </div>
                        {/* Content */}
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to{" "}
                                {modalMode === "activate"
                                    ? "activate"
                                    : "deactivate"}{" "}
                                this source?
                            </p>
                        </div>
                        {/* Footer */}
                        <div className="flex flex-wrap justify-end mt-4 gap-4">
                            <PrimaryButton
                                type="button"
                                onClick={() =>
                                    handleActivateOrInactivate(
                                        selectedSourceId,
                                        modalMode === "activate"
                                            ? "activate"
                                            : "inactivate",
                                    )
                                }
                            >
                                {modalMode === "activate"
                                    ? "Activate"
                                    : "Deactivate"}
                            </PrimaryButton>
                            <SecondaryButton type="button" onClick={closeModal}>
                                Cancel
                            </SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
