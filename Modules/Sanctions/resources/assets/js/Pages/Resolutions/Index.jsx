import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";

export default function Index() {
    const { resolutions } = usePage().props;
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
        { header: "RESOLUTION TYPE", accessor: "resolution_type" },
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
            <div>
                <h2>Resolutions history</h2>
                <p>Review the history of resolutions for disciplinary cases.</p>
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
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
