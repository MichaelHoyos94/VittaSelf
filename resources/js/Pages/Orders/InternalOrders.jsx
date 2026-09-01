import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import formatCurrency from "@/Utils/formatCurrency";

export default function InternalOrders() {
    const { internalOrders, flash } = usePage().props;
    console.log(internalOrders);
    const [successMessage, setSuccessMessage] = useState(flash.success);
    const columns = [
        {
            header: "#",
            accessor: "id",
        },
        {
            header: "eui",
            render: (row) => (
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.customer.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <strong>{row.customer.name}</strong>
                        <span className="text-gray-500">
                            {row.shipping_address}
                        </span>
                        <span className="text-gray-500">{row.email}</span>
                        <span className="text-gray-500">{row.phone}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "commercial agent",
            render: (row) => (
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                            {row.commercial_agent.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span>{row.commercial_agent.full_name}</span>
                </div>
            ),
        },
        {
            header: "pricing info",
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Subtotal: </strong>
                        <span className="text-gray-500">{formatCurrency(row.subtotal)}</span>
                    </div>
                    <div>
                        <strong>Shipping: </strong>
                        <span className="text-gray-500">
                            {formatCurrency(row.shipping_price)}
                        </span>
                    </div>
                    <div>
                        <strong>Discount: </strong>
                        <span className="text-gray-500">{formatCurrency(row.discount)}</span>
                    </div>
                    <div>
                        <strong>Total: </strong>
                        <span className="text-gray-500">{formatCurrency(row.total)}</span>
                    </div>
                </div>
            ),
        },
        {
            header: "points",
            accessor: "points",
        },
        {
            header: "status",
            accessor: "status",
        },
        {
            header: "actions",
            render: (row) => <PrimaryButton>details</PrimaryButton>,
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

    const handleSearch = (search) => {
        router.get(
            route("orders.internal-orders.index"),
            { search: search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <h1>Internal Orders</h1>
            {/* Flash messages */}
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
            {/* Buttons */}
            <div className="flex justify-between mb-4 items-center mt-4">
                <Link href={route("orders.internal-orders.create")}>
                    <PrimaryButton>Create</PrimaryButton>
                </Link>
            </div>
            <Table
                columns={columns}
                filterable={true}
                handleSearch={handleSearch}
                data={internalOrders.data}
                from={internalOrders.from}
                to={internalOrders.to}
                totalResults={internalOrders.total}
                links={internalOrders.links}
            />
        </div>
    );
}

InternalOrders.layout = (page) => <MainLayout children={page} />;
