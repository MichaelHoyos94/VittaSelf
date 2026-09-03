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
    const { policies = [], flash } = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        code: "",
        policy: "",
        section: "",
        numeral: "",
        description: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [selectedPolicyId, setSelectedPolicyId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(flash.success || "");
    const [errorMessage, setErrorMessage] = useState(flash.error || "");

    const openModal = (mode, policy) => {
        setShowModal(true);
        setModalMode(mode);
        if (policy) {
            setSelectedPolicyId(policy.id);
            setData({
                code: policy.code,
                policy: policy.policy,
                section: policy.section,
                numeral: policy.numeral,
                description: policy.description,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMode("");
        setSelectedPolicyId(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "edit") {
            put(route("sanctions.settings.policies.update", { id: selectedPolicyId }), {
                onSuccess: () => {
                    closeModal();
                },
            });
            return;
        }
        post(route("sanctions.settings.policies.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleActivateOrInactivate = (policyId, action) => {
        const url = route(`sanctions.settings.policies.${action}`, {
            id: policyId,
        });
        put(url, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-xl backdrop-blur-lg min-h-full space-y-4">
            <h2>Policies</h2>
            <p>Manage the policies in the system.</p>
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
                            <span className="font-extrabold">policie</span>
                        </p>
                    </div>
                </button>
                {policies.map((policy) => (
                    <div className="p-4 border-2 border-gray-300 rounded-lg shadow-lg">
                        <div className="flex justify-between border-b-2 border-gray-200">
                            <h2>{policy.policy}</h2>
                            {/* bg-primary-400 if active, bg-gray-400 if inactive */}
                            <div
                                className={`h-4 w-4 rounded-full ${policy.active ? "bg-primary-400" : "bg-gray-400"}`}
                            ></div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                {policy.description}
                            </p>
                            {/* Policy section + policy numeral */}
                            <div className="flex justify-between mt-4">
                                <p className="text-sm text-gray-500">
                                    {policy.section}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {policy.numeral}
                                </p>
                            </div>
                            {/* Buttons at the bottom. Send bottom */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <PrimaryButton
                                    onClick={() => openModal("edit", policy)}
                                >
                                    Edit
                                </PrimaryButton>
                                <SecondaryButton
                                    onClick={() =>
                                        openModal(
                                            policy.active
                                                ? "deactivate"
                                                : "activate",
                                            policy,
                                        )
                                    }
                                >
                                    {policy.active ? "Deactivate" : "Activate"}
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
                                Policy
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
                                        label="policy"
                                        name="policy"
                                        type="text"
                                        value={data.policy}
                                        onChange={(e) =>
                                            setData("policy", e.target.value)
                                        }
                                        placeholder="Sustract from other EUI net..."
                                        error={errors.policy}
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
                                        placeholder="Policy description"
                                        error={errors.description}
                                    />
                                    <Input
                                        label="section"
                                        name="section"
                                        type="text"
                                        value={data.section}
                                        onChange={(e) =>
                                            setData("section", e.target.value)
                                        }
                                        placeholder="Policy section"
                                        error={errors.section}
                                    />
                                    <Input
                                        label="numeral"
                                        name="numeral"
                                        type="text"
                                        value={data.numeral}
                                        onChange={(e) =>
                                            setData("numeral", e.target.value)
                                        }
                                        placeholder="Policy numeral"
                                        error={errors.numeral}
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
                                        Policy
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
                                    ? "Activate Policy"
                                    : "Deactivate Policy"}
                            </h2>
                        </div>
                        {/* Content */}
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to{" "}
                                {modalMode === "activate"
                                    ? "activate"
                                    : "deactivate"}{" "}
                                this policy?
                            </p>
                        </div>
                        {/* Footer */}
                        <div className="flex flex-wrap justify-end mt-4 gap-4">
                            <PrimaryButton
                                type="button"
                                onClick={() =>
                                    handleActivateOrInactivate(
                                        selectedPolicyId,
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
