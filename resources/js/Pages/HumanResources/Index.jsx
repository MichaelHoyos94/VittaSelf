import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import Modal from "@/Components/Modal";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import { EyeIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/outline";
import Select from "@/Components/Form/Select";
import Badge from "@/Components/Badge";

export default function Index() {
    const { users = [], costCenters = [], roles = [], flash = {} } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success ?? "");
    const [errorMessage, setErrorMessage] = useState(flash.error ?? "");
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        last_name: "",
        document_number: "",
        email: "",
        phone: "",
        role: "",
        cost_center_id: "",
        password: "",
        password_confirmation: "",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "Name",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span>{row.full_name}</span>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedUser(row);
                            setModalMode("view");
                            setModalOpen(true);
                        }}
                        className="ml-2 bg-transparent rounded-full transform transition-transform duration-300 hover:scale-110"
                    >
                        <EyeIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
            ),
        },
        { header: "Document", accessor: "document_number" },
        {
            header: "contact",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-semibold">{row.email}</span>
                    <span className="text-gray-500 text-sm">{row.email}</span>
                    <span className="text-gray-500 text-sm">{row.phone}</span>
                </div>
            )
        },
        {
            header: "cost center",
            render: (row) => (
                <div>
                    {row.cost_center ? (
                        <div className="flex flex-col">

                            <span className="font-semibold">{row.cost_center?.name ?? 'N/A'}</span>
                            <span className="text-gray-500 text-sm">{row.cost_center?.contact_email ?? 'N/A'}</span>
                            <span className="text-gray-500 text-sm">{row.cost_center?.address ?? 'N/A'}</span>
                        </div>
                    ) : (
                        <span className="text-gray-500 text-sm">No cost center assigned</span>
                    )}
                </div>
            )
        },
        {
            header: "Actions",
            render: (row) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => openEditModal(row)}
                        className="px-2 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transform transition-transform duration-300 hover:scale-110"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => {
                            setSelectedUser(row);
                            setModalMode("delete");
                            setModalOpen(true);
                        }}
                        className="px-2 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform transition-transform duration-300 hover:scale-110"
                    >
                        <MinusIcon className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];

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

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    const openCreateModal = () => {
        setModalMode("create");
        setModalOpen(true);
        setData({
            name: "",
            last_name: "",
            document_number: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
        });
    };

    const openEditModal = (user) => {
        setModalMode("edit");
        setSelectedUser(user);

        setData({
            name: user.name,
            last_name: user.last_name,
            document_number: user.document_number,
            email: user.email,
            phone: user.phone,
            role: user.roles[0]?.name || "",
            cost_center_id: user.cost_center_id || "",
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === "create") {
            post(route("human-resources.store"), {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                },
            });
        } else if (modalMode === "edit") {
            put(route("human-resources.update", selectedUser.id), {
                onSuccess: () => {
                    reset();
                    setModalOpen(false);
                },
            });
        }
    };

    const handleDelete = () => {
        console.log("Deleting user with ID:", selectedUser.id);
        router.delete(route("human-resources.destroy", selectedUser.id), {
            onSuccess: () => {
                setModalOpen(false);
            },
        });
    };

    const handleSearch = (search) => {
        router.get(route("human-resources.index"), { search }, { preserveState: true, replace: true });
    }

    return (
        <div className="min-h-full rounded-xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-lg">
            <h1>Human Resources</h1>
            <p>Manage employee information and records.</p>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={openCreateModal}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300"
                >
                    Create User
                </button>
            </div>
            {/* Messages */}
            <div className="my-4">
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
            </div>
            <Table
                columns={columns}
                filterable={true}
                handleSearch={handleSearch}
                data={users.data}
                from={users.from}
                to={users.to}
                totalResults={users.total}
                emptyText="No employees found"
                links={users.links}
                onPageChange={handlePageChange}
            ></Table>
            <Modal show={modalOpen} onClose={closeModal} maxWidth="lg">
                {(modalMode === "create" || modalMode === "edit") && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "create"
                                    ? "Create User"
                                    : "Edit User"}
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    label="Name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    placeholder="John doe..."
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    error={errors.name}
                                />
                                <Input
                                    label="Last Name"
                                    name="last_name"
                                    type="text"
                                    value={data.last_name}
                                    placeholder="Smith..."
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    error={errors.last_name}
                                />
                                <Input
                                    label="Document Number"
                                    name="document_number"
                                    type="text"
                                    value={data.document_number}
                                    placeholder="97234241"
                                    onChange={(e) =>
                                        setData(
                                            "document_number",
                                            e.target.value,
                                        )
                                    }
                                    error={errors.document_number}
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    placeholder="john.doe@example.com"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    error={errors.email}
                                />
                                <Input
                                    label="Phone"
                                    name="phone"
                                    type="text"
                                    value={data.phone}
                                    placeholder="321-807-9660"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    error={errors.phone}
                                />
                                <Select
                                    label="Role"
                                    name="role"
                                    value={data.role}
                                    options={roles.map((role) => ({
                                        label: role.name,
                                        value: role.name,
                                    }))}
                                    error={errors.role}
                                    onChange={(e) => setData("role", e.target.value)}
                                />
                                <Select
                                    label="Cost Center"
                                    name="cost_center_id"
                                    value={data.cost_center_id}
                                    options={costCenters.map((costCenter) => ({
                                        value: costCenter.id,
                                        label: costCenter.name,
                                    }))}
                                    error={errors.cost_center_id}
                                    onChange={(e) => setData("cost_center_id", e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    error={errors.password}
                                />
                                <Input
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="********"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition duration-300"
                                >
                                    {modalMode === "create"
                                        ? "Create User"
                                        : "Update User"}
                                </button>
                            </Form>
                        </div>
                    </div>
                )}
                {modalMode === "view" && selectedUser && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                User Details
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-4">
                            <p>
                                <strong>Name:</strong> {selectedUser.name}
                            </p>
                            <p>
                                <strong>Last Name:</strong>{" "}
                                {selectedUser.last_name}
                            </p>
                            <p>
                                <strong>Document Number:</strong>{" "}
                                {selectedUser.document_number}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedUser.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedUser.phone}
                            </p>
                        </div>
                    </div>
                )}
                {modalMode === "delete" && selectedUser && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Confirm Deletion
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to delete{" "}
                                {selectedUser.name}?
                            </p>
                            <button
                                onClick={() => {
                                    handleDelete();
                                }}
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
