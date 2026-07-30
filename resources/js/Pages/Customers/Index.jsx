import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const { users, flash } = usePage().props;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        last_name: "",
        document_number: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        password_confirmation: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);

    const columns = [
        {
            header: "#",
            accessor: "id",
        },
        {
            header: "name",
            render: (row) => <div>{row.full_name}</div>,
        },
        {
            header: "document number",
            accessor: "document_number",
        },
        {
            header: "eui code",
            accessor: "eui_code",
        },
        {
            header: "contact",
            render: (row) => (
                <div className="flex flex-col">
                    <strong>{row.email}</strong>
                    <span className="text-gray-400">{row.phone}</span>
                    <span className="text-gray-400">{row.address}</span>
                </div>
            ),
        },
        {
            header: "actions",
            render: (row) => <div></div>,
        },
    ];

    const closeModal = () => {
        setModalMode("");
        setShowModal(false);
        reset();
    };

    const openModal = (mode) => {
        setModalMode(mode);
        setShowModal(true);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("customers.store"), {
            onFinish: () => {
                closeModal();
            },
        });
    };

    const handleSearch = (search) => {

    }

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg min-h-full">
            <h2>Customers</h2>
            <p>Manage customers.</p>
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
            <div className="flex flex-wrap gap-4">
                <PrimaryButton
                    type="button"
                    onClick={() => openModal("create")}
                >
                    create
                </PrimaryButton>
                <SecondaryButton>export</SecondaryButton>
            </div>
            <Table 
                columns={columns}
                data={users.data}
                filterable={true}
                handleSearch={handleSearch}
                from={users.from}
                to={users.to}
                totalResults={users.total}
            />
            <Modal show={showModal} onClose={closeModal}>
                {modalMode === "create" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === "create"
                                    ? "Create Eui"
                                    : "Edit Eui"}
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <Input
                                    name={"name"}
                                    label={"Name"}
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder={"John doe..."}
                                />
                                <Input
                                    name={"last_name"}
                                    label={"Last Name"}
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    placeholder={"Smith..."}
                                />
                                <Input
                                    name={"document_number"}
                                    label={"Document Number"}
                                    type="text"
                                    value={data.document_number}
                                    onChange={(e) =>
                                        setData(
                                            "document_number",
                                            e.target.value,
                                        )
                                    }
                                    placeholder={"97584948"}
                                />
                                <Input
                                    name={"email"}
                                    label={"Email"}
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder={"johnsmith@example.com"}
                                />
                                <Input
                                    name={"phone"}
                                    label={"Phone"}
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    placeholder={"3117289848"}
                                />
                                <Input
                                    name={"address"}
                                    label={"Address"}
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    placeholder={"Street..."}
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
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
                                <div className="flex flex-wrap gap-4 justify-end">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? "sending..." : "send"}
                                    </PrimaryButton>
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        cancel
                                    </SecondaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
