import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import formatCurrency from "@/Utils/formatCurrency";

export default function ManageProducts() {
    const { products, flash } = usePage().props;

    const columns = [
        {
            header: "#",
            accessor: "id",
        },
        {
            header: "name",
            accessor: "name",
        },
        {
            header: "price",
            render: (row) => <div>{formatCurrency(row.price)}</div>,
        },
        {
            header: "cover",
            accessor: "cover",
        },
        {
            header: "created",
            accessor: "created_at",
        },
        {
            header: "last update",
            accessor: "updated_at",
        },
    ];

    const handleSearch = (search) => {
        router.get(
            route("products.manage-products"),
            { search: search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2>Manage Products</h2>
            <p>Create, edit and inactivate products.</p>
            {/* Buttons */}
            <div className="flex flex-row gap-4 mb-4">
                <Link>
                    <PrimaryButton>Create</PrimaryButton>
                </Link>
                <SecondaryButton>Export</SecondaryButton>
            </div>
            <Table
                columns={columns}
                data={products.data}
                emptyText="No products registered yet."
                filterable={true}
                handleSearch={handleSearch}
                from={products.from}
                to={products.to}
                totalResults={products.total}
            />
        </div>
    );
}

ManageProducts.layout = (page) => <MainLayout children={page} />;