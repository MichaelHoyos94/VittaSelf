import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { usePage } from "@inertiajs/react"

export default function MyOrders() 
{
    const { orders } = usePage().props;
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
    return (
        <div className="bg-white p-4 rounded space-y-2">
            <h2>My Orders</h2>
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