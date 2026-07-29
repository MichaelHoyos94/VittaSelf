import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";

export default function MyOrders() {
    const { orders, flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const columns = [
        {
            header: "id",
            accessor: "id",
        },
        {
            header: "date",
            accessor: "created_at",
        },
        {
            header: "shipping info",
            render: (row) => (
                <div className="flex flex-col">
                    <span>{row.shipping_address}</span>
                    <span>{row.email}</span>
                    <span>{row.phone}</span>
                </div>
            ),
        },
        {
            header: "pricing info",
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Subtotal: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.subtotal)}
                        </span>
                    </div>
                    <div>
                        <strong>Shipping: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.shipping_price)}
                        </span>
                    </div>
                    <div>
                        <strong>Discount: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.discount)}
                        </span>
                    </div>
                    <div>
                        <strong>Total: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.total)}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "Payment Method",
            accessor: "payment_method",
        },
        {
            header: "status",
            accessor: "status",
        },
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
        <div className="bg-white p-4 rounded space-y-2">
            <h2>My Orders</h2>
            <div>
                {successMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {successMessage}
                        </span>
                    </div>
                )}
            </div>
            <div>
                <SecondaryButton>Export</SecondaryButton>
            </div>
            <div>
                <Table
                    columns={columns}
                    data={orders}
                    emptyText="No orders found."
                />
            </div>
        </div>
    );
}

MyOrders.layout = (page) => <MainLayout children={page} />;
