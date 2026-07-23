import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, usePage } from "@inertiajs/react";

export default function ManageProducts() {
    const { products, flash } = usePage().props;

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
                data={products}
                emptyText="No products registered yet."
                filterable={true}
            />
        </div>
    );
}

ManageProducts.layout = (page) => <MainLayout children={page} />;