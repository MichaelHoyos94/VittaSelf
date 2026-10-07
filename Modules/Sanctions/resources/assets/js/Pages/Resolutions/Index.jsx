import Badge from "@/Components/Badge";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import UserCard from "@/Components/UserCard";
import MainLayout from "@/Layouts/MainLayout";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const enforcementStatuses = {
    active: { type: "error", text: "Active" },
    scheduled: { type: "warning", text: "Scheduled" },
    expired: { type: "info", text: "Expired" },
    none: { type: "neutral", text: "No sanction" },
};

const formatDate = (value) =>
    value
        ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

function Section({ title, children }) {
    return (
        <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 [text-shadow:none]">
                {title}
            </h3>
            {children}
        </section>
    );
}

function Detail({ label, children, className = "" }) {
    return (
        <div className={className}>
            <p className="text-xs font-medium uppercase text-gray-400">
                {label}
            </p>
            <div className="font-medium text-gray-700">{children}</div>
        </div>
    );
}

function CatalogList({ items, nameKey, emptyText }) {
    if (!items?.length) {
        return (
            <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                {emptyText}
            </p>
        );
    }

    return (
        <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200">
            {items.map((item) => (
                <li key={item.id} className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="font-semibold text-gray-800">
                            {item[nameKey]}
                        </p>
                        <span className="text-xs font-medium uppercase text-primary-700">
                            {item.code}
                        </span>
                    </div>
                    {item.description && (
                        <p className="mt-1 text-gray-500">{item.description}</p>
                    )}
                </li>
            ))}
        </ul>
    );
}

function ResolutionDetails({ resolution, onClose }) {
    const disciplinaryCase = resolution.disciplinary_case;
    const policy = disciplinaryCase?.policy;
    const enforcement = [...(resolution.sanction_enforcements ?? [])].sort(
        (a, b) => new Date(b.applied_at) - new Date(a.applied_at),
    )[0];
    const status =
        enforcementStatuses[resolution.enforcement_status] ??
        enforcementStatuses.none;

    return (
        <div>
            <div className="flex items-start justify-between gap-4 border-b px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Resolution #{resolution.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Issued on {formatDate(resolution.created_at)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge
                            type={
                                resolution.resolution_type === "procede"
                                    ? "secondary"
                                    : "success"
                            }
                            text={resolution.resolution_type}
                        />
                        <Badge type={status.type} text={status.text} />
                    </div>
                </div>
                <SecondaryButton onClick={onClose}>Close</SecondaryButton>
            </div>

            <div className="space-y-6 px-6 py-5">
                <Section title="EUI involved">
                    <UserCard user={disciplinaryCase?.user} />
                </Section>

                <Section title="Case">
                    <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        <Detail label="Policy" className="sm:col-span-2">
                            {policy ? (
                                <>
                                    <p>{policy.policy}</p>
                                    <p className="text-xs font-normal text-gray-500">
                                        {policy.code} · Section{" "}
                                        {policy.section} · Numeral{" "}
                                        {policy.numeral}
                                    </p>
                                </>
                            ) : (
                                "N/A"
                            )}
                        </Detail>
                        <Detail label="Compliance source">
                            {disciplinaryCase?.compliance_source?.source ??
                                "N/A"}
                        </Detail>
                        <Detail label="Handled by">
                            <p>
                                {disciplinaryCase?.admin?.full_name ??
                                    disciplinaryCase?.admin?.name ??
                                    "N/A"}
                            </p>
                            {disciplinaryCase?.admin?.email && (
                                <p className="text-xs font-normal text-gray-500">
                                    {disciplinaryCase.admin.email}
                                </p>
                            )}
                        </Detail>
                        <Detail label="Facts" className="sm:col-span-2">
                            <p className="whitespace-pre-line break-words font-normal">
                                {disciplinaryCase?.facts_description ?? "N/A"}
                            </p>
                        </Detail>
                    </div>
                </Section>

                <Section title="Resolution">
                    <div className="grid grid-cols-1 gap-4 text-sm">
                        <Detail label="Sanction level">
                            {resolution.sanction_level?.sanction_level ?? "N/A"}
                        </Detail>
                        <Detail label="Resolution text">
                            <p className="whitespace-pre-line break-words font-normal">
                                {resolution.resolution_text}
                            </p>
                        </Detail>
                    </div>
                </Section>

                <Section title="Applied sanctions">
                    <CatalogList
                        items={resolution.sanctions}
                        nameKey="sanction"
                        emptyText="No sanctions applied."
                    />
                </Section>

                <Section title="Mitigations">
                    <CatalogList
                        items={resolution.mitigations}
                        nameKey="mitigation"
                        emptyText="No mitigations applied."
                    />
                </Section>

                <Section title="Enforcement period">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Detail label="Applied at">
                            {formatDate(enforcement?.applied_at) ?? "N/A"}
                        </Detail>
                        <Detail label="Lifted at">
                            {enforcement
                                ? (formatDate(enforcement.lifted_at) ??
                                  "Indefinite")
                                : "N/A"}
                        </Detail>
                    </div>
                </Section>
            </div>
        </div>
    );
}

export default function Index() {
    const { resolutions } = usePage().props;
    const [selectedResolution, setSelectedResolution] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const openDetails = (resolution) => {
        setSelectedResolution(resolution);
        setShowDetails(true);
    };

    const columns = [
        { header: "ID", accessor: "id" },
        {
            header: "EUI INVOLVED",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.disciplinary_case.user?.name
                                ?.charAt(0)
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <strong className="font-medium">
                            {row.disciplinary_case.user.name}
                        </strong>
                        <span className="text-sm text-gray-500">
                            {row.disciplinary_case.user.email}
                        </span>
                        <span className="text-sm text-gray-500">
                            {row.disciplinary_case.user.phone}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "ADMIN",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700 ">
                            {row.disciplinary_case.admin.name
                                .charAt(0)
                                .toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <strong className="font-medium">
                            {row.disciplinary_case.admin.name}
                        </strong>
                        <span className="text-sm text-gray-500">
                            {row.disciplinary_case.admin.email}
                        </span>
                        <span className="text-sm text-gray-500">
                            {row.disciplinary_case.admin.phone}
                        </span>
                    </div>
                </div>
            ),
        },
        { header: "RESOLUTION TYPE", render: (row) => (
            <Badge 
                type={row.resolution_type === 'procede' ? 'secondary' : 'success'}
                text={row.resolution_type}
            />
        )},
        { header: "RESOLUTION TEXT", render: (row) => (
            <div>
                {/* Truncate the resolution text to 32 characters */}
                <span>
                    {row.resolution_text.length > 32
                        ? row.resolution_text.substring(0, 32) + "..."
                        : row.resolution_text}
                </span>
            </div>
        )},
        { header: "RESOLUTION DATE", render: (row) => (
            <span>
                {new Date(row.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </span>
        )},
        {
            header: "DETAILS",
            render: (row) => (
                <button
                    type="button"
                    onClick={() => openDetails(row)}
                    aria-label={`View details of resolution #${row.id}`}
                    title="View details"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-primary-700 transition hover:bg-primary-50 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                    <EyeIcon className="h-5 w-5" />
                </button>
            ),
        },
    ];

    const handleSearch = (search) => {
        router.get(
            route("sanctions.resolutions.index"),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ["resolutions"],
            }
        );
    }

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    return (
        <div className="min-h-full rounded-xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur-md">
            <Head title="Resolutions" />
            <div>
                <h2 className="text-2xl font-bold">Resolutions history</h2>
                <p className="text-sm text-gray-500">Review the history of resolutions for disciplinary cases.</p>
            </div>
            <Table
                columns={columns}
                data={resolutions.data}
                from={resolutions.from}
                to={resolutions.to}
                total={resolutions.total}
                links={resolutions.links}
                filterable={true}
                handleSearch={handleSearch}
                emptyText="No resolutions found."
                onPageChange={handlePageChange}
            />
            <Modal
                show={showDetails}
                onClose={() => setShowDetails(false)}
                maxWidth="2xl"
            >
                {selectedResolution && (
                    <ResolutionDetails
                        resolution={selectedResolution}
                        onClose={() => setShowDetails(false)}
                    />
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
