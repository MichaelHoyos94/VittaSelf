import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";

export default function Index() {
    const columns = [
        {
            header: "ID",
            accessor: "id",
        },
    ];

    return (
        <div className="rounded bg-white p-4">
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
                <Table columns={columns} />
            </div>
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} />;
