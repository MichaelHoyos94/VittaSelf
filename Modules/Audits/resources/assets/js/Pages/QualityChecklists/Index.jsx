import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Input";
import Select from "@/Components/Form/Select";
import TextArea from "@/Components/Form/TextArea";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { ClipboardDocumentCheckIcon, EyeIcon } from "@heroicons/react/16/solid";
import { useForm, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const TEST_COST_CENTERS = [
    { id: 1, name: "Centro Norte" },
    { id: 2, name: "Centro Sur" },
];

const TEST_QUALITY_CHECKLISTS = [
    {
        id: 1,
        temperature_start: 22.4,
        temperature_end: 23.1,
        smoke_detector: true,
        humidity_percentage: 48,
        checklist_date: "2026-05-19",
        cost_center: { id: 1, name: "Centro Norte" },
        audit: null,
    },
    {
        id: 2,
        temperature_start: 21.8,
        temperature_end: 22.6,
        smoke_detector: true,
        humidity_percentage: 52,
        checklist_date: "2026-05-18",
        cost_center: { id: 2, name: "Centro Sur" },
        audit: { status: "good", requires_actions: false },
    },
];

const statusOptions = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "bad", label: "Bad" },
    { value: "critical", label: "Critical" },
];

export default function Index() {
    const {
        qualityChecklists = TEST_QUALITY_CHECKLISTS,
        costCenters = TEST_COST_CENTERS,
        costCenter,
        flash,
    } = usePage().props;

    console.log("Cost center:", costCenter);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedChecklist, setSelectedChecklist] = useState(null);

    const { data, setData, errors, reset, post } = useForm({
        cost_center_id: costCenter?.id || "",
        checklist_date: "",
        temperature_start: "",
        temperature_end: "",
        smoke_detector: "",
        extingisher_expiration_date: "",
        last_plague_control: "",
        last_bathroom_sanitation: "",
        humidity_percentage: "",
        observations: "",
    });

    const {
        data: auditData,
        setData: setAuditData,
        errors: auditErrors,
        reset: resetAudit,
    } = useForm({
        status: "",
        requires_actions: "",
        corrective_actions: "",
    });

    const costCenterOptions = useMemo(
        () =>
            costCenters.map((costCenter) => ({
                value: costCenter.id,
                label: costCenter.name,
            })),
        [costCenters],
    );

    const closeModal = () => {
        setModalOpen(false);
        setSelectedChecklist(null);
        resetAudit();
    };

    const handleOpenCreateModal = () => {
        setModalMode("create");
        setSelectedChecklist(null);
        setModalOpen(true);
    };

    const handleOpenAuditModal = (checklist) => {
        setModalMode("audit");
        setSelectedChecklist(checklist);
        setAuditData({
            status: checklist.audit?.status || "",
            requires_actions:
                checklist.audit?.requires_actions === undefined
                    ? ""
                    : String(checklist.audit.requires_actions),
            corrective_actions: checklist.audit?.corrective_actions || "",
        });
        setModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quality checklist draft:", data);
        post(route("audits.quality-checklists.store"), {
            onSuccess: () => {
                reset();
                setModalOpen(false);
            },
        });
    };

    const handleSubmitAudit = (e) => {
        e.preventDefault();
        console.log("Quality checklist audit draft:", {
            quality_checklist_id: selectedChecklist?.id,
            ...auditData,
        });
        resetAudit();
        setModalOpen(false);
    };

    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "COST CENTER",
            render: (row) => (
                <div className="flex flex-col">
                    <strong className="font-medium">
                        {row.cost_center?.name || "Sin centro de costo"}
                    </strong>
                    <span className="text-sm text-gray-500">
                        Checklist #{row.id}
                    </span>
                </div>
            ),
        },
        {
            header: "DATE",
            render: (row) => <span>{row.checklist_date}</span>,
        },
        {
            header: "TEMPERATURE",
            render: (row) => (
                <span>
                    {row.temperature_start} C - {row.temperature_end} C
                </span>
            ),
        },
        {
            header: "HUMIDITY",
            render: (row) => <span>{row.humidity_percentage}%</span>,
        },
        {
            header: "SMOKE DETECTOR",
            render: (row) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${row.smoke_detector
                        ? "bg-primary-100 text-primary-800"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {row.smoke_detector ? "OK" : "Review"}
                </span>
            ),
        },
        {
            header: "AUDIT",
            render: (row) => (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {row.audit?.status || "Pending"}
                </span>
            ),
        },
        {
            header: "ACTIONS",
            render: (row) => (
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => handleOpenAuditModal(row)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 transition hover:scale-110 hover:bg-primary-800"
                        aria-label="Audit checklist"
                        title="Audit checklist"
                    >
                        <EyeIcon className="h-4 w-4 text-primary-50" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="rounded bg-white p-4 shadow">
            <div>
                <h1>Quality Checklists</h1>
                <p>Daily quality checklist records by cost center</p>
            </div>
            <div className="mb-4 flex flex-row items-center justify-start gap-2">
                <PrimaryButton onClick={handleOpenCreateModal}>
                    Create Checklist
                </PrimaryButton>
                <SecondaryButton>Export</SecondaryButton>
                {/* Flash message section */}
                {flash.success && (
                    <div className="rounded bg-green-100 px-4 py-2 text-green-800">
                        {flash.success}
                    </div>
                )}
                {flash.error && (
                    <div className="rounded bg-red-100 px-4 py-2 text-red-800">
                        {flash.error}
                    </div>
                )}
                {/* Card with cost center info at end */}
                <div className="ml-auto rounded bg-gray-50 px-4 py-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-primary-700" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Cost center</p>
                            <div>
                                <strong>{costCenter?.name || "N/A"}</strong>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">
                                    {costCenter?.address || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                data={qualityChecklists}
                emptyText="No quality checklists found"
            />
            <Modal show={modalOpen} onClose={closeModal} maxWidth="2xl">
                {modalMode === "create" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                New Quality Checklist
                            </h2>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="hidden" name="cost_center_id" value={data.cost_center_id} />
                                    <div>
                                        <Input
                                            label="Checklist Date"
                                            name="checklist_date"
                                            type="date"
                                            value={data.checklist_date}
                                            onChange={(e) =>
                                                setData(
                                                    "checklist_date",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.checklist_date}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Freezers initial temperature"
                                            name="temperature_start"
                                            type="number"
                                            value={data.temperature_start}
                                            onChange={(e) =>
                                                setData(
                                                    "temperature_start",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.temperature_start}
                                            placeholder="22.5"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Freezers final temperature"
                                            name="temperature_end"
                                            type="number"
                                            value={data.temperature_end}
                                            onChange={(e) =>
                                                setData(
                                                    "temperature_end",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.temperature_end}
                                            placeholder="23.0"
                                        />
                                    </div>
                                    <div>
                                        <Select
                                            label="Smoke Detector"
                                            name="smoke_detector"
                                            value={data.smoke_detector}
                                            onChange={(e) =>
                                                setData(
                                                    "smoke_detector",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.smoke_detector}
                                            options={[
                                                { value: "1", label: "Working" },
                                                {
                                                    value: "0",
                                                    label: "Not working",
                                                },
                                            ]}
                                            placeholder="Select status"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Humidity Percentage"
                                            name="humidity_percentage"
                                            type="number"
                                            value={data.humidity_percentage}
                                            onChange={(e) =>
                                                setData(
                                                    "humidity_percentage",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.humidity_percentage}
                                            placeholder="48"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Extinguisher Expiration"
                                            name="extingisher_expiration_date"
                                            type="date"
                                            value={
                                                data.extingisher_expiration_date
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "extingisher_expiration_date",
                                                    e.target.value,
                                                )
                                            }
                                            error={
                                                errors.extingisher_expiration_date
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Last Plague Control"
                                            name="last_plague_control"
                                            type="date"
                                            value={data.last_plague_control}
                                            onChange={(e) =>
                                                setData(
                                                    "last_plague_control",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.last_plague_control}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            label="Last Bathroom Sanitation"
                                            name="last_bathroom_sanitation"
                                            type="date"
                                            value={
                                                data.last_bathroom_sanitation
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "last_bathroom_sanitation",
                                                    e.target.value,
                                                )
                                            }
                                            error={
                                                errors.last_bathroom_sanitation
                                            }
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <TextArea
                                            label="Observations"
                                            name="observations"
                                            value={data.observations}
                                            onChange={(e) =>
                                                setData(
                                                    "observations",
                                                    e.target.value,
                                                )
                                            }
                                            error={errors.observations}
                                            placeholder="Observaciones si las hay..."
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-row items-center justify-end gap-2">
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Create Checklist
                                    </PrimaryButton>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
                {modalMode === "audit" && (
                    <div>
                        <div className="border-b px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-primary-700" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Audit Checklist
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedChecklist?.cost_center?.name} -{" "}
                                        {selectedChecklist?.checklist_date}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mx-4 my-6">
                            <Form onSubmit={handleSubmitAudit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <Select
                                        label="Status"
                                        name="status"
                                        value={auditData.status}
                                        onChange={(e) =>
                                            setAuditData(
                                                "status",
                                                e.target.value,
                                            )
                                        }
                                        error={auditErrors.status}
                                        options={statusOptions}
                                        placeholder="Select audit status"
                                    />
                                    <Select
                                        label="Requires Actions"
                                        name="requires_actions"
                                        value={auditData.requires_actions}
                                        onChange={(e) =>
                                            setAuditData(
                                                "requires_actions",
                                                e.target.value,
                                            )
                                        }
                                        error={auditErrors.requires_actions}
                                        options={[
                                            { value: "1", label: "Yes" },
                                            { value: "0", label: "No" },
                                        ]}
                                        placeholder="Select an option"
                                    />
                                    <div className="col-span-2">
                                        <TextArea
                                            label="Corrective Actions"
                                            name="corrective_actions"
                                            value={auditData.corrective_actions}
                                            onChange={(e) =>
                                                setAuditData(
                                                    "corrective_actions",
                                                    e.target.value,
                                                )
                                            }
                                            error={
                                                auditErrors.corrective_actions
                                            }
                                            placeholder="Describe corrective actions if required..."
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-row items-center justify-end gap-2">
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton type="submit">
                                        Save Audit
                                    </PrimaryButton>
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
