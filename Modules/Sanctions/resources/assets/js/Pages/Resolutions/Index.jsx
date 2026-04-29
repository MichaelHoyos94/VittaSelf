import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { resolutions } = usePage().props;
    console.log(resolutions);
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "EUI INVOLVED", accessor: "disciplinary_case_id" },
        { header: "ADMIN", accessor: "disciplinary_case_id" },
        { header: "RESOLUTION TYPE", accessor: "resolution_type" },
        { header: "RESOLUTION TEXT", accessor: "resolution"},
        { header: "RESOLUTION DATE", accessor: "created_at"}
    ];
    return (
        <div className="p-4 rounded bg-white shadow">
            <div>
                <h1>Resolutions history</h1>
                <p>Resolutions history</p>
            </div>
            <Table 
                columns={columns}
                emptyText="No resolutions found."
            />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
