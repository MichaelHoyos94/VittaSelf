import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { productCounts } = usePage().props;

    const columns = [
        {
            header: "ID",
            accessor: "id",
        },
        {
            header: "Counted By",
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            user
                        </span>
                    </div>
                    <span>user</span>
                </div>
            ),
        },
        {
            header: "Count Date",
            accessor: "count_date",
        },
        {
            header: "Observations",
            accessor: "observations",
        },
        {
            header: "Audited",
            accessor: "audited",
        },
    ];

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <div>
                <h2>Product counts</h2>
                <p>Daily product counts by cost center</p>
            </div>
            <div className="mb-4 flex flex-row gap-2 items-center justify-start">
                <Link href={route("audits.product-counts.create")}>
                    <PrimaryButton type="button">Create</PrimaryButton>
                </Link>
                <SecondaryButton type="button">Export</SecondaryButton>
            </div>
            <div>
                <Table columns={columns} data={productCounts} />
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
