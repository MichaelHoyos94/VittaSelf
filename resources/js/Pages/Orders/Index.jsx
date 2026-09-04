import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react";
import formatCurrency from "@/Utils/formatCurrency";

export default function Index() {
    const { orders } = usePage().props;

    const columns = [
        {
            header: "order number",
            accessor: "order_number",
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
            header: "pricing info",
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Subtotal: </strong>
                        <span>{formatCurrency(row.subtotal)}</span>
                    </div>
                    <div>
                        <strong>Shipping: </strong>
                        <span>{formatCurrency(row.shipping_price)}</span>
                    </div>
                    <div>
                        <strong>Discount: </strong>
                        <span>{formatCurrency(row.discount)}</span>
                    </div>
                    <div>
                        <strong>Total: </strong>
                        <span>{formatCurrency(row.total)}</span>
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
            render: (row) => (
                <div>
                    <PrimaryButton>Details</PrimaryButton>
                </div>
            ),
        },
    ];

    const handleSearch = (search) => {
        router.get(
            route("orders.web-orders.index"),
            {
                search: search,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="bg-white/80 p-6 rounded-xl shadow-lg backdrop-blur-lg min-h-full space-y-2">
            <h2>Orders</h2>
            <p>Orders History</p>
            <div className="flex justify-between items-center">
                <SecondaryButton>export</SecondaryButton>
            </div>
            <Table
                columns={columns}
                filterable={true}
                handleSearch={handleSearch}
                data={orders.data}
                from={orders.from}
                to={orders.to}
                totalResults={orders.total}
                links={orders.links}
            />
        </div>
    );
}

Index.layout = (page) => <MainLayout children={page} title="Orders" />;
