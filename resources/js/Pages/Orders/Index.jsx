import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import MainLayout from "@/Layouts/MainLayout";
import { router, usePage } from "@inertiajs/react"

export default function Index()
{

    const { orders } = usePage().props;

    const columns = [
        {
            header: '#',
            accessor: 'id',
        },
        {
            header: 'eui',
            render: (row) => (
                <div className="flex gap-4">
                    <div>
                        circle
                    </div>
                    <div className="flex flex-col">
                        <strong>{row.customer.name}</strong>
                        <span className="text-gray-500">{row.shipping_address}</span>
                        <span className="text-gray-500">{row.email}</span>
                        <span className="text-gray-500">{row.phone}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'pricing info',
            render: (row) => (
                <div className="flex flex-col">
                    <div>
                        <strong>Subtotal: </strong>
                        <span>{row.subtotal}</span>
                    </div>
                    <div>
                        <strong>Shipping: </strong>
                        <span>{row.shipping_price}</span>
                    </div>
                    <div>
                        <strong>Discount: </strong>
                        <span>{row.discount}</span>
                    </div>
                    <div>
                        <strong>Total: </strong>
                        <span>{row.total}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'points',
            accessor: 'points',
        },
        {
            header: 'status',
            accessor: 'status',
        },
        {
            header: 'actions',
            render: (row) => (
                <div>
                    <PrimaryButton>Details</PrimaryButton>
                </div>
            )
        }
    ];

    const handleSearch = (search) => {
        router.get(
            route('orders.web-orders.index'),
            {
                search: search
            },
            {
                preserveState: true,
                replace: true
            }
        );
    }

    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2>Orders</h2>
            <p>Orders History</p>
            <div className="flex justify-between items-center mb-4">
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
    )
}

Index.layout = page => <MainLayout children={page} title="Orders" />