import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function InternalOrders() {
    const { internalOrders, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const columns = [
        {
            header: 'id',
            accessor: 'id',
        }
    ];

    useEffect(() => {
        setSuccessMessage(flash.success);
        if (!flash.success) return;
        const timer = setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash.success]);

    return (
        <div className="p-4 bg-white rounded shadow">
            <h1>Internal Orders</h1>
            {/* Flash messages */}
            <div>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
            </div>
            {/* Buttons */}
            <div className="flex justify-between mb-4 items-center">
                <Link
                    href={route('orders.internal-orders.create')}
                >
                    <PrimaryButton>Create</PrimaryButton>
                </Link>
            </div>
            <Table
                columns={columns}
                data={internalOrders}
            />
        </div>
    );
}

InternalOrders.layout = (page) => <MainLayout children={page} />;