import DangerButton from "@/Components/DangerButton";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const emptyForm = {
    name: "",
    address: "",
    contact_email: "",
    phone: "",
    photo: null,
};

export default function Index() {
    const { costCenters = {}, filters = {}, flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm(emptyForm);
    const [selectedCostCenter, setSelectedCostCenter] = useState(null);
    const [modalMode, setModalMode] = useState("create");
    const [showModal, setShowModal] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [successMessage, setSuccessMessage] = useState(flash.success ?? "");
    const [errorMessage, setErrorMessage] = useState(flash.error ?? "");

    useEffect(() => {
        setSuccessMessage(flash.success ?? "");
        setErrorMessage(flash.error ?? "");

        if (!flash.success && !flash.error) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.error, flash.success]);

    const openCreateModal = () => {
        setModalMode("create");
        setSelectedCostCenter(null);
        clearErrors();
        reset();
        setShowModal(true);
    };

    const openEditModal = (costCenter) => {
        setModalMode("edit");
        setSelectedCostCenter(costCenter);
        clearErrors();
        setData({
            name: costCenter.name ?? "",
            address: costCenter.address ?? "",
            contact_email: costCenter.contact_email ?? "",
            phone: costCenter.phone ?? "",
            photo: null,
        });
        setShowModal(true);
    };

    const openDeleteModal = (costCenter) => {
        setModalMode("delete");
        setSelectedCostCenter(costCenter);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPendingAction(null);
    };

    const handleSearch = (search) => {
        router.get(
            route("cost-centers.index"),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handlePageChange = (url) => {
        if (!url) return;

        router.visit(url, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (modalMode === "edit" && selectedCostCenter) {
            router.post(
                route("cost-centers.update", selectedCostCenter.id),
                {
                    ...data,
                    _method: "put",
                },
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                        reset();
                    },
                },
            );
            return;
        }

        post(route("cost-centers.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (!selectedCostCenter || pendingAction) return;

        router.delete(route("cost-centers.destroy", selectedCostCenter.id), {
            preserveScroll: true,
            onStart: () => setPendingAction("delete"),
            onSuccess: closeModal,
            onFinish: () => setPendingAction(null),
        });
    };

    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "Cost Center",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800">
                        {row.name?.charAt(0)?.toUpperCase() ?? "C"}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-800">
                            {row.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                            {row.photo || "cost_center.png"}
                        </p>
                    </div>
                </div>
            ),
        },
        { header: "Address", accessor: "address" },
        {
            header: "Contact",
            render: (row) => (
                <div>
                    <p>{row.contact_email || "N/A"}</p>
                    <p className="text-xs text-gray-500">{row.phone || "N/A"}</p>
                </div>
            ),
        },
        {
            header: "Actions",
            render: (row) => (
                <div className="flex flex-wrap gap-2">
                    <SecondaryButton type="button" onClick={() => openEditModal(row)}>
                        Edit
                    </SecondaryButton>
                    <DangerButton type="button" onClick={() => openDeleteModal(row)}>
                        Delete
                    </DangerButton>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-xl backdrop-blur-lg min-h-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Cost Centers
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage system cost centers used across operations and audits.
                    </p>
                </div>
                <PrimaryButton type="button" onClick={openCreateModal}>
                    Create Cost Center
                </PrimaryButton>
            </div>

            {successMessage && (
                <div
                    className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div
                    className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}

            <div className="mt-6">
                <Table
                    columns={columns}
                    data={costCenters.data ?? []}
                    from={costCenters.from}
                    to={costCenters.to}
                    totalResults={costCenters.total}
                    links={costCenters.links ?? []}
                    filterable
                    handleSearch={handleSearch}
                    onPageChange={handlePageChange}
                    emptyText={
                        filters.search
                            ? "No cost centers match the current search"
                            : "No cost centers found"
                    }
                />
            </div>

            <Modal show={showModal} onClose={closeModal} maxWidth="lg">
                {(modalMode === "create" || modalMode === "edit") && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "edit"
                                    ? "Edit Cost Center"
                                    : "Create Cost Center"}
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    label="Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Main Warehouse"
                                    error={errors.name}
                                />
                                <Input
                                    label="Address"
                                    name="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    placeholder="Street 123 #45-67"
                                    error={errors.address}
                                />
                                <Input
                                    label="Contact Email"
                                    name="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={(e) =>
                                        setData("contact_email", e.target.value)
                                    }
                                    placeholder="admin@example.com"
                                    error={errors.contact_email}
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    placeholder="3001234567"
                                    error={errors.phone}
                                />
                                <Input
                                    label="Photo filename"
                                    name="photo"
                                    value={
                                        data.photo?.name ||
                                        selectedCostCenter?.photo ||
                                        "cost_center.png"
                                    }
                                    disabled
                                />
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="photo-file"
                                    >
                                        Photo
                                    </label>
                                    <input
                                        id="photo-file"
                                        name="photo"
                                        type="file"
                                        accept=".jpg,.png,image/jpeg,image/png"
                                        onChange={(e) =>
                                            setData(
                                                "photo",
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 focus:ring-green-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        JPG or PNG, maximum 500 KB.
                                    </p>
                                    {errors.photo && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.photo}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <SecondaryButton type="button" onClick={closeModal}>
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {modalMode === "edit" ? "Update" : "Create"}
                                    </PrimaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}

                {modalMode === "delete" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Delete Cost Center
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-4">
                            <p className="text-sm text-gray-700">
                                Are you sure you want to delete{" "}
                                <strong>{selectedCostCenter?.name}</strong>?
                            </p>
                            <div className="flex justify-end gap-2">
                                <SecondaryButton type="button" onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>
                                <DangerButton
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={pendingAction === "delete"}
                                >
                                    Delete
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} title="Cost Centers" />;
