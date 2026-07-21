import DangerButton from "@/Components/DangerButton";
import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import TextArea from "@/Components/Form/TextArea";
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

export default function MyCashRegister() {
    const { cashRegister, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success || null);
    const [errorMessage, setErrorMessage] = useState(flash.error || null);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("open");
    const { data, post, errors, processing, setData } = useForm({
        bills_100000: "",
        bills_50000: "",
        bills_20000: "",
        bills_10000: "",
        bills_5000: "",
        bills_2000: "",
        bills_1000: "",
        coins_1000: "",
        coins_500: "",
        coins_200: "",
        coins_100: "",
        coins_50: "",
        observations: "",
        date: "",
        cash_register_id: cashRegister.id,
    });

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

    const handleOpenCashRegister = () => {
        router.post(route("my-cash-register.open"), {}, {
            onSuccess: () => {
                closeModal();
            }
        });
    };

    const handleCloseCashRegister = (e) => {
        e.preventDefault();
        post(route("cash-register-closures.store"), {
            onSuccess: () => {
                closeModal();
            }
        });
    };

    const openModal = (mode) => {
        setModalMode(mode);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

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
            {/* Cash Register Card, center and resize w */}
            <div className="border rounded-xl shadow-lg p-4 transform transition duration-100 hover:scale-105 max-w-lg mx-auto mt-8">
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
                            {cashRegister.is_open ? (
                                <SecondaryButton
                                    onClick={() => openModal("close")}
                                >
                                    Close
                                </SecondaryButton>
                            ) : (
                                <PrimaryButton
                                    onClick={() => openModal("open")}
                                >
                                    Open
                                </PrimaryButton>
                            )}
                        </div>
                    </>
                ) : (
                    <p>
                        No cash register assigned, contact to your
                        administrador.
                    </p>
                )}
            </div>
            {/* Modal for opening and closing cash register */}
            <Modal show={showModal} maxWidth="lg" onClose={closeModal}>
                {modalMode === "open" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Open Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <p>
                                Are you sure you want to open your cash
                                register?
                            </p>
                            <div className="flex justify-end gap-4">
                                <PrimaryButton onClick={handleOpenCashRegister}>
                                    open
                                </PrimaryButton>
                                <SecondaryButton onClick={closeModal}>
                                    cancel
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                )}
                {modalMode === "close" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Close Cash Register
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleCloseCashRegister}>
                                <div className="grid *:grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        name="bills_100000"
                                        label="100,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_100000}
                                        onChange={(e) =>
                                            setData("bills_100000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bills_50000"
                                        label="50,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_50000}
                                        onChange={(e) =>
                                            setData("bills_50000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bills_20000"
                                        label="20,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_20000}
                                        onChange={(e) =>
                                            setData("bills_20000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bills_10000"
                                        label="10,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_10000}
                                        onChange={(e) =>
                                            setData("bills_10000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bills_5000"
                                        label="5,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_5000}
                                        onChange={(e) =>
                                            setData("bills_5000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bills_2000"
                                        label="2,000 Bills"
                                        type="number"
                                        min="0"
                                        value={data.bills_2000}
                                        onChange={(e) =>
                                            setData("bills_2000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="coins_1000"
                                        label="1,000 Coins"
                                        type="number"
                                        min="0"
                                        value={data.coins_1000}
                                        onChange={(e) =>
                                            setData("coins_1000", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="coins_500"
                                        label="500 Coins"
                                        type="number"
                                        min="0"
                                        value={data.coins_500}
                                        onChange={(e) =>
                                            setData("coins_500", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="coins_200"
                                        label="200 Coins"
                                        type="number"
                                        min="0"
                                        value={data.coins_200}
                                        onChange={(e) =>
                                            setData("coins_200", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="coins_100"
                                        label="100 Coins"
                                        type="number"
                                        min="0"
                                        value={data.coins_100}
                                        onChange={(e) =>
                                            setData("coins_100", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="coins_50"
                                        label="50 Coins"
                                        type="number"
                                        min="0"
                                        value={data.coins_50}
                                        onChange={(e) =>
                                            setData("coins_50", e.target.value)
                                        }
                                    />
                                    <Input
                                        name="bank_transfer"
                                        label="Bank Transfer"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.bank_transfer}
                                        onChange={(e) =>
                                            setData("bank_transfer", e.target.value)
                                        }
                                    />
                                    <div className="col-span-2">
                                        <TextArea
                                            label="observations"
                                            name="observations"
                                            value={data.observations}
                                            onChange={(e) =>
                                                setData("observations", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 flex-wrap items-center justify-end">
                                    <PrimaryButton type="submit">close cash register</PrimaryButton>
                                    <SecondaryButton type="button" onClick={closeModal}>
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

MyCashRegister.layout = (page) => <MainLayout children={page} />;
