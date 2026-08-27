import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import Dropdown from "@/Components/Dropdown";
import MainLayout from "@/Layouts/MainLayout";
import {
    ArrowUpOnSquareIcon,
    EllipsisHorizontalIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index() {
    const { policies, complianceSources, disciplinaryCases, userToSanction, flash } =
        usePage().props;
    const { data, setData, post, errors, reset } = useForm({
        facts_description: "",
        details: "",
        user_id: userToSanction ? userToSanction.id : "",
        eui_code: "",
        policy_id: "",
        compliance_source_id: "",
    });
    const {
        data: evidenceData,
        setData: setEvidenceData,
        post: postEvidence,
        errors: evidenceErrors,
        reset: resetEvidence,
    } = useForm({
        evidence_description: "",
        evidences: [],
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDraggingFiles, setIsDraggingFiles] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedCaseId, setSelectedCaseId] = useState(null);
    const user = usePage().props.auth.user;

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
    // Set evidencesData with selected files and other form data, then submit
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
            setEvidenceData("evidences", [
                ...currentFiles,
                ...uniqueIncomingFiles,
            ]);
            return [...currentFiles, ...uniqueIncomingFiles];
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
        setSelectedFiles((currentFiles) =>
            currentFiles.filter(
                (file) =>
                    `${file.name}-${file.size}-${file.lastModified}` !==
                    `${fileToRemove.name}-${fileToRemove.size}-${fileToRemove.lastModified}`,
            ),
        );
    };

    const closeModal = () => {
        setModalOpen(false);
        setIsDraggingFiles(false);
        setSelectedFiles([]);
        reset();
        setSelectedCaseId(null);
    };

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
                            {row.case_status?.code !== "CLOSED" && (
                                <button
                                    type="button"
                                    onClick={() => handleManageCase(row.id)}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    Manage case
                                </button>
                            )}
                            {row.case_status?.code === "AWAITING_EVIDENCES" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleOpenUploadEvidences(row.id)
                                    }
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    Upload evidences
                                </button>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            ),
        },
    ];
    const handleOpenCreateModal = () => {
        setModalMode("create");
        setModalOpen(true);
    };
    const handleViewCase = (row) => {
        console.log("Viewing disciplinary case:", row.id);
    };
    const handleManageCase = (id) => {
        router.get(route("sanctions.manage-case", id));
    };
    const searchUser = () => {
        if (userToSanction) {
            router.get(
                route("sanctions.disciplinary-cases.index"),
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ["userToSanction"],
                },
            );
            return;
        }
        if (!data.eui_code) {
            return;
        }
        router.get(
            route("sanctions.disciplinary-cases.index"),
            { eui_code: data.eui_code },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["userToSanction"],
            },
        );
    };
    const handleOpenUploadEvidences = (caseId) => {
        setSelectedCaseId(caseId);
        setModalMode("upload");
        setSelectedFiles([]);
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("sanctions.disciplinary-cases.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const handleSubmitEvidences = (e) => {
        e.preventDefault();
        setEvidenceData("evidences", selectedFiles);
        console.log("Submitting evidences:", evidenceData);
        postEvidence(
            route("sanctions.evidences.store", { disciplinaryCaseId: selectedCaseId }),
            {
                onSuccess: () => {
                    setModalOpen(false);
                    resetEvidence();
                    setSelectedFiles([]);
                },
            },
        );
    };

    const handleSearch = (search) => {
        router.get(
            route("sanctions.disciplinary-cases.index"),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["disciplinaryCases"],
            },
        );
    }

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    useEffect(() => {
        setData("user_id", userToSanction ? userToSanction.id : "");
    }, [userToSanction]);

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

    return (
        <div className="min-h-full rounded-xl border border-white/50 bg-white/75 p-8 shadow-lg backdrop-blur-md">
            <div>
                <h1>Disciplinary cases</h1>
                <p>Investigations on going.</p>
            </div>
            {/* Messages */}
            <div>
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
            </div>
            <div className="flex flex-row items-center my-4 justify-start gap-2">
                <PrimaryButton onClick={handleOpenCreateModal}>
                    Create Case
                </PrimaryButton>
                <SecondaryButton>Export</SecondaryButton>
            </div>
            <Table
                columns={columns}
                data={disciplinaryCases.data}
                filterable={true}
                handleSearch={handleSearch}
                onPageChange={handlePageChange}
                from={disciplinaryCases.from}
                to={disciplinaryCases.to}
                total={disciplinaryCases.total}
                links={disciplinaryCases.links}
                emptyText="No disciplinary cases found"
            />
            <Modal show={modalOpen} onClose={closeModal} maxWidth="xl">
                {modalMode === "create" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                New Disciplinary Case
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 grid grid-cols-8 gap-4">
                                        <div className="col-span-7">
                                            <input
                                                type="hidden"
                                                name="user_id"
                                                value={data.user_id}
                                            />
                                            <Input
                                                label="Eui Code"
                                                name="eui_code"
                                                value={data.eui_code}
                                                disabled={!!userToSanction}
                                                onChange={(e) =>
                                                    setData(
                                                        "eui_code",
                                                        e.target.value || "",
                                                    )
                                                }
                                                error={errors.eui_code}
                                                type="text"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="COL-51578"
                                            />
                                        </div>
                                        <div className="flex col-span-1">
                                            <button
                                                type="button"
                                                onClick={searchUser}
                                                aria-label={
                                                    userToSanction
                                                        ? "Remove user"
                                                        : "Search user"
                                                }
                                                className="mt-8 flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-primary-50"
                                            >
                                                {userToSanction ? (
                                                    <XMarkIcon className="h-4 w-4 text-red-600 hover:text-red-700" />
                                                ) : (
                                                    <MagnifyingGlassIcon className="h-4 w-4 text-primary-700 hover:text-primary-800" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {userToSanction && (
                                        <div className="col-span-2 user-info">
                                            <div className="rounded-lg border border-primary-100 bg-primary-50/60 p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">
                                                        {userToSanction.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-gray-900">
                                                            {
                                                                userToSanction.full_name
                                                            }
                                                        </p>
                                                        <p className="truncate text-sm text-gray-500">
                                                            {
                                                                userToSanction.email
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                                    <div>
                                                        <p className="text-xs font-medium uppercase text-gray-400">
                                                            EUI Code
                                                        </p>
                                                        <p className="font-medium text-gray-700">
                                                            {userToSanction.eui_code}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium uppercase text-gray-400">
                                                            Document
                                                        </p>
                                                        <p className="font-medium text-gray-700">
                                                            {
                                                                userToSanction.document_number
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-xs font-medium uppercase text-gray-400">
                                                            Position
                                                        </p>
                                                        <p className="font-medium text-gray-700">
                                                            {userToSanction.plan?.name || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-span-2">
                                        <TextArea
                                            label="Facts Description *"
                                            name="facts_description"
                                            value={data.facts_description}
                                            onChange={(e) =>
                                                setData(
                                                    "facts_description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Describe the facts of the case here..."
                                            error={errors.facts_description}
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            label="Policy"
                                            name="policy_id"
                                            value={data.policy_id}
                                            onChange={(e) =>
                                                setData(
                                                    "policy_id",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.policy_id}
                                            options={policies.map((policy) => ({
                                                value: policy.id,
                                                label: policy.policy,
                                            }))}
                                            placeholder="Select a policy"
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            label="Compliance Source"
                                            name="compliance_source_id"
                                            value={data.compliance_source_id}
                                            onChange={(e) =>
                                                setData(
                                                    "compliance_source_id",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.compliance_source_id}
                                            options={complianceSources.map(
                                                (source) => ({
                                                    value: source.id,
                                                    label: source.source,
                                                }),
                                            )}
                                            placeholder="Select a compliance source"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextArea
                                            label="Additional Details"
                                            name="details"
                                            value={data.details}
                                            onChange={(e) =>
                                                setData(
                                                    "details",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Compliant by COL-59120, Internal investigation number 2024-0001, etc..."
                                            error={errors.details}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-end gap-2 mt-4">
                                    <SecondaryButton
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Create Case
                                    </PrimaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
                {modalMode === "upload" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Upload Evidences
                            </h2>
                        </div>
                        <div className="mx-4 my-6 space-y-4">
                            <form
                                onSubmit={handleSubmitEvidences}
                                className="space-y-6"
                            >
                                <label
                                    htmlFor="evidence-files"
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
                                            e.currentTarget.contains(
                                                e.relatedTarget,
                                            )
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
                                        or click to select evidence files from
                                        your device
                                    </p>
                                    <p className="mt-3 text-xs text-gray-400">
                                        PDF, images, documents, audio or video
                                        files
                                    </p>
                                    <input
                                        id="evidence-files"
                                        name="evidences[]"
                                        type="file"
                                        multiple
                                        className="sr-only"
                                        onChange={handleFileInputChange}
                                    />
                                </label>

                                <Input
                                    label="Evidence Description"
                                    name="evidence_description"
                                    value={evidenceData.evidence_description}
                                    onChange={(e) =>
                                        setEvidenceData(
                                            "evidence_description",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Briefly describe the evidences you're uploading..."
                                    error={evidenceErrors.evidence_description}
                                />

                                {selectedFiles.length > 0 && (
                                    <div className="rounded-lg border border-gray-200 bg-white">
                                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                            <p className="text-sm font-semibold text-gray-800">
                                                Selected files (
                                                {selectedFiles.length})
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedFiles([])
                                                }
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
                                                            {formatFileSize(
                                                                file.size,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFile(file)
                                                        }
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
                                    <SecondaryButton
                                        onClick={closeModal}
                                        type="button"
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        disabled={!selectedFiles.length}
                                    >
                                        Upload Files
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

Index.layout = (page) => <MainLayout children={page} />;
