import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Input from "@/Components/Form/Input";
import {
    ArrowUpOnSquareIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";

export default function MyCases() {
    const { cases = [], flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash?.success);
    const [errorMessage, setErrorMessage] = useState(flash?.error);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("view");
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDraggingFiles, setIsDraggingFiles] = useState(false);
    const {
        data: rebuttalData,
        setData: setRebuttalData,
        post: postRebuttals,
        errors: rebuttalErrors,
        reset: resetRebuttals,
        processing,
    } = useForm({
        rebuttal_description: "",
        rebuttals: [],
    });

    const formatFileSize = (bytes) => {
        if (!bytes) {
            return "0 KB";
        }

        const units = ["B", "KB", "MB", "GB"];
        const unitIndex = Math.min(
            Math.floor(Math.log(bytes) / Math.log(1024)),
            units.length - 1,
        );
        const size = bytes / 1024 ** unitIndex;

        return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    };

    const addFiles = (files) => {
        const incomingFiles = Array.from(files || []);

        if (!incomingFiles.length) {
            return;
        }

        setSelectedFiles((currentFiles) => {
            const fileKeys = new Set(
                currentFiles.map(
                    (file) => `${file.name}-${file.size}-${file.lastModified}`,
                ),
            );
            const uniqueIncomingFiles = incomingFiles.filter((file) => {
                const key = `${file.name}-${file.size}-${file.lastModified}`;

                if (fileKeys.has(key)) {
                    return false;
                }

                fileKeys.add(key);
                return true;
            });
            const nextFiles = [...currentFiles, ...uniqueIncomingFiles];

            setRebuttalData("rebuttals", nextFiles);
            return nextFiles;
        });
    };

    const handleFileInputChange = (e) => {
        addFiles(e.target.files);
        e.target.value = "";
    };

    const handleDropFiles = (e) => {
        e.preventDefault();
        setIsDraggingFiles(false);
        addFiles(e.dataTransfer.files);
    };

    const removeFile = (fileToRemove) => {
        setSelectedFiles((currentFiles) => {
            const nextFiles = currentFiles.filter(
                (file) =>
                    `${file.name}-${file.size}-${file.lastModified}` !==
                    `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`,
            );

            setRebuttalData("rebuttals", nextFiles);
            return nextFiles;
        });
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsDraggingFiles(false);
    };

    const handleViewCase = (row) => {
        setSelectedCase(row);
        setModalMode("view");
        setModalOpen(true);
    };

    const handleOpenUploadRebuttals = (row) => {
        setSelectedCase(row);
        setSelectedFiles([]);
        resetRebuttals();
        setModalMode("rebuttals");
        setModalOpen(true);
    };

    const handleSubmitRebuttals = (e) => {
        e.preventDefault();

        if (!selectedCase) {
            return;
        }

        postRebuttals(
            route("sanctions.rebuttals.store", {
                disciplinaryCaseId: selectedCase.id,
            }),
            {
                forceFormData: true,
                onSuccess: () => {
                    setModalOpen(false);
                    resetRebuttals();
                    setSelectedFiles([]);
                },
            },
        );
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
    }, [flash.error, flash.success])

    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "EUI",
            render: (row) => (
                <div className="flex items-center gap-3">
                    {/* Avatar con inicial */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    {/* Información textual */}
                    <div className="flex flex-col">
                        <strong className="font-medium">
                            {row.user?.name}
                        </strong>
                        <span className="text-sm text-gray-500">
                            {row.user?.email}
                        </span>
                        <span className="text-sm text-gray-500">
                            {row.user?.document_number}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "POLICY",
            render: (row) => <div>{row.policy.policy}</div>,
        },
        {
            header: "ADMINISTRATOR",
            render: (row) => (
                <div>{row.admin?.name || "Sin administrador asignado"}</div>
            ),
        },
        {
            header: "STATUS",
            render: (row) => (
                <div className="p-2 rounded-full bg-primary-200 text-center">
                    {row.case_status?.case_status}
                </div>
            ),
        },
        {
            header: "ACTIONS",
            render: (row) => (
                <div className="flex justify-center">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="px-2 py-2 bg-primary-700 rounded-full hover:bg-primary-800 transform transition-transform duration-300 hover:scale-110"
                            >
                                <EllipsisHorizontalIcon className="h-4 w-4 text-primary-50" />
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" width="48">
                            <button
                                type="button"
                                onClick={() => handleViewCase(row)}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                            >
                                View case
                            </button>
                            {row.case_status?.code === "AWAITING_EVIDENCES" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleOpenUploadRebuttals(row)
                                    }
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    Rebuttals
                                </button>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white/70 p-8 rounded-xl shadow-xl backdrop-blur-lg min-h-full">
            <h2>My Cases</h2>
            <p>You have {cases.data?.length} disciplinary cases.</p>
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
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
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
            </div>
            <Table columns={columns} data={cases.data} from={cases.from} to={cases.to} totalResults={cases.total} />
            <Modal show={modalOpen} onClose={closeModal} maxWidth="xl">
                {modalMode === "view" && selectedCase && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Case #{selectedCase.id}
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-3 text-sm text-gray-700">
                            <p>
                                <strong>Policy:</strong> {selectedCase.policy?.policy}
                            </p>
                            <p>
                                <strong>Status:</strong> {selectedCase.case_status?.case_status}
                            </p>
                            <p>
                                <strong>Administrator:</strong> {selectedCase.admin?.name || "Sin administrador asignado"}
                            </p>
                            <div className="flex justify-end">
                                <SecondaryButton type="button" onClick={closeModal}>
                                    Close
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                )}
                {modalMode === "rebuttals" && selectedCase && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Upload rebuttals
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-4">
                            <form onSubmit={handleSubmitRebuttals} className="space-y-6">
                                <label
                                    htmlFor="rebuttal-files"
                                    onDragEnter={(e) => {
                                        e.preventDefault();
                                        setIsDraggingFiles(true);
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDraggingFiles(true);
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();

                                        if (
                                            e.relatedTarget &&
                                            e.currentTarget.contains(e.relatedTarget)
                                        ) {
                                            return;
                                        }

                                        setIsDraggingFiles(false);
                                    }}
                                    onDrop={handleDropFiles}
                                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition ${isDraggingFiles
                                        ? "border-primary-600 bg-primary-50"
                                        : "border-primary-300 bg-gray-50 hover:border-primary-500 hover:bg-primary-50/50"
                                        }`}
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-primary-100">
                                        <ArrowUpOnSquareIcon className="h-7 w-7 text-primary-700" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Drag and drop files here
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        or click to select rebuttal files from your device
                                    </p>
                                    <p className="mt-3 text-xs text-gray-400">
                                        PDF, images, documents, audio or video files
                                    </p>
                                    <input
                                        id="rebuttal-files"
                                        name="rebuttals[]"
                                        type="file"
                                        multiple
                                        className="sr-only"
                                        onChange={handleFileInputChange}
                                    />
                                </label>
                                {rebuttalErrors.rebuttals && (
                                    <p className="text-sm text-red-600">
                                        {rebuttalErrors.rebuttals}
                                    </p>
                                )}

                                <Input
                                    label="Rebuttal Description"
                                    name="rebuttal_description"
                                    value={rebuttalData.rebuttal_description}
                                    onChange={(e) =>
                                        setRebuttalData(
                                            "rebuttal_description",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Briefly describe the documents you're uploading..."
                                    error={rebuttalErrors.rebuttal_description}
                                />

                                {selectedFiles.length > 0 && (
                                    <div className="rounded-lg border border-gray-200 bg-white">
                                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                            <p className="text-sm font-semibold text-gray-800">
                                                Selected files ({selectedFiles.length})
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFiles([]);
                                                    setRebuttalData("rebuttals", []);
                                                }}
                                                className="text-xs font-medium text-primary-700 hover:text-primary-900"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        <ul className="max-h-56 divide-y divide-gray-100 overflow-y-auto">
                                            {selectedFiles.map((file) => (
                                                <li
                                                    key={`${file.name}-${file.size}-${file.lastModified}`}
                                                    className="flex items-center justify-between gap-3 px-4 py-3"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium text-gray-700">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {formatFileSize(file.size)}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(file)}
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                                                        aria-label={`Remove ${file.name}`}
                                                    >
                                                        <XMarkIcon className="h-4 w-4" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex flex-row items-center justify-end gap-2">
                                    <SecondaryButton onClick={closeModal} type="button">
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={!selectedFiles.length || processing}
                                    >
                                        Send
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

MyCases.layout = (page) => <MainLayout children={page} title="My Cases" />;
