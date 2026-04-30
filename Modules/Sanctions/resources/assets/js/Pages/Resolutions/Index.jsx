import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { resolutions } = usePage().props;
    console.log(resolutions[0].disciplinary_case);
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
        { header: "RESOLUTION TEXT", accessor: "resolution_text" },
        { header: "RESOLUTION DATE", accessor: "created_at" },
    ];
    return (
        <div className="p-4 rounded bg-white shadow">
            <div>
                <h1>Resolutions history</h1>
                <p>Resolutions history</p>
            </div>
            <Table
                columns={columns}
                data={resolutions}
                emptyText="No resolutions found."
            />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
