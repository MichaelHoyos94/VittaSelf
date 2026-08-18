import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const { mitigations = [], flash } = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: "",
        mitigation: "",
        description: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [selectedMitigationId, setSelectedMitigationId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(flash.success || "");
    const [errorMessage, setErrorMessage] = useState(flash.error || "");

    const openModal = (mode, mitigation) => {
        setShowModal(true);
        setModalMode(mode);
        if (mitigation) {
            setSelectedMitigationId(mitigation.id);
            setData({
                code: mitigation.code,
                mitigation: mitigation.mitigation,
                description: mitigation.description,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMode("");
        setSelectedMitigationId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "edit") {
            put(route("sanctions.settings.mitigations.update", { id: selectedMitigationId }), {
                onSuccess: () => {
                    closeModal();
                },
            });
            return;
        }
        post(route("sanctions.settings.mitigations.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleActivateOrInactivate = (action) => {
        console.log("Selected Mitigation ID:", selectedMitigationId);
        const url = route(`sanctions.settings.mitigations.${action}`, {
            id: selectedMitigationId,
        });
        put(url, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div className="bg-white/80 p-8 rounded-xl shadow-xl backdrop-blur-lg min-h-full space-y-4">
            <h2>Mitigations</h2>
            <p>Manage the mitigations in the system.</p>
            {/* Flash message section */}
            <div>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
                            <span className="font-extrabold">mitigation</span>
                        </p>
                    </div>
                </button>
                {mitigations.map((mitigation) => (
                    <div className="p-4 border-2 border-gray-300 rounded-lg shadow-lg" key={mitigation.id}>
                        <div className="flex justify-between border-b-2 border-gray-200">
                            <h2>{mitigation.mitigation}</h2>
                            {/* bg-primary-400 if active, bg-gray-400 if inactive */}
                            <div
                                className={`h-4 w-4 rounded-full ${mitigation.active ? "bg-primary-400" : "bg-gray-400"}`}
                            ></div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                {mitigation.description}
                            </p>
                            {/* Buttons at the bottom. Send bottom */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <PrimaryButton
                                    onClick={() => openModal("edit", mitigation)}
                                >
                                    Edit
                                </PrimaryButton>
                                <SecondaryButton
                                    onClick={() =>
                                        openModal(
                                            mitigation.active
                                                ? "deactivate"
                                                : "activate",
                                            mitigation,
                                        )
                                    }
                                >
                                    {mitigation.active ? "Deactivate" : "Activate"}
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
                                Mitigation
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
                                        label="mitigation"
                                        name="mitigation"
                                        type="text"
                                        value={data.mitigation}
                                        onChange={(e) =>
                                            setData("mitigation", e.target.value)
                                        }
                                        placeholder="Eui accept the fault..."
                                        error={errors.mitigation}
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
                                        placeholder="Mitigation description"
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
                                        Mitigation
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
                                    ? "Activate Mitigation"
                                    : "Deactivate Mitigation"}
                            </h2>
                        </div>
                        {/* Content */}
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to{" "}
                                {modalMode === "activate"
                                    ? "activate"
                                    : "deactivate"}{" "}
                                this mitigation?
                            </p>
                        </div>
                        {/* Footer */}
                        <div className="flex flex-wrap justify-end mt-4 gap-4">
                            <PrimaryButton
                                type="button"
                                onClick={() =>
                                    handleActivateOrInactivate(
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
