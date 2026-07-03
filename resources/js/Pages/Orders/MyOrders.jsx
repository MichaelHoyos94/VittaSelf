import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react"
import { useEffect } from "react";

export default function MyOrders() 
{
    const { orders, flash } = usePage().props;
    const columns = [
        {
            header: 'date',
            accessor: 'created_at',
        },
        {
            header: 'shipping info',
            render: (row) => (
                <div className="flex flex-col">
                    <span>{row.shipping_address}</span>
                </div>
            )
        },
        {
            header: 'total',
            accessor: 'total',
        },
        {
            header: 'Payment Method',
            accessor: 'payment_method',
        },
        {
            header: 'status',
            accessor: 'status',
        },
    ];

    useEffect(() => {
        if (flash.success) {
            const timer = setTimeout(() => {
                // Clear the flash message after 5 seconds
                flash.success = null;
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <div className="bg-white p-4 rounded space-y-2">
            <h2>My Orders</h2>
            <div>
                {flash.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{flash.success}</span>
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
    )
}

MyOrders.layout = (page) => <MainLayout children={page}/>