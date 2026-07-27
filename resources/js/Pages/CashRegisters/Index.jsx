import DangerButton from "@/Components/DangerButton";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import MainLayout from "@/Layouts/MainLayout";
import {
    ArchiveBoxIcon,
    ClipboardDocumentCheckIcon,
} from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const {
        cashRegisters = [],
        flash = {},
        users = [],
        costCenters = [],
    } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        code: "",
        base: "",
        cost_center_id: "",
        commercial_agent_id: "",
    });
    const [selectedCashRegister, setSelectedCashRegister] = useState(null);
    const [modalMode, setModalMode] = useState("create");
    const [showModal, setModalShow] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [pendingAction, setPendingAction] = useState(null);

    useEffect(() => {
        setErrorMessage(flash.error ?? "");
        setSuccessMessage(flash.success ?? "");
        if (!flash.success && !flash.error) return;
        const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.error, flash.success]);

    const openCreateModal = () => {
        setModalMode("create");
        setSelectedCashRegister(null);
        setSelectedUserId("");
        setModalShow(true);
    };

    const openAssignModal = (cashRegister) => {
        setModalMode("assign");
        setSelectedCashRegister(cashRegister);
        setSelectedUserId(
            cashRegister.commercial_agent_id?.toString() ?? "",
        );
        setModalShow(true);
    };

    const openReleaseModal = (cashRegister) => {
        setModalMode("release");
        setSelectedCashRegister(cashRegister);
        setModalShow(true);
    };

    const openDeleteModal = (cashRegister) => {
        setModalMode("delete");
        setSelectedCashRegister(cashRegister);
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setSelectedUserId("");
    };

    const handleDelete = () => {
        if (!selectedCashRegister || pendingAction) return;

        router.delete(
            route("cash-register-manage.cash-registers.delete", {
                cashRegisterId: selectedCashRegister.id,
            }),
            {
                preserveScroll: true,
                onStart: () => setPendingAction("delete"),
                onSuccess: closeModal,
                onFinish: () => setPendingAction(null),
            },
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("cash-register-manage.cash-registers.store"), {
            onSuccess: () => {
                closeModal();
                reset();
            },
        });
    };

    const handleAssign = () => {
        if (!selectedCashRegister || !selectedUserId || pendingAction) return;

        router.post(
            route("cash-register-manage.cash-registers.assign", {
                cashRegisterId: selectedCashRegister.id,
            }),
            {
                commercial_agent_id: selectedUserId,
            },
            {
                preserveScroll: true,
                onStart: () => setPendingAction("assign"),
                onSuccess: closeModal,
                onFinish: () => setPendingAction(null),
            },
        );
    };

    const handleRelease = () => {
        if (!selectedCashRegister || pendingAction) return;

        router.post(
            route("cash-register-manage.cash-registers.release", {
                cashRegisterId: selectedCashRegister.id,
            }),
            {},
            {
                preserveScroll: true,
                onStart: () => setPendingAction("release"),
                onSuccess: closeModal,
                onFinish: () => setPendingAction(null),
            },
        );
    };

    return (
        <div className="p-4 rounded-xl bg-white">
            <h2>Cash Registers</h2>
            <p>Manage and assign cash registers.</p>
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
            <div className="flex gap-4 mt-4">
                <PrimaryButton onClick={openCreateModal}>Create</PrimaryButton>
            </div>
            {/* Cash registers cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cashRegisters.map((cashRegister) => (
                    <div className="border rounded-xl shadow-lg p-4 transform transition duration-100 hover:scale-105" key={cashRegister.id}>
                        {/* Each item at extreme */}
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
                        <div className="flex flex-wrap justify-end gap-2 mt-4">
                            <PrimaryButton
                                onClick={() => openAssignModal(cashRegister)}
                            >
                                Assign
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => openReleaseModal(cashRegister)}
                                disabled={!cashRegister.commercial_agent_id}
                            >
                                Release
                            </SecondaryButton>
                            <DangerButton
                                onClick={() => openDeleteModal(cashRegister)}
                            >
                                Delete
                            </DangerButton>
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={closeModal} maxWidth="lg">
                {modalMode === "assign" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Assign Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Select
                                label="Select Commercial Agent"
                                name="commercial_agent_id"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                placeholder="Select Commercial Agent"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.full_name,
                                }))}
                            />
                            <div className="flex justify-end gap-4">
                                <PrimaryButton
                                    onClick={handleAssign}
                                    disabled={
                                        !selectedUserId ||
                                        pendingAction === "assign"
                                    }
                                    type="button"
                                >
                                    assign
                                </PrimaryButton>
                                <SecondaryButton onClick={closeModal}>
                                    cancel
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                )}
                {modalMode === "release" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Release Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to unassign{" "}
                                {
                                    selectedCashRegister?.commercial_agent?.full_name
                                }{" "}
                                from {selectedCashRegister?.name}?
                            </p>
                            <div className="flex justify-end gap-4">
                                <PrimaryButton
                                    onClick={handleRelease}
                                    disabled={pendingAction === "release"}
                                >
                                    Release
                                </PrimaryButton>
                                <SecondaryButton onClick={closeModal}>
                                    cancel
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                )}
                {modalMode === "create" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Create Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    label="Name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    placeholder="Manizales - Juliana"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    error={errors.name}
                                />
                                <Input
                                    label="Code"
                                    name="code"
                                    type="text"
                                    value={data.code}
                                    placeholder="0001"
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                    error={errors.code}
                                />
                                <Input
                                    label="Base"
                                    name="base"
                                    type="number"
                                    value={data.base}
                                    placeholder="$100.000"
                                    onChange={(e) =>
                                        setData("base", e.target.value)
                                    }
                                    error={errors.base}
                                />
                                <Select
                                    label={"Cost Center"}
                                    name={"cost_center_id"}
                                    value={data.cost_center_id}
                                    onChange={(e) =>
                                        setData(
                                            "cost_center_id",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Cost Center"
                                    options={costCenters.map((costCenter) => ({
                                        value: costCenter.id,
                                        label: costCenter.name,
                                    }))}
                                    error={errors.cost_center_id}
                                />
                                <Select
                                    label={"Commercial Agent"}
                                    name={"commercial_agent_id"}
                                    value={data.commercial_agent_id}
                                    onChange={(e) =>
                                        setData(
                                            "commercial_agent_id",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Commercial Agent"
                                    options={users.map((user) => ({
                                        value: user.id,
                                        label: user.name,
                                    }))}
                                    error={errors.commercial_agent_id}
                                />
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                >
                                    create cash register
                                </PrimaryButton>
                            </Form>
                        </div>
                    </div>
                )}
                {modalMode === "delete" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Delete Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to delete{" "}
                                {selectedCashRegister?.name}?
                            </p>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={pendingAction === "delete"}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:shadow-md transition duration-300"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 hover:shadow-md transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
