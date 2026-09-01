import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const { users, flash, representativeCandidate } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        last_name: "",
        document_number: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        password_confirmation: "",
        representative_eui_code: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const [errorMessage, setErrorMessage] = useState(flash.error);
    const representativeBlocked = representativeCandidate?.is_available === false;

    const columns = [
        {
            header: "#",
            accessor: "id",
        },
        {
            header: "name",
            render: (row) => (
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.full_name}</span>
                </div>
            ),
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
            header: "representative",
            render: (row) =>
                row.representative ? (
                    <div className="flex flex-col">
                        <strong>
                            {row.representative.name} {row.representative.last_name}
                        </strong>
                        <span className="text-gray-400">
                            {row.representative.eui_code}
                        </span>
                    </div>
                ) : (
                    "N/A"
                ),
        },
        {
            header: "represented",
            accessor: "represented_users_count",
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
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleSearch = (search) => {
        router.get(route("customers.index"), { search }, { preserveState: true });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    const searchRepresentative = () => {
        if (representativeCandidate) {
            setData("representative_eui_code", "");
            router.get(
                route("customers.index"),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ["representativeCandidate"],
                },
            );
            return;
        }

        if (!data.representative_eui_code) {
            return;
        }

        router.get(
            route("customers.index"),
            { representative_eui_code: data.representative_eui_code },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["representativeCandidate"],
            },
        );
    };

    return (
        <div className="bg-white/70 p-8 shadow-lg rounded-xl min-h-full space-y-4 backdrop-blur-lg">
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
                onPageChange={handlePageChange}
                from={users.from}
                to={users.to}
                totalResults={users.total}
                links={users.links}
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
                                <div className="grid grid-cols-8 gap-4">
                                    <div className="col-span-7">
                                        <Input
                                            name={"representative_eui_code"}
                                            label={"Representative EUI Code"}
                                            type="text"
                                            value={data.representative_eui_code}
                                            disabled={!!representativeCandidate}
                                            onChange={(e) =>
                                                setData(
                                                    "representative_eui_code",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={"col00001"}
                                        />
                                    </div>
                                    <div className="col-span-1 flex content-center">
                                        <button
                                            type="button"
                                            onClick={searchRepresentative}
                                            aria-label={
                                                representativeCandidate
                                                    ? "Remove representative"
                                                    : "Search representative"
                                            }
                                            className="mt-8 flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-primary-50"
                                        >
                                            {representativeCandidate ? (
                                                <XMarkIcon className="h-4 w-4 text-red-600 hover:text-red-700" />
                                            ) : (
                                                <MagnifyingGlassIcon className="h-4 w-4 text-primary-700 hover:text-primary-800" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.representative_eui_code && (
                                    <p className="text-sm text-red-600">
                                        {errors.representative_eui_code}
                                    </p>
                                )}
                                {representativeCandidate && (
                                    <div
                                        className={`rounded-lg border p-4 ${representativeCandidate.is_available
                                            ? "border-primary-100 bg-primary-50/60"
                                            : "border-yellow-300 bg-yellow-50"
                                            }`}
                                    >
                                        {representativeCandidate.user ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                                                    {representativeCandidate.user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                        {representativeCandidate.user.full_name}
                                                    </p>
                                                    <p className="truncate text-sm text-gray-500">
                                                        {representativeCandidate.user.eui_code} · {representativeCandidate.user.email}
                                                    </p>
                                                    <p className="truncate text-sm text-gray-500">
                                                        Document: {representativeCandidate.user.document_number}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null}
                                        <p
                                            className={`mt-3 text-sm ${representativeCandidate.is_available
                                                ? "text-primary-700"
                                                : "text-yellow-700"
                                                }`}
                                        >
                                            {representativeCandidate.message}
                                        </p>
                                    </div>
                                )}
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
                                        disabled={processing || representativeBlocked}
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
