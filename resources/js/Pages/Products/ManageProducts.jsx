import DangerButton from "@/Components/DangerButton";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import formatCurrency from "@/Utils/formatCurrency";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const emptyForm = {
    name: "",
    description: "",
    price: "",
    points: "",
    presentation: "",
    category: "",
    cover: null,
};

const presentations = ["Capsules", "Liquid", "Powder", "Tablets", "Others"];
const categories = [
    "Supplements",
    "Pet care",
    "Powder",
    "Tablets",
    "Personal care",
    "Beauty",
    "Health care",
    "Merchandising",
];

export default function ManageProducts() {
    const { products = {}, flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm(emptyForm);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
        setSelectedProduct(null);
        clearErrors();
        reset();
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setModalMode("edit");
        setSelectedProduct(product);
        clearErrors();
        setData({
            name: product.name ?? "",
            description: product.description ?? "",
            price: product.price ?? "",
            points: product.points ?? "",
            presentation: product.presentation ?? "",
            category: product.category ?? "",
            cover: null,
        });
        setShowModal(true);
    };

    const openDeleteModal = (product) => {
        setModalMode("delete");
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setPendingAction(null);
    };

    const handleSearch = (search) => {
        router.get(
            route("products.manage-products"),
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

        if (modalMode === "edit" && selectedProduct) {
            router.post(
                route("products.update", selectedProduct.id),
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

        post(route("products.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                reset();
            },
        });
    };

    const handleDelete = () => {
        if (!selectedProduct || pendingAction) return;

        router.delete(route("products.destroy", selectedProduct.id), {
            preserveScroll: true,
            onStart: () => setPendingAction("delete"),
            onSuccess: closeModal,
            onFinish: () => setPendingAction(null),
        });
    };

    const columns = [
        { header: "#", accessor: "id" },
        {
            header: "Product",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800">
                        {row.name?.charAt(0)?.toUpperCase() ?? "P"}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-800">
                            {row.name}
                        </p>
                        <p className="max-w-xs truncate text-xs text-gray-500">
                            {row.description}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            header: "Price",
            render: (row) => <div>{formatCurrency(row.price)}</div>,
        },
        { header: "Points", accessor: "points" },
        { header: "Presentation", accessor: "presentation" },
        { header: "Category", accessor: "category" },
        {
            header: "Cover",
            render: (row) => (
                <span className="block max-w-40 truncate">
                    {row.cover || "product.jpg"}
                </span>
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
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2>Manage Products</h2>
                    <p>Create, edit and delete catalog products.</p>
                </div>
                <PrimaryButton type="button" onClick={openCreateModal}>
                    Create Product
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
                    data={products.data ?? []}
                    emptyText="No products registered yet."
                    filterable
                    handleSearch={handleSearch}
                    from={products.from}
                    to={products.to}
                    totalResults={products.total}
                    links={products.links ?? []}
                    onPageChange={handlePageChange}
                />
            </div>

            <Modal show={showModal} onClose={closeModal} maxWidth="lg">
                {(modalMode === "create" || modalMode === "edit") && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "edit" ? "Edit Product" : "Create Product"}
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    label="Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="DiviLife Plus"
                                    error={errors.name}
                                />
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                        placeholder="Product description"
                                        rows={4}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring placeholder:text-gray-300 ${errors.description
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-green-500"
                                            }`}
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        placeholder="89999"
                                        error={errors.price}
                                    />
                                    <Input
                                        label="Points"
                                        name="points"
                                        type="number"
                                        value={data.points}
                                        onChange={(e) =>
                                            setData("points", e.target.value)
                                        }
                                        placeholder="1"
                                        error={errors.points}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Select
                                        label="Presentation"
                                        name="presentation"
                                        value={data.presentation}
                                        onChange={(e) =>
                                            setData("presentation", e.target.value)
                                        }
                                        options={presentations.map((presentation) => ({
                                            value: presentation,
                                            label: presentation,
                                        }))}
                                        error={errors.presentation}
                                    />
                                    <Select
                                        label="Category"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        options={categories.map((category) => ({
                                            value: category,
                                            label: category,
                                        }))}
                                        error={errors.category}
                                    />
                                </div>
                                <Input
                                    label="Current cover"
                                    name="current_cover"
                                    value={
                                        data.cover?.name ||
                                        selectedProduct?.cover ||
                                        "product.jpg"
                                    }
                                    disabled
                                />
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                        htmlFor="cover"
                                    >
                                        Cover
                                    </label>
                                    <input
                                        id="cover"
                                        name="cover"
                                        type="file"
                                        accept=".jpg,.png,image/jpeg,image/png"
                                        onChange={(e) =>
                                            setData("cover", e.target.files?.[0] ?? null)
                                        }
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring border-gray-300 focus:ring-green-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        JPG or PNG, maximum 500 KB.
                                    </p>
                                    {errors.cover && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cover}
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
                                Delete Product
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-4">
                            <p className="text-sm text-gray-700">
                                Are you sure you want to delete{" "}
                                <strong>{selectedProduct?.name}</strong>?
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

ManageProducts.layout = (page) => <MainLayout children={page} />;
